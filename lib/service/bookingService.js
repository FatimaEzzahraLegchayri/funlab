import { db } from "@/lib/firebase/config"; 
import { collection, addDoc, serverTimestamp, runTransaction, 
  doc, increment, getDocs, query, orderBy, updateDoc,
} from "firebase/firestore";
import { uploadToCloudinary } from "./cloudinaryService"; 

import { getStudioConfig } from "./settingsService";
import { getRemainingSpots } from "../utils/helper";

const WORKSHOPS_BOOKINGS_COLLECTION = "workshopBookings";
const OPEN_STUDIO_COLLECTION = "openStudioBookings";
const WORKSHOPS_COLLECTION = "workshops";
 
export async function openStudioBookings(formData, people) {
  
  const config = await getStudioConfig();
  const maxCapacity = config?.maxCapacityPerSlot || 10;

  const actualRemaining = await getRemainingSpots(
    formData.date,
    formData.startTime,
    formData.endTime,
    maxCapacity
  );
  const requestedSpots = parseInt(formData.personCount);  

  if (requestedSpots > actualRemaining) {
    throw new Error(
      `Désolé, entre-temps, des places ont été prises. Il ne reste plus que ${actualRemaining} places.`
    );
  }

  try {

    let paymentProofUrl = "";
    if (formData.paymentProof) {
      paymentProofUrl = await uploadToCloudinary(formData.paymentProof, "open-studio-payment");
    } else {
      throw new Error("La preuve de paiement est requise.");
    }

    const participants = people.map((p, index) => {
      const isGlobal = formData.allSameActivity === 'yes';
      const activity = isGlobal ? formData.globalActivity : p.activity;
      const custom = isGlobal ? formData.globalCustomActivity : p.customActivity;

      return {
        id: index + 1,
        ageGroup: p.ageGroup,
        activity: activity,
        customActivity: activity === 'Other' ? (custom || "").trim() : null
      };
    });

    const bookingData = {
      date: formData.date,
      phone: formData.phone.trim(), 
      startTime: formData.startTime,
      endTime: formData.endTime,
      personCount: requestedSpots,
      allSameActivity: formData.allSameActivity === 'yes',
      globalActivity: formData.allSameActivity === 'yes' ? formData.globalActivity : null,
      globalCustomActivity: formData.allSameActivity === 'yes' && formData.globalActivity === 'Other' 
        ? formData.globalCustomActivity 
        : null,
      paymentProofUrl: paymentProofUrl,
      createdAt: serverTimestamp(),
      status: "pending",
      participants: participants,
    };

    const docRef = await addDoc(collection(db, OPEN_STUDIO_COLLECTION), bookingData);

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Service openStudioBookings Error:", error);
    throw error;
  }
}

export async function getOpenStudioBookings() {
  try {
    const bookingsRef = collection(db, OPEN_STUDIO_COLLECTION);
    const q = query(bookingsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    }));
  } catch (error) {
    console.error("Error fetching Open Studio bookings:", error);
    throw new Error("Impossible de charger les réservations Open Studio.");
  }
}

export async function updateOpenStudioStatus(bookingId, newStatus) {
  try {
    const docRef = doc(db, OPEN_STUDIO_COLLECTION, bookingId);
    await updateDoc(docRef, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating Open Studio status:", error);
    throw error;
  }
}

export async function newWorkshopBooking(bookingData) {
  try {
    const requiredFields = ['workshopId', 'name', 'email', 'phone', 'paymentImage', 'count'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const folderPath = `bookings/${bookingData.workshopId}`;
    const secureUrl = await uploadToCloudinary(bookingData.paymentImage, folderPath);

    const workshopDocRef = doc(db, WORKSHOPS_COLLECTION, bookingData.workshopId);
    
    const result = await runTransaction(db, async (transaction) => {
      const workshopSnap = await transaction.get(workshopDocRef);
      
      if (!workshopSnap.exists()) {
        throw new Error('Workshop not found.');
      }

      const workshop = workshopSnap.data();
      const seatsToBook = parseInt(bookingData.count);
      
      if (workshop.status !== 'published') {
        throw new Error('Cet atelier n’est plus disponible.');
      }

      const currentBooked = workshop.bookedSeats || 0;
      const availableSeats = workshop.capacity - currentBooked;

      if (availableSeats < seatsToBook) {
        throw new Error(`Désolé, il ne reste que ${availableSeats} places.`);
      }

      const now = new Date().toISOString();
      
      const booking = {
        workshopId: bookingData.workshopId,
        workshopTitle: workshop.title,
        name: bookingData.name.trim(),
        email: bookingData.email.trim().toLowerCase(),
        phone: bookingData.phone.trim(),
        paymentProofUrl: secureUrl,
        count: seatsToBook,
        totalPrice: seatsToBook * (workshop.price || 0),
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      };

      const newBookingRef = doc(collection(db, WORKSHOPS_BOOKINGS_COLLECTION)); 
      
      transaction.set(newBookingRef, booking);

      transaction.update(workshopDocRef, {
        bookedSeats: increment(seatsToBook),
        updatedAt: now,
      });

      return { id: newBookingRef.id, ...booking };
    });

    return result;

  } catch (error) {
    console.error("Booking Error:", error);
    throw error;
  }
}

export async function getWorkshopBookings() {
  try {
    const bookingsRef = collection(db, WORKSHOPS_BOOKINGS_COLLECTION);
    
    const q = query(bookingsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Impossible de récupérer les réservations.");
  }
}

export async function updateWorkshopBookingStatus(bookingId, newStatus) {
  try {
    const bookingRef = doc(db, WORKSHOPS_BOOKINGS_COLLECTION, bookingId);
    await updateDoc(bookingRef, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
}
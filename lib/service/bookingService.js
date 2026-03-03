import { db } from "@/lib/firebase/config"; 
import { collection, addDoc, serverTimestamp, runTransaction, 
  doc, increment, getDocs, query, orderBy, updateDoc,
  getDoc, setDoc
} from "firebase/firestore";
import { uploadToCloudinary } from "./cloudinaryService"; 

import { getStudioConfig } from "./settingsService";
import { getRemainingSpots } from "../utils/helper";

const WORKSHOPS_BOOKINGS_COLLECTION = "workshopBookings";
const OPEN_STUDIO_BOOKINGS_COLLECTION = "openStudioBookings";
const WORKSHOPS_COLLECTION = "workshops";

export async function openStudioDraftBooking(formData, people) {
  if (formData.allSameActivity === 'yes' && !formData.globalActivity) {
    throw new Error("L'activité globale est requise.");
  }

  if (formData.allSameActivity === 'no' && people.some(p => !p.activity)) {
    throw new Error("Toutes les activités des participants doivent être remplies.");
  }

  try {
    const requestedSpots = parseInt(formData.personCount);

    const participants = people.map((p, index) => {
      const isGlobal = formData.allSameActivity === 'yes';
      return {
        id: index + 1,
        ageGroup: p.ageGroup || 'Adult',
        activity: isGlobal ? formData.globalActivity : p.activity,
        comment: isGlobal ? (formData.globalComment || "") : (p.customComment || "")
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
      status: "draft", 
      participants: participants,
      createdAt: serverTimestamp(),
      paymentProofUrl: null, 
    };

    const docRef = await addDoc(collection(db, OPEN_STUDIO_BOOKINGS_COLLECTION ), bookingData);

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Service saveDraftBooking Error:", error);
    throw error;
  }
}

export async function updateStudioBookingDraft(draftId, formData, people) {
  try {
    const requestedSpots = parseInt(formData.personCount);

    const participants = people.map((p, index) => {
      const isGlobal = formData.allSameActivity === 'yes';
      return {
        id: index + 1,
        ageGroup: p.ageGroup || 'Adult',
        activity: isGlobal ? formData.globalActivity : p.activity,
        comment: isGlobal ? (formData.globalComment || "") : (p.customComment || "")
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
      status: "draft",
      participants: participants,
      updatedAt: serverTimestamp(), 
    };

    if (draftId) {
      const docRef = doc(db, "openStudioBookings", draftId);
      await updateDoc(docRef, bookingData);
      return { success: true, id: draftId };
    } else {
      const docRef = await addDoc(collection(db, "openStudioBookings"), {
        ...bookingData,
        createdAt: serverTimestamp(), 
      });
      return { success: true, id: docRef.id };
    }
  } catch (error) {
    console.error("Service updateStudioBookingDraft Error:", error);
    throw error;
  }
}

// step 2
export async function updateStudioBookingWithPayment(draftId, formData, people) {
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
      `Désolé, entre-temps, des places ont été prises. Il ne reste plus que ${actualRemaining} places disponibles.`
    );
  }

  let paymentProofUrl = "";
  if (formData.paymentProof) {
    try {
      paymentProofUrl = await uploadToCloudinary(formData.paymentProof, "open-studio-payment");
    } catch (uploadError) {
      throw new Error("Échec du téléchargement de l'image. Veuillez réessayer.");
    }
  } else {
    throw new Error("La preuve de paiement est requise pour valider votre réservation.");
  }

  try {
    const docRef = doc(db, "openStudioBookings", draftId);

    const finalData = {
      paymentProofUrl: paymentProofUrl,
      status: "pending", 
      updatedAt: serverTimestamp(),
      personCount: requestedSpots,
      phone: formData.phone.trim(),
    };

    await updateDoc(docRef, finalData);

    return { success: true };
  } catch (error) {
    console.error("Service updateOpenStudioBooking Error:", error);
    throw new Error("Une erreur est survenue lors de la mise à jour de votre réservation.");
  }
}


export async function getOpenStudioBookings() {
  try {
    const bookingsRef = collection(db, OPEN_STUDIO_BOOKINGS_COLLECTION);
    const q = query(bookingsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    }));
  } catch (error) {
    console.error("Error fetching Atelier privé bookings:", error);
    throw new Error("Impossible de charger les réservations pour Atelier privé.");
  }
}

export async function updateOpenStudioStatus(booking, newStatus) {
  const { id, date, startTime, endTime, personCount, status: oldStatus } = booking;

  const config = await getStudioConfig();
  const MAX_CAPACITY = config?.maxCapacityPerSlot || 10;
console.log("booking, newStatus", booking.date, booking.startTime, newStatus);

  const isReserved = (s) => ["pending", "confirmed"].includes(s);

  try {
    const enteringReserved = !isReserved(oldStatus) && isReserved(newStatus);
    const leavingReserved = isReserved(oldStatus) && !isReserved(newStatus);

    if (enteringReserved) {
      const remaining = await getRemainingSpots(date, startTime, endTime, MAX_CAPACITY);
      if (personCount > remaining) {
        throw new Error(`Il ne reste que ${remaining} places.`);
      }
    }

    const bookingRef = doc(db, OPEN_STUDIO_BOOKINGS_COLLECTION, id);
    await updateDoc(bookingRef, { status: newStatus });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// form: step1 
export async function createWorkshopBookingDraft(bookingData) {
  try {
    
    const phone = bookingData.phone?.trim() || "";
    const phoneRegex = /^(06|07)\d{8}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("Le numéro de téléphone n'est pas valide (ex: 0612345678).");
    }

    const email = bookingData.email?.trim().toLowerCase() || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      throw new Error("L'adresse email n'est pas valide.");
    }

    const workshopRef = doc(db, WORKSHOPS_COLLECTION, bookingData.workshopId);
    const workshopSnap = await getDoc(workshopRef);

    if (!workshopSnap.exists()) {
      throw new Error("L'atelier n'existe plus.");
    }

    const workshop = workshopSnap.data();
    const seatsToBook = parseInt(bookingData.count) || 1;
    const currentBooked = workshop.bookedSeats || 0;
    const maxCapacity = workshop.capacity || 0;

    if (currentBooked + seatsToBook > maxCapacity) {
      throw new Error(`Désolé, il ne reste que ${maxCapacity - currentBooked} places.`);
    }

    const bookingsRef = collection(db, WORKSHOPS_BOOKINGS_COLLECTION);
    const newDocRef = doc(bookingsRef); 

    const draftBooking = {
      workshopId: bookingData.workshopId,
      workshopTitle: workshop.title, 
      name: bookingData.name.trim(),
      email: email,
      phone: bookingData.phone.trim(),
      count: seatsToBook,
      totalPrice: seatsToBook * (workshop.price || 0),
      status: "draft", 
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(newDocRef, draftBooking);

    return { id: newDocRef.id, ...draftBooking };
  } catch (error) {
    console.error("Error creating draft:", error);
    if (error instanceof Error) throw error;
    throw new Error("Impossible d'initialiser la réservation.");
  }
}

export const updateWorkshopBookingDraft = async (bookingId, data) => {
  try {
    const docRef = doc(db, WORKSHOPS_BOOKINGS_COLLECTION, bookingId);
    
    const updatedData = {
      name: data.name?.trim(),
      email: data.email?.trim().toLowerCase(),
      phone: data.phone?.trim(),
      count: parseInt(data.count) || 1,
      totalPrice: (parseInt(data.count) || 1) * (data.unitPrice || 0),
      updatedAt: serverTimestamp(),
    };

    await updateDoc(docRef, updatedData);
    return { id: bookingId, ...updatedData };
  } catch (error) {
    console.error("Error updating draft:", error);
    throw new Error("Impossible de mettre à jour la réservation.");
  }
};

// form : step 2 
export async function confirmWorkshopBooking(bookingId, paymentImage) {
  try {
    if (!bookingId || !paymentImage) {
      throw new Error("Informations de paiement manquantes.");
    }

    const bookingRef = doc(db, WORKSHOPS_BOOKINGS_COLLECTION, bookingId);
    
    const result = await runTransaction(db, async (transaction) => {
      const bookingSnap = await transaction.get(bookingRef);
      if (!bookingSnap.exists()) {
        throw new Error("Réservation introuvable.");
      }
      const bookingData = bookingSnap.data();

      const workshopRef = doc(db, WORKSHOPS_COLLECTION, bookingData.workshopId);
      const workshopSnap = await transaction.get(workshopRef);
      
      if (!workshopSnap.exists()) {
        throw new Error("L'atelier n'existe plus.");
      }
      
      const workshop = workshopSnap.data();
      const currentBooked = workshop.bookedSeats || 0;
      if (currentBooked + bookingData.count > workshop.capacity) {
        throw new Error("Désolé, l'atelier vient de se remplir.");
      }

      const folderPath = `bookings/${bookingData.workshopId}`;
      const secureUrl = await uploadToCloudinary(paymentImage, folderPath);

      transaction.update(bookingRef, {
        paymentProofUrl: secureUrl,
        status: "pending",
        updatedAt: serverTimestamp(),
      });

      transaction.update(workshopRef, {
        bookedSeats: increment(bookingData.count),
        updatedAt: serverTimestamp(),
      });

      return { id: bookingId, status: "pending", paymentProofUrl: secureUrl };
    });

    return result;
  } catch (error) {
    console.error("Confirmation Error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Erreur lors de la confirmation du paiement.");
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
    
    const bookingSnap = await getDoc(bookingRef);
    if (!bookingSnap.exists()) throw new Error("Booking not found");
    
    const bookingData = bookingSnap.data();
    const oldStatus = bookingData.status;
    const seatCount = bookingData.count || 1; 
    const workshopId = bookingData.workshopId;

    if (workshopId) {
      const workshopRef = doc(db, WORKSHOPS_COLLECTION, workshopId);
      const workshopSnap = await getDoc(workshopRef);
      
      if (!workshopSnap.exists()) throw new Error("Workshop not found");
      const workshopData = workshopSnap.data();

      if (newStatus === 'confirmed' && oldStatus !== 'confirmed') {
        const currentBooked = workshopData.bookedSeats || 0;
        const maxCapacity = workshopData.capacity || 0;

        if (currentBooked + seatCount > maxCapacity) {
          const available = maxCapacity - currentBooked;
          throw new Error(`Capacité maximale atteinte. Il ne reste que ${available > 0 ? available : 0} places.`);
        }

        await updateDoc(workshopRef, {
          bookedSeats: increment(seatCount)
        });
      } 
      else if (oldStatus === 'confirmed' && newStatus !== 'confirmed') {
        await updateDoc(workshopRef, {
          bookedSeats: increment(-seatCount)
        });
      }
    }
    await updateDoc(bookingRef, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating status and seats:", error);
    throw error;
  }
}
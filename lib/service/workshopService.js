import { collection, addDoc, getDocs, query, orderBy, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { ensureAdmin } from '@/lib/utils/helper';
import { uploadToCloudinary } from './cloudinaryService'; 

const WORKSHOPS_COLLECTION = 'workshops';

export async function addWorkshop(workshopData, imageFile) {
  try {
    await ensureAdmin();

    let imageUrl = workshopData.image || null;
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile, 'workshop-covers');
    }

    const now = new Date().toISOString();
    
    const workshop = {
      title: workshopData.title.trim(),
      description: workshopData?.description?.trim() || '',
      date: workshopData.date,
      startTime: workshopData.startTime,
      endTime: workshopData.endTime,
      capacity: Number(workshopData.capacity),
      bookedSeats: 0, 
      price: Number(workshopData.price),
      status: workshopData.status || 'draft', 
      image: imageUrl, 
      createdAt: now,
      updatedAt: now,
    };

    const requiredFields = ['title', 'date', 'startTime', 'endTime', 'capacity', 'price'];
    const missingFields = requiredFields.filter(field => !workshop[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
    }

    const workshopsCollection = collection(db, WORKSHOPS_COLLECTION);
    const docRef = await addDoc(workshopsCollection, workshop);

    return {
      id: docRef.id,
      ...workshop,
    };

  } catch (error) {
    console.error("Admin AddWorkshop Error:", error);
    if (error.message.includes('client is offline')) {
        throw new Error("Connexion impossible : Vous semblez être hors ligne.");
    }
    if (error.message.includes('Access denied') || 
        error.message.includes('User must be authenticated') ||
        error.message.includes('missing fields')) {
      throw error;
    }
    throw new Error(`Erreur lors de l'ajout de l'atelier: ${error.message}`);
  }
}
  
export async function updateWorkshop(workshopId, updateData, newImageFile = null) {
    try {
      await ensureAdmin();
  
      const workshopDocRef = doc(db, WORKSHOPS_COLLECTION, workshopId);
      
      let imageUrl = updateData.image;
      if (newImageFile) {
        imageUrl = await uploadToCloudinary(newImageFile, 'workshop-covers');
      }
  
      const updateObject = {};
      const allowedFields = ['title', 'description', 'date', 'startTime', 'endTime', 'capacity', 'price', 'status'];
      
      allowedFields.forEach(field => {
        if (updateData.hasOwnProperty(field)) {
          if (field === 'capacity' || field === 'price') {
            updateObject[field] = Number(updateData[field]);
          } else {
            updateObject[field] = updateData[field];
          }
        }
      });

      updateObject.image = imageUrl;
      updateObject.updatedAt = new Date().toISOString();
  
      await updateDoc(workshopDocRef, updateObject);
  
      return {
        id: workshopId,
        ...updateObject,
      };
    } catch (error) {
      console.error("Update Error:", error);
      throw error; 
    }
}
  
export async function deleteWorkshop(workshopId) {
    try {
     
      await ensureAdmin();
      const workshopDocRef = doc(db, WORKSHOPS_COLLECTION, workshopId);
      await deleteDoc(workshopDocRef);
  
      return { success: true, id: workshopId };
    } catch (error) {
      console.error("Delete Error:", error);
      
      if (error.message.includes('Access denied') || 
          error.message.includes('User must be authenticated')) {
        throw error;
      }
      
      throw new Error(`Erreur lors de la suppression: ${error.message}`);
    }
}

export async function getWorkshops() {
    try {
      const workshopsCollection = collection(db, WORKSHOPS_COLLECTION);      
      const q = query(workshopsCollection, orderBy("date", "asc"));
      const workshopsSnapshot = await getDocs(q);
      const workshops = workshopsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return workshops;
    } catch (error) {
      console.error("Fetch Error:", error);
      throw new Error(`Failed to fetch workshops: ${error.message}`);
    }
}
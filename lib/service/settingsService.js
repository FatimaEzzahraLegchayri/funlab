import { db } from "@/lib/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SETTINGS_COLLECTION = "studioSettings";
const CONFIG_DOC = "config";


export async function getStudioConfig() {
  try {
    const settingsRef = doc(db, SETTINGS_COLLECTION, CONFIG_DOC);
    const snap = await getDoc(settingsRef);
    
    if (snap.exists()) {
      return snap.data();
    }

    return {
      slotDurationMinutes: 90,
      maxCapacityPerSlot: 10,
      isActive: true
    };
  } catch (error) {
    console.error("Error fetching studio config:", error);
    return null;
  }
}


export async function updateStudioConfig(newConfig) {
  try {
    const settingsRef = doc(db, SETTINGS_COLLECTION, CONFIG_DOC);
    await setDoc(settingsRef, newConfig, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Error updating config:", error);
    throw error;
  }
}
import { db, auth } from "@/lib/firebase/config";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";

const USERS_COLLECTION = 'users';
const BOOKINGS_COLLECTION = "openStudioBookings";

export async function getRemainingSpots(date, startTime, endTime, maxCapacity) {
    if (!date || !startTime || !endTime) return maxCapacity;
  
    try {
      const q = query(
        collection(db, BOOKINGS_COLLECTION),
        where("date", "==", date),
        where("status", "in", ["pending", "confirmed"])
      );
  
      const querySnapshot = await getDocs(q);
      
      let maxOccupancyDuringInterval = 0;
  
      querySnapshot.forEach((doc) => {
        const booking = doc.data();
        
        const overlaps = booking.startTime < endTime && booking.endTime > startTime;
  
        if (overlaps) {
          maxOccupancyDuringInterval += booking.personCount || 0;
        }
      });
  
      const remaining = maxCapacity - maxOccupancyDuringInterval;
      return remaining > 0 ? remaining : 0;
    } catch (error) {
      console.error("Error calculating capacity:", error);
      return 0; 
    }
}

export async function ensureAdmin() {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User must be authenticated to perform this action');
  }

  const userDocRef = doc(db, USERS_COLLECTION, user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    throw new Error('User account not found. Access denied.');
  }

  const userData = userDocSnap.data();
  if (userData.role !== 'admin') {
    throw new Error('Access denied. Admin role required.');
  }

  return user;
}
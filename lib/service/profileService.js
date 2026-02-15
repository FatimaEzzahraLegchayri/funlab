import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { ensureAdmin } from '../utils/helper';

 
export async function updateProfile(profileData) {
  try {
    const user = await ensureAdmin();
    const userDocRef = doc(db, "users", user.uid); 

    const updateData = {};
    let passwordUpdated = false;

    if (profileData.name !== undefined && profileData.name !== null) {
      if (typeof profileData.name !== 'string' || profileData.name.trim() === '') {
        throw new Error('Name cannot be empty');
      }
      updateData.name = profileData.name.trim();
      updateData.updatedAt = new Date().toISOString();
    }

    if (profileData.password !== undefined && profileData.password !== null) {
      if (!profileData.currentPassword) {
        throw new Error('Current password is required to update password');
      }

      if (typeof profileData.password !== 'string' || profileData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const credential = EmailAuthProvider.credential(user.email, profileData.currentPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, profileData.password);
      passwordUpdated = true;
    }

    if (Object.keys(updateData).length > 0) {
      await updateDoc(userDocRef, updateData);
    }

    const updatedDocSnap = await getDoc(userDocRef);
    const updatedUserData = updatedDocSnap.data();

    return {
      uid: user.uid,
      email: user.email,
      name: updatedUserData?.name,
      role: updatedUserData?.role,
      passwordUpdated,
      ...updatedUserData,
    };
  } catch (error) {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      throw new Error('Current password is incorrect');
    }
    throw error;
  }
}
 
export async function getProfile() {
  try {
    const user = await ensureAdmin(); 
    
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      throw new Error('User data not found in database');
    }

    const userData = docSnap.data();

    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      name: userData.name || '',
      role: userData.role || 'admin',
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      ...userData,
    };
  } catch (error) {
    if (
      error.message.includes('Access denied') ||
      error.message.includes('User must be authenticated') ||
      error.message.includes('User not found')
    ) {
      throw error;
    }
    
    console.error("Error in getProfile:", error);
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }
}
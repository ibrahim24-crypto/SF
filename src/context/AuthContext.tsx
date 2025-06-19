
'use client';

import type { User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInAnonymously as firebaseSignInAnonymously } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface UserProfile {
  uid: string;
  email: string | null;
  username: string | null;
  photoURL?: string | null; // Can now be a Data URI
  highScore?: number;
  isAnonymous?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, username: string) => Promise<void>;
  logInWithEmail: (email: string, password: string) => Promise<void>;
  signInAnonymously: (pseudo: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateUserHighScore: (score: number) => Promise<void>;
  updateUserProfileData: (data: { newUsername?: string; newAvatarFile?: File }) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser({ uid: firebaseUser.uid, ...userDocSnap.data() } as UserProfile);
        } else {
          // This case handles users who signed up but for some reason their Firestore doc wasn't created
          // Or for new users signing in via Google/Email for the first time.
          if (!firebaseUser.isAnonymous) {
            const newUserProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              photoURL: firebaseUser.photoURL, // Can be null or from provider
              highScore: 0,
              isAnonymous: false,
            };
            await setDoc(userDocRef, { ...newUserProfile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
            setUser(newUserProfile);
          }
          // Anonymous users' profiles are created during their specific signInAnonymously flow.
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const userDocRef = doc(db, "users", result.user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          const newUserProfile: UserProfile = {
            uid: result.user.uid,
            email: result.user.email,
            username: result.user.displayName || result.user.email?.split('@')[0] || 'User',
            photoURL: result.user.photoURL,
            highScore: 0,
            isAnonymous: false,
          };
          await setDoc(userDocRef, { ...newUserProfile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
          setUser(newUserProfile);
        } else {
           setUser({ uid: result.user.uid, ...userDocSnap.data() } as UserProfile);
        }
      }
      toast({ title: "Signed in with Google successfully!" });
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      if (error.code === 'auth/user-cancelled' || error.code === 'auth/popup-closed-by-user') {
        toast({ title: "Google Sign-In Cancelled", description: "The sign-in process was not completed.", variant: "default" });
      } else {
        toast({ title: "Google Sign-In Failed", description: error.message, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast({ title: "Sign-Up Failed", description: "Username already taken. Please choose another.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      
      const newUserProfile: UserProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        username: username,
        photoURL: userCredential.user.photoURL, // Initially null for email sign-up
        highScore: 0,
        isAnonymous: false,
      };
      await setDoc(doc(db, "users", userCredential.user.uid), { ...newUserProfile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      setUser(newUserProfile);
      toast({ title: "Signed up successfully!" });
    } catch (error: any) {
      console.error("Email Sign-Up Error:", error);
      toast({ title: "Sign-Up Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const logInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Logged in successfully!" });
    } catch (error: any)      {
      console.error("Email Login Error:", error);
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const signInAnonymously = async (pseudo: string) => {
    setLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', pseudo));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast({ title: "Login Failed", description: "This pseudo is already taken. Please choose another.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const userCredential = await firebaseSignInAnonymously(auth);
      const firebaseUser = userCredential.user;

      const newUserProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: null, 
        username: pseudo,
        photoURL: null, // Anonymous users start with no photo
        highScore: 0,
        isAnonymous: true,
      };
      await setDoc(doc(db, "users", firebaseUser.uid), { ...newUserProfile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      setUser(newUserProfile);
      toast({ title: "Logged in as guest successfully!" });
    } catch (error: any) {
      console.error("Anonymous Sign-In Error:", error);
      toast({ title: "Anonymous Login Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      toast({ title: "Logged out successfully." });
    } catch (error: any) {
      console.error("Logout Error:", error);
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateUserHighScore = async (score: number) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        if (score > (user.highScore || 0)) {
          await updateDoc(userDocRef, { highScore: score, updatedAt: serverTimestamp() });
          setUser(prevUser => prevUser ? { ...prevUser, highScore: score } : null);
        }
      } catch (error) {
        console.error("Error updating high score in Firebase:", error);
        // Consider only showing toast if it's a critical failure or for user feedback.
        // toast({ title: "Error Syncing Score", description: "Could not update high score in Firebase.", variant: "destructive" });
      }
    }
  };

  const convertFileToDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const updateUserProfileData = async (data: { newUsername?: string; newAvatarFile?: File }): Promise<{ success: boolean; message: string }> => {
    if (!auth.currentUser) {
      return { success: false, message: "No user logged in." };
    }
    if (user?.isAnonymous) {
      return { success: false, message: "Guest users cannot update their profile." };
    }

    setLoading(true);
    const currentUser = auth.currentUser;
    const userDocRef = doc(db, "users", currentUser.uid);
    const updates: Partial<UserProfile> = {};
    let authProfileUpdates: { displayName?: string; photoURL?: string } = {};

    try {
      // Handle Username Update
      if (data.newUsername && data.newUsername !== user?.username) {
        const currentUsername = data.newUsername.trim();
        if (currentUsername.length < 3 || currentUsername.length > 20) {
          setLoading(false);
          return { success: false, message: "Username must be between 3 and 20 characters." };
        }

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', currentUsername));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Check if the found user is the current user (in case of case change or something)
          let conflict = false;
          querySnapshot.forEach(doc => {
            if (doc.id !== currentUser.uid) {
              conflict = true;
            }
          });
          if (conflict) {
            setLoading(false);
            return { success: false, message: "Username already taken. Please choose another." };
          }
        }
        updates.username = currentUsername;
        authProfileUpdates.displayName = currentUsername;
      }

      // Handle Avatar Update by converting to Data URI
      if (data.newAvatarFile) {
        if (data.newAvatarFile.size > 1024 * 500) { // Limit to ~500KB for Data URI
          setLoading(false);
          return { success: false, message: "Avatar image is too large. Please choose a smaller file (under 500KB)." };
        }
        try {
          const dataUri = await convertFileToDataURI(data.newAvatarFile);
          updates.photoURL = dataUri;
          authProfileUpdates.photoURL = dataUri; // Firebase Auth photoURL can also take Data URIs
        } catch (error) {
          console.error("Error converting file to Data URI:", error);
          setLoading(false);
          return { success: false, message: "Could not process avatar image." };
        }
      }
      
      const batch = writeBatch(db);

      if (Object.keys(authProfileUpdates).length > 0) {
        await updateProfile(currentUser, authProfileUpdates);
      }
      if (Object.keys(updates).length > 0) {
         batch.update(userDocRef, { ...updates, updatedAt: serverTimestamp() });
      }
      
      await batch.commit();

      setUser(prevUser => {
        if (!prevUser) return null;
        let updatedUser = { ...prevUser };
        if (updates.username) updatedUser.username = updates.username;
        if (updates.photoURL) updatedUser.photoURL = updates.photoURL;
        return updatedUser;
      });

      setLoading(false);
      return { success: true, message: "Profile updated successfully!" };

    } catch (error: any) {
      console.error("Profile Update Error:", error);
      setLoading(false);
      return { success: false, message: error.message || "Failed to update profile." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signUpWithEmail, logInWithEmail, signInAnonymously, logOut, updateUserHighScore, updateUserProfileData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

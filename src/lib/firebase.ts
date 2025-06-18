
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// IMPORTANT: Replace this with your actual Firebase project configuration!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

// Comment out these lines for production if not using emulators
// if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
//   // Check if emulators are already running to avoid re-connecting
//   // This is a basic check; more robust checks might be needed in complex setups
//   const authHost = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST || "localhost:9099";
//   const firestoreHost = process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST || "localhost:8080";

//   // @ts-ignore Check for existing emulator connection
//   if (!auth._emulatorConfig) {
//     connectAuthEmulator(auth, `http://${authHost}`);
//     console.log(`Auth emulator connected to http://${authHost}`);
//   }
//   // @ts-ignore
//   if (!db._settings.host) { // Firestore connection check is a bit different
//     connectFirestoreEmulator(db, firestoreHost.split(':')[0], parseInt(firestoreHost.split(':')[1]));
//     console.log(`Firestore emulator connected to ${firestoreHost}`);
//   }
// }


export { app, auth, db };

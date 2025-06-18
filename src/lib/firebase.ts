
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUyz8uLKvN4w2Dnx4ANFcrth8ubZNBnk0",
  authDomain: "skyfall-5e47d.firebaseapp.com",
  projectId: "skyfall-5e47d",
  storageBucket: "skyfall-5e47d.appspot.com", // Corrected storageBucket from .firebasestorage.app to .appspot.com
  messagingSenderId: "177609101052",
  appId: "1:177609101052:web:c2844e9af4199606109179",
  measurementId: "G-S3VFVZ65L0"
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

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHepy-pNSnEWyF1SRcz3DZ-8gALtCixqA",
  authDomain: "skincancer-c0eaa.firebaseapp.com",
  projectId: "skincancer-c0eaa",
  storageBucket: "skincancer-c0eaa.appspot.com",
  messagingSenderId: "794170371622",
  appId: "1:794170371622:web:98e0ba4f2df09fe4f500e7",
};

// Prevent multiple initializations
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, sendEmailVerification, collection, addDoc };
export default app;

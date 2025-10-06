import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMS8VLR0Szv_3-U2zG2zr44LHudbQnHzc",
  authDomain: "lab-management-system-1d88b.firebaseapp.com",
  projectId: "lab-management-system-1d88b",
  storageBucket: "lab-management-system-1d88b.firebasestorage.app",
  messagingSenderId: "670258968614",
  appId: "1:670258968614:web:ac4d928cffbc55da360ee7"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
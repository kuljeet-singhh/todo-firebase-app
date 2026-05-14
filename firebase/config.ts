import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCjtC6skXmKkgdJMviny-hArwD2zcPFcLI",
  authDomain: "todo-app-d1c7b.firebaseapp.com",
  projectId: "todo-app-d1c7b",
    storageBucket: "todo-app-d1c7b.firebasestorage.app",
    messagingSenderId: "491748900543",
    appId: "1:491748900543:web:2cc37178e1aab83636100a",
    measurementId: "G-6DMFYQ2ZSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
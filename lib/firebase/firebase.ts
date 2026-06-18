import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDytYEf8vdzDwUqApFioqXPJKuVpsEvChc",
  authDomain: "sunbloom-website-2ddc6.firebaseapp.com",
  projectId: "sunbloom-website-2ddc6",
  storageBucket: "sunbloom-website-2ddc6.firebasestorage.app",
  messagingSenderId: "5286152451",
  appId: "1:5286152451:web:0d62b4871d01ebaf7c0136",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

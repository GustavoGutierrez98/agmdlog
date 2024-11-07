// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtmuzROsIsCtTUnI4v0I23G8SNa691zrI",
  authDomain: "agmdlog.firebaseapp.com",
  databaseURL: "https://agmdlog-default-rtdb.firebaseio.com",
  projectId: "agmdlog",
  storageBucket: "agmdlog.firebasestorage.app",
  messagingSenderId: "939496453940",
  appId: "1:939496453940:web:a41dba115b0103bbda1761",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth, Firestore, y Realtime Database
export const auth = getAuth(app);
export const db = getFirestore(app);

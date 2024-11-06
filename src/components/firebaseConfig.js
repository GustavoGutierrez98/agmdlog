// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtmuzROsIsCtTUnI4v0I23G8SNa691zrI",
  authDomain: "agmdlog.firebaseapp.com",
  projectId: "agmdlog",
  storageBucket: "agmdlog.firebasestorage.app",
  messagingSenderId: "939496453940",
  appId: "1:939496453940:web:a41dba115b0103bbda1761",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; // Exporta `app` si lo necesitas en otros archivos

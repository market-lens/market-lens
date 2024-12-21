// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVEYvzes5w2jnNYzeZuDoQ0DgqqKC_zis",
  authDomain: "market-lens-abd56.firebaseapp.com",
  projectId: "market-lens-abd56",
  storageBucket: "market-lens-abd56.firebasestorage.app",
  messagingSenderId: "89736691975",
  appId: "1:89736691975:web:33858e2e9b4431db9cc5a2",
  measurementId: "G-ZPL5SJK2RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
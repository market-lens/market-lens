import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
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

// Conditionally initialize Firebase Analytics
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
  }
});

export const auth = getAuth(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvyaTUe13b7mUr6tDEY5w5-NzPTvj8SLc",
  authDomain: "food-ordering-62957.firebaseapp.com",
  projectId: "food-ordering-62957",
  storageBucket: "food-ordering-62957.firebasestorage.app",
  messagingSenderId: "557245588345",
  appId: "1:557245588345:web:1f7ef99bf343918cff45a8",
  measurementId: "G-D53KLZ9100"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
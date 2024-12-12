// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,

  apiKey: "AIzaSyANyDsNl8wj2oQU59uPGysEDy7dPUguFZs",
  authDomain: "expense-tracker-5632d.firebaseapp.com",
  projectId: "expense-tracker-5632d",
  storageBucket: "expense-tracker-5632d.firebasestorage.app",
  messagingSenderId: "420233253745",
  appId: "1:420233253745:web:a92c5479b913415cfb9cd0",
  measurementId: "G-BTNJ7KKFKL",
}
console.log("firebase", process.env.REACT_APP_FIREBASE_MEASUREMENT_ID)

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
export { auth }
export { app }

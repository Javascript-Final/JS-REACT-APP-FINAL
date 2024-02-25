// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL7KFVsZgTksUVfXJshIyQLBBtfm86Rts",
  authDomain: "talk-and-text-app.firebaseapp.com",
  projectId: "talk-and-text-app",
  storageBucket: "talk-and-text-app.appspot.com",
  messagingSenderId: "15861181337",
  appId: "1:15861181337:web:d065632a2055873d9d8108",
  databaseURL: "https://talk-and-text-app-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);
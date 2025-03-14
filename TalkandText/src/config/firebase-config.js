import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcz2usbx4kvBBg0yS_kJ4iz9nEtnPFYXU",
  authDomain: "higuys87.firebaseapp.com",
  projectId: "higuys87",
  storageBucket: "higuys87.firebasestorage.app",
  messagingSenderId: "979864152189",
  appId: "1:979864152189:web:f42bbad3a5ca9190ffe914",
  databaseURL: "https://higuys87-default-rtdb.europe-west1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyATGAcf445mTsEINUfwiWhpCbFSJ7YMEPs",
  authDomain: "feedback-app-abf4d.firebaseapp.com",
  projectId: "feedback-app-abf4d",
  storageBucket: "feedback-app-abf4d.appspot.com",
  messagingSenderId: "941007090798",
  appId: "1:941007090798:web:84a183caee483b6b7e227f"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
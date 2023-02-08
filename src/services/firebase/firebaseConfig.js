
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBjYBAZGRkyKgFs4VMEqP0Bq2Qj3YoF9Wo",
  authDomain: "backend-ecommerce-30c55.firebaseapp.com",
  projectId: "backend-ecommerce-30c55",
  storageBucket: "backend-ecommerce-30c55.appspot.com",
  messagingSenderId: "298165111120",
  appId: "1:298165111120:web:e46d4c843986a7efa70455"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app);
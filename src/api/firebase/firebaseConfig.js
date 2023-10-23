// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDP8bUH1usfLLKfLTGdspSa1hu2ZHRJXuI",
  authDomain: "document-transfer-95c5d.firebaseapp.com",
  databaseURL:
    "https://document-transfer-95c5d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "document-transfer-95c5d",
  storageBucket: "document-transfer-95c5d.appspot.com",
  messagingSenderId: "862356147932",
  appId: "1:862356147932:web:746ac746158b2c968dee19",

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const providerGG = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);
export { auth, database, providerGG, storage };

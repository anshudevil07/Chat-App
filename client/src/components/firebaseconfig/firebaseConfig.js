// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz-z5nK7OyUvT7hTJ4psLa6c6CizxiP9s",
  authDomain: "chat-ef475.firebaseapp.com",
  projectId: "chat-ef475",
  storageBucket: "chat-ef475.appspot.com",
  messagingSenderId: "627253716041",
  appId: "1:627253716041:web:6d3726dc1f040aa4e2cb98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default  getFirestore(app);
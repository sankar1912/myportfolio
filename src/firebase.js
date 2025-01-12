// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG7OoM1xaWCg8zaf7_hHJzYaUs8LXglyI",
  authDomain: "sankarwebapp.firebaseapp.com",
  projectId: "sankarwebapp",
  storageBucket: "sankarwebapp.firebasestorage.app",
  messagingSenderId: "844010509366",
  appId: "1:844010509366:web:1e0e4774430c6a8e097497",
  measurementId: "G-55P2K7ZT1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fsdb=getFirestore(app);
export default fsdb;
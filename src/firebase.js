// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyA1e2w2-tJn1Fe_m1cluLGtH0MMWHDK8L8",
//     authDomain: "project-f3cc2.firebaseapp.com",
//     databaseURL: "https://project-f3cc2-default-rtdb.firebaseio.com",
//     projectId: "project-f3cc2",
//     storageBucket: "project-f3cc2.appspot.com",
//     messagingSenderId: "401937021009",
//     appId: "1:401937021009:web:bffd2a65ea2de7f5f22070"
//   };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { database, auth, provider };


// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase , ref, push, set } from "firebase/database";
import { getStorage } from "firebase/storage"; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyAsMR7FW8boGygnRABrpo5TJudGVcPSEcQ",
  authDomain: "imprint24-c0c86.firebaseapp.com",
  databaseURL: "https://imprint24-c0c86-default-rtdb.firebaseio.com",
  projectId: "imprint24-c0c86",
  storageBucket: "imprint24-c0c86.firebasestorage.app",
  messagingSenderId: "1060919076727",
  appId: "1:1060919076727:web:5cec808c59729ae36ce372",
  measurementId: "G-XD5W4MFFNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app); // Initialize storage

export { auth, database, storage , ref, push, set }; // Add storage to exports







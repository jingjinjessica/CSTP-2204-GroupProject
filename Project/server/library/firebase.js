// const firebaseConfig = {
//   apiKey: "AIzaSyCQfZHpR-9-_PlEB0YZGifmotOt884js9A",
//   authDomain: "live-chat-d8030.firebaseapp.com",
//   databaseURL: "https://live-chat-d8030-default-rtdb.firebaseio.com",
//   projectId: "live-chat-d8030",
//   storageBucket: "live-chat-d8030.appspot.com",
//   messagingSenderId: "332889385084",
//   appId: "1:332889385084:web:6cc17a4a4c2762f0b4c1f9",
//   measurementId: "G-BVM7N2PHW5",
// };

// const firebase = require("firebase");
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();

// module.exports = { db, firebaseConfig };

// const {
//   initializeApp,
//   applicationDefault,
//   cert,
// } = require("firebase-admin/app");
// const {
//   getFirestore,
//   Timestamp,
//   FieldValue,
// } = require("firebase-admin/firestore");

// const serviceAccount = require("./serviceAccount.json");

// initializeApp({
//   credential: cert(serviceAccount),
// });

// const db = getFirestore();

// module.exports = {
//   db,
// };

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQfZHpR-9-_PlEB0YZGifmotOt884js9A",
  authDomain: "live-chat-d8030.firebaseapp.com",
  databaseURL: "https://live-chat-d8030-default-rtdb.firebaseio.com",
  projectId: "live-chat-d8030",
  storageBucket: "live-chat-d8030.appspot.com",
  messagingSenderId: "332889385084",
  appId: "1:332889385084:web:6cc17a4a4c2762f0b4c1f9",
  measurementId: "G-BVM7N2PHW5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {
  db,
};

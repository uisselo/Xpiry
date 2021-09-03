import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBfOeLUd1FUP_g-hVqDxUccOlG637t4kB8",
  authDomain: "capstone-cdaa4.firebaseapp.com",
  databaseURL:
    "https://capstone-cdaa4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone-cdaa4",
  storageBucket: "capstone-cdaa4.appspot.com",
  messagingSenderId: "486450913481",
  appId: "1:486450913481:web:773599527971e73dd32d18",
  measurementId: "G-DWGTG6SB4K",
};

export const db = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

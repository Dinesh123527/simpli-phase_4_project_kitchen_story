import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAToDjdc2ZFio5dqygvugjK3q8ROrORA9U",
  authDomain: "restaurentapp-3b4f7.firebaseapp.com",
  databaseURL: "https://restaurentapp-3b4f7-default-rtdb.firebaseio.com",
  projectId: "restaurentapp-3b4f7",
  storageBucket: "restaurentapp-3b4f7.appspot.com",
  messagingSenderId: "532688916974",
  appId: "1:532688916974:web:84546558096c011a6cbeff",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
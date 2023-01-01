import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRiim3yvgXF6sfa6VJ9wrZ_3uGmg1-Csg",
  authDomain: "cult-recruitment-project.firebaseapp.com",
  databaseURL:
    "https://cult-recruitment-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cult-recruitment-project",
  storageBucket: "cult-recruitment-project.appspot.com",
  messagingSenderId: "840299485599",
  appId: "1:840299485599:web:05415b19c71244fbce45aa",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

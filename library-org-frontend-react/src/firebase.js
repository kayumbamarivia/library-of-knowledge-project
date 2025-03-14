import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDyyKMNmXMqRIV0eFjNP75KHQnGmLpxGYU",
  authDomain: "kayumbaj88-e0a77.firebaseapp.com",
  projectId: "kayumbaj88-e0a77",
  storageBucket: "kayumbaj88-e0a77.appspot.com",
  messagingSenderId: "759750053178",
  appId: "1:759750053178:web:4c5bfe7e78088349ecd403",
  measurementId: "G-M94NQ48PDW"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
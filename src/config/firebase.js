import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAJrOVWHYuOOu7dsP8CCeewTBRsLdQ8jcI",
    authDomain: "security-system-for-home.firebaseapp.com",
    databaseURL: "https://security-system-for-home-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "security-system-for-home",
    storageBucket: "security-system-for-home.appspot.com",
    messagingSenderId: "744291427305",
    appId: "1:744291427305:web:5e4a2df5ce55ae74276178",
    measurementId: "G-5F4DTX8GGS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { app, database };
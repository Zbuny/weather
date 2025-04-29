import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA3nFcoOsNRmdi2JxfNRhwcGt-hV-D2okw",
    authDomain: "weatherapp-bdcf5.firebaseapp.com",
    projectId: "weatherapp-bdcf5",
    storageBucket: "weatherapp-bdcf5.firebasestorage.app",
    messagingSenderId: "875382685295",
    appId: "1:875382685295:web:4a04e28c98d77e34dad79a",
    measurementId: "G-WJP0QLPG4W"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

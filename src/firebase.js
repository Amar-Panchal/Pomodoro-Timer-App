import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsZ_gkRmp0ZwpmmfpznM_dZpSwis1C3sQ",
  authDomain: "pomodro-timer2022.firebaseapp.com",
  projectId: "pomodro-timer2022",
  storageBucket: "pomodro-timer2022.appspot.com",
  messagingSenderId: "149367732832",
  appId: "1:149367732832:web:60c449d9b148bb0201a105"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
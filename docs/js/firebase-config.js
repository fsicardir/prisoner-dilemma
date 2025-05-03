// Firebase configuration
// Import the necessary functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { initializeAppCheck, getToken } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-check.js";
import { ReCaptchaEnterpriseProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-check.js";

// Your web app's Firebase configuration
// Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgQrJ4cdqiLBnz2VwEaADRLeyHkA2HDj0",
  authDomain: "prisoner-dilemma-8987a.firebaseapp.com",
  projectId: "prisoner-dilemma-8987a",
  storageBucket: "prisoner-dilemma-8987a.firebasestorage.app",
  messagingSenderId: "148448894895",
  appId: "1:148448894895:web:5e09f3a487c3fafa86995a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase App Check with Enterprise CAPTCHA provider
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider('6LfzcCwrAAAAAEqpOc3BCkS73YmyuIxwRzh8s5i0'),
  isTokenAutoRefreshEnabled: true
});

// Export App Check functions if needed
export async function getAppCheckToken() {
  try {
    const appCheckTokenResponse = await getToken(appCheck, /* forceRefresh= */ false);
    return appCheckTokenResponse.token;
  } catch (error) {
    console.error('Error getting App Check token:', error);
    return null;
  }
}

const db = getFirestore(app);

// Function to save user responses to Firestore
export async function saveUserResponses(userData) {
  try {
    const docRef = await addDoc(collection(db, "userResponses"), userData);
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}
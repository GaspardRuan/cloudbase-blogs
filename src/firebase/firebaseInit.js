import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaKXkKTeELXRFDxfo9HKYE2tqo4fkEK_A",
  authDomain: "fireblogr-e7964.firebaseapp.com",
  projectId: "fireblogr-e7964",
  storageBucket: "fireblogr-e7964.appspot.com",
  messagingSenderId: "572385879892",
  appId: "1:572385879892:web:b06388347f7ecbbcdf0ac1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();

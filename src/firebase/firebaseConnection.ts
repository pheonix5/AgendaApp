import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDwRwbmiMNu4uHUyzrxucXJDJ0Kd4qEO_Q",
  authDomain: "agendamentoapp-c1bad.firebaseapp.com",
  projectId: "agendamentoapp-c1bad",
  storageBucket: "agendamentoapp-c1bad.appspot.com",
  messagingSenderId: "888771176214",
  appId: "1:888771176214:web:5d0f80282af599eed41237"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAOGRNylzPTmDxU1d-HXfhxBKkdvyhze2A",
    authDomain: "sample-firebase-ai-app-9886d.firebaseapp.com",
    databaseURL: "https://sample-firebase-ai-app-9886d-default-rtdb.firebaseio.com",
    projectId: "sample-firebase-ai-app-9886d",
    storageBucket: "sample-firebase-ai-app-9886d.firebasestorage.app",
    messagingSenderId: "692879646472",
    appId: "1:692879646472:web:71bfa3aa4ea6ddb6d396bd"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancia de Realtime Database
const database = getDatabase(app);

export { database };
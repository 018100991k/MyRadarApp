import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const enviroments = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDI_LOMFpmrsjiQg9pp5nVdBKI09sc5h2U',
    authDomain: 'copacgestion.firebaseapp.com',
    projectId: 'copacgestion',
    storageBucket: 'copacgestion.appspot.com',
    messagingSenderId: '495804268452',
    appId: '1:495804268452:web:1a7f45e940a1bb9cff8b31',
  },
};

// Initialize Firebase
const app = initializeApp(enviroments.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

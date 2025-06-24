import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA8JvGIocQjoE09vgK2pieCGJDFyWXYlGo',
  authDomain: 'my-website-df82a.firebaseapp.com',
  databaseURL: 'https://my-website-df82a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'my-website-df82a',
  storageBucket: 'my-website-df82a.appspot.com',
  messagingSenderId: '423507224563',
  appId: '1:423507224563:web:f5ff75952dee174d36d486',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

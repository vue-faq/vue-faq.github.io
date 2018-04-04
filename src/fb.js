import fb from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCOmVkbb3dMRN4kH-oJJfF0XoDXPkmTcxY',
  authDomain: 'vue-faq-fb452.firebaseapp.com',
  databaseURL: 'https://vue-faq-fb452.firebaseio.com',
  projectId: 'vue-faq-fb452',
  storageBucket: 'vue-faq-fb452.appspot.com',
  messagingSenderId: '372071045025'
}

fb.initializeApp(config)

export const db = fb.firestore()
export default fb

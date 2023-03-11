import {initializeApp, getApps} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBMVZkBPybBM96fqeb5rlCOQceN1tBreuQ",
  authDomain: "akasharift-860aa.firebaseapp.com",
  projectId: "akasharift-860aa",
  storageBucket: "akasharift-860aa.appspot.com",
  messagingSenderId: "691171534430",
  appId: "1:691171534430:web:2e304ca451b91374dc36cf",
  measurementId: "G-Q5GF81C8J1",
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
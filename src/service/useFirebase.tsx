import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMVZkBPybBM96fqeb5rlCOQceN1tBreuQ",
  authDomain: "akasharift-860aa.firebaseapp.com",
  projectId: "akasharift-860aa",
  storageBucket: "akasharift-860aa.appspot.com",
  messagingSenderId: "691171534430",
  appId: "1:691171534430:web:2e304ca451b91374dc36cf",
  measurementId: "G-Q5GF81C8J1",
};

export function useFirebase() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const querySnapshot = async (table: string) => {
    const q = await getDocs(collection(db, table));
    const items: any[] = [];
    q.forEach((doc) => {
      items.push(doc.id);
    });
    return items;
  };

  const login = async (email: string, password: string) => {
    const l = await signInWithEmailAndPassword(auth, email, password);
    return l;
  };

  const logout = () => {
    signOut(auth);
    window.location.href = "/login";
  };

  return {
    app,
    db,
    auth,
    getCollections: (table: string) => querySnapshot(table),
    login,
    logout,
  };
}

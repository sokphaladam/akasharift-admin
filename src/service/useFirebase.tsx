import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  FirebaseStorage,
  deleteObject,
  getDownloadURL,
  getStorage,
  list,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebase_app from "@/firebase/config";
import { firebase_store } from "@/firebase/firebase_store";

class FireStorageFile {
  refStr = "akasha_rift/";
  storage = getStorage(firebase_app);

  upload(file: File) {
    const storageRef = ref(this.storage, this.refStr + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask;
  }

  delete(pathname: string) {
    const storageRef = ref(this.storage, this.refStr + pathname);
    return deleteObject(storageRef);
  }

  getStorageRef(pathname: string) {
    return ref(this.storage, this.refStr + pathname);
  }

  async listF() {
    const storageRef = ref(this.storage, this.refStr);

    const { items } = await list(storageRef, { maxResults: 10 });

    console.log(items);

    return items.map((x) => {
      return {
        name: x.name,
        fullpath: x.fullPath,
      };
    });
  }
}

class FireDatabase {
  database = getFirestore(firebase_app);
}

export function useFirebase() {
  const db = getFirestore(firebase_app);
  const auth = getAuth(firebase_app);

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
    db,
    auth,
    getCollections: (table: string) => querySnapshot(table),
    login,
    logout,
    file: new FireStorageFile(),
    data: firebase_store,
  };
}

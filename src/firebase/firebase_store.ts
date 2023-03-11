import { getDoc, doc, Firestore, setDoc, collection, getDocs, QuerySnapshot, DocumentData, deleteDoc, onSnapshot, onSnapshotsInSync, getFirestore } from 'firebase/firestore';
import firebase_app from './config';

const firestore = getFirestore(firebase_app);

export class firebase_store {
  initFirestore: Firestore = getFirestore(firebase_app);

  constructor(initFirestore?: Firestore){
    this.initFirestore = initFirestore ? initFirestore : firestore;
  }

  static async getData(path: string, key?: string): Promise<{
    status: boolean;
    data: any[] | any | string
  }>{
    let docRef = null;
    
    if(key) {
      docRef = doc(firestore, path, key);
    }
    else{
      docRef = doc(firestore, path);
    }

    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()) {
      return {
        status: true,
        data: docSnap.data()
      };
    }
    else {
      return {
        status: false,
        data: null
      };
    }
  }

  static async getMutipleData(path: string): Promise<{
    status: boolean;
    data: QuerySnapshot<DocumentData> | null
  }>{

    const querySnapShot = await getDocs(collection(firestore, path));

    if(!querySnapShot.empty) {
      return {
        status: true,
        data: querySnapShot
      };
    }
    else {
      return {
        status: false,
        data: null
      };
    }
  }

  static async updateData(path: string, key: string, data: any) {
    const docRef = doc(firestore, path, key);
    return setDoc(docRef, data)
    .then((docRef) => {
      return {
        status: true,
        message: "Entire Document has been updated successfully"
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error
      }
    });
  }

  static async createData(path: string, data: any, key: string) {
    const docRef = doc(firestore, path, key.trim());
    return setDoc(docRef, data).then((docRef) => {
      return {
        status: true,
        message: "Entire Document has been create successfully"
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error
      }
    });
  }

  static async removeData(path: string, key: string) {
    const docRef = doc(firestore, path, key);

    return deleteDoc(docRef).then((docRef) => {
      return {
        status: true,
        message: "Entire Document has been deleted successfully"
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error
      }
    });
  }
}
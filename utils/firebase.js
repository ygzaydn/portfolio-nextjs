import * as firebase from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const config = {
    apiKey: process.env.REACT_APP_FIRESTORE_KEY,
    authDomain: "portfolio-ab6ae.firebaseapp.com",
    projectId: "portfolio-ab6ae",
    storageBucket: "portfolio-ab6ae.appspot.com",
    messagingSenderId: "1028906859886",
    appId: "1:1028906859886:web:a537b441350e117232157f",
};

class Firebase {
    constructor() {
        if (!firebase?.apps?.length) {
            firebase.initializeApp(config);
        }
        this.db = getFirestore();
    }

    doPushNewMessage = async (uuid, data) => {
        const ref = collection(this.db, "contacts");
        await setDoc(doc(ref, uuid), {
            ...data,
        });
        return true;
    };
}

export default Firebase;

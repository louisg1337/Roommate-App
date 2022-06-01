import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "./auth";
import { app } from "./initFirebase";

const db = getFirestore(app);

export const createUserDb = (id, name) => {
    setDoc(doc(db, "users", id), {
        name,
        roomId: "",
    }).then((result) => {
        console.log(result)
    }).catch(e => {
        alert("An error has occured! " + e.message);
    })
}

export const getUser = (id) => {
    
}
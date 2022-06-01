import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { app } from "./initFirebase";
import { createUserDb } from "./firestore";

export const auth = getAuth(app);

export const createUser = (name, email, password) => {
    const result = new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            createUserDb(user.uid, name);
            updateProfile(user, {
                displayName: name
            }).then(() => {
                resolve(user)
            }).catch(e => console.log(e))
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
            alert("Error has occured: " + errorMessage);
        });
    })

    return result;
}

export const signInUser = (email, password) => {
    const result = new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            resolve(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
            alert("Error has occured: " + errorMessage);
        });
    })

    return result;
}

export const signOutUser = () => {
    signOut(auth);
}


export const authObserver = () => {
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
      return unsub;
    }, []);
  
    return currentUser;
}

import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from "./auth";
import { app } from "./initFirebase";
import { customAlphabet } from 'nanoid/non-secure'

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

export const initData = () => {

    let result = new Promise((resolve, reject) => {
        const user = auth.currentUser;
        getUserById(user.uid).then((userData) => {
            userData.id = user.uid;
            const roomId = userData.roomId;
            delete userData.roomId;
            if (roomId != ""){
                getRoomById(roomId).then((roomData) => {
                    roomData.roomId = roomId;
                    resolve([true, userData, roomData])
                })
            } else {
                resolve([false, userData])
            }  
        })
    });
    
    return result;
}

export const getUserById = (id) => {

    let result = new Promise((resolve, reject) => {
        const userRef = doc(db, "users", id);
        getDoc(userRef).then((userSnap) => {
            if (userSnap.exists()) {
                resolve(userSnap.data());
            } else {
                alert("Something went wrong!");
                resolve(false);
            }
        }).catch((e) => alert("Something went wrong! " + e.message))
    });

    return result
}

export const getRoomById = (id) => {

    let result = new Promise((resolve, reject) => {
        const roomRef = doc(db, "rooms", id);
        getDoc(roomRef).then((roomSnap) => {
            if (roomSnap.exists()) {
                resolve(roomSnap.data());
            } else {
                alert("Something went wrong!");
                resolve(false);
            }
        }).catch((e) => alert("Something went wrong! " + e.message))
    });

    return result
}

export const createRoom = (user, roomName) => {
    let result = new Promise((resolve, rejeect) => {
        console.log('here!')
        const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
        const roomId = nanoid();

        setDoc(doc(db, "rooms", roomId), {
            roomName,
            roommates: [user],
            owner: user.id,
        }).then((response) => {
            console.log("Made room: " + response);
            // Add to user
            updateDoc(doc(db, "users", user.id), {
                roomId: roomId
            }).then(() => {
                let data = {
                    roomName,
                    roomId,
                    roommates: [user],
                    owner: user.id,
                }
                resolve(data);
            })
        }).catch((e) => alert("Something went wrong! " + e.message))
    });

    return result;
}

export const joinRoom = (roomId, user) => {
    let result = new Promise((resolve, reject) => {
        getRoomById(roomId).then((room) => {
            if (room) {
                // Update users roomId
                updateDoc(doc(db, "users", user.id), {
                    roomId: roomId
                }).then(() => {
                    // Update room's "roommate" and push user in
                    updateDoc(doc(db, "rooms", roomId), {
                        roommates: arrayUnion(user)
                    }).then(() => {
                        // Resolve data for room reducer
                        let data = {
                            roomId,
                            ...room
                        }
                        resolve(data);
                    })
                })

            } else {    
                resolve(false)
            }
        })
    });

    return result;
}
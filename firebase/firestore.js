import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, addDoc, collection } from "firebase/firestore";
import { auth } from "./auth";
import { app } from "./initFirebase";
import { customAlphabet } from 'nanoid/non-secure'

const db = getFirestore(app);

/**
 * Create user in the database
 * @param {*} id 
 * @param {*} name 
 */
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

/**
 * Runs on start and retrieves user data and, if exists, room data.
 * @returns [boolean, userData, roomData(exists?)]
 */
export const initData = () => {

    let result = new Promise((resolve, reject) => {
        const user = auth.currentUser;
        // Find user
        getUserById(user.uid).then((userData) => {
            userData.id = user.uid;
            const roomId = userData.roomId;
            delete userData.roomId;
            // If in room, get data and send back to be saved
            if (roomId != ""){
                getRoomById(roomId).then((roomData) => {
                    roomData.roomId = roomId;
                    resolve([true, userData, roomData])
                })
            // If doesn't have room, send back just user data
            } else {
                resolve([false, userData])
            }  
        })
    });
    
    return result;
}

/**
 * Retrieve user
 * @param {*} id 
 * @returns user data
 */
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

/**
 * Retrieve room
 * @param {*} id 
 * @returns room data
 */
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

/**
 * Creates new room
 * @param {*} user 
 * @param {*} roomName 
 * @returns room data
 */
export const createRoom = (user, roomName) => {
    let result = new Promise(async (resolve, rejeect) => {
        const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
        const roomId = nanoid();

        // Create new expenses and todo
        const expenseRef = await addDoc(collection(db, "expenses"), {});
        const todoRef = await addDoc(collection(db, "todos"), {});

        let data = {
            roomName,
            roommates: [user],
            owner: user.id,
            expenseId: expenseRef.id,
            todoId: todoRef.id,
            status: 'Free',
            statusName: 'None',
        }

        setDoc(doc(db, "rooms", roomId), data).then((response) => {
            console.log("Made room");
            // Add to user
            updateDoc(doc(db, "users", user.id), {
                roomId: roomId
            }).then(() => {
                resolve(data);
            })
        }).catch((e) => alert("Something went wrong! " + e.message))
    });

    return result;
}

/**
 * Allows user to join room based off of id
 * @param {*} roomId 
 * @param {*} user 
 * @returns room data
 */
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
                // If data was not found
                resolve(false)
            }
        })
    });

    return result;
}

/**
 * 
 * @param {*} status 
 * @param {*} statusName 
 * @param {*} roomId 
 */
export const updateStatus = (status, statusName, roomId) => {
    updateDoc(doc(db, "rooms", roomId), {
        status, 
        statusName
    })
    .then(() => console.log('Success!'))
    .catch((e) => alert('An error has occured! ' + e.message));
}
import { get, set, ref, query, equalTo,orderByChild, update } from "firebase/database";
import { db } from "../config/firebase-config";

export const getUserByHandle = (handle) => {
    return get(ref(db, `users/${handle}`))
};

export const createUserHandle = async (firstName, lastName, username, uid, email, phoneNumber) => {

    return await set(ref(db, `users/${username}`), {
      firstName,
      lastName,
      username,
      uid,
      email,
      phoneNumber,
      avatarUrl: "https://p7.hiclipart.com/preview/962/225/162/gloria-alex-melman-skipper-madagascar-madagascar.jpg",
    })
};

export const getUserData = (uid) => {
    return get(query(ref(db, `users`), orderByChild('uid'), equalTo(uid)));
};

export const updateUser = async (username, userData) => {

    const userRef = ref(db, `users/${username}`)
    await update(userRef, userData)
  }

  export const getAllUsers = async () => {
    const snapshot = await get(ref(db, 'users'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  }
  
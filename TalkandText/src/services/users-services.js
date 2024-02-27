import { get, set, ref, query, equalTo,orderByChild } from "firebase/database";
import { db } from "../config/firebase-config";

export const getUserByHandle = (handle) => {
    return get(ref(db, `users/${handle}`))
};

export const createUserHandle = (username, firstName, lastName, uid, email, ) => {

    return set(ref(db, `users/${username}`), {
      username,
      firstName,
      lastName,
      uid,
      email,
      avatarUrl: "https://static.thenounproject.com/png/989418-200.png",
    })
}

export const getUserData = (uid) => {
    return get(ref(db, `users`), orderByChild('uid'), equalTo(uid));
};

export const updateUser = async (username, userData) => {

    const userRef = ref(db, `users/${username}`)
    await update(userRef, userData)
  }
  
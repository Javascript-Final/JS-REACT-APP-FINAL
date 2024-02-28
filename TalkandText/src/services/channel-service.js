import { get, ref, equalTo,orderByChild, update, push } from "firebase/database";
import { db } from "../config/firebase-config";

// export const getChannelByTitle = (handle) => {
//     return get(ref(db, `channels/${handle}`))
// };

export const createChannel = async (channelTitle, username) => {
    const result = ref(db, `channels`);
    return await push(result, {
            channelTitle: channelTitle,
            participants: [username]
        });
}

// export const getChannelData = (cid) => {
//     return get(ref(db, `channels`), orderByChild('cid'), equalTo(cid));
// };

// export const updateChannel = async (channelTitle, channelId) => {

//     const channelRef = ref(db, `channels/${channelTitle}`)
//     await update(channelRef, channelId)
//   }
  
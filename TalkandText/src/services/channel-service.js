import { get, set, ref, equalTo,orderByChild, update, push } from "firebase/database";
import { db } from "../config/firebase-config";

export const getChannelByCid = (cid) => {
    return get(ref(db, `channels/${cid}`))
};

export const createChannel = async (channelTitle, channelPrivacy, username, tid) => {
    try {
        const result = await push(ref(db, 'channels'), {}); // Create a new object in the 'channels' collection with empty content and get the result of the operation.
        const cid = result.key; // Get the unique identifier (cid) of the newly created element.
        const participants = [username]; 

        await set(ref(db, `channels/${cid}`), { channelTitle, channelPrivacy, participants, cid, tid, messages: {} });

        return cid; 
    } catch (error) {
        console.error('Error adding channel:', error);
        throw error;
    }
};


export const sendMessageToChannel = async (channelTitle, username, message) => {

  // Create a reference to the messages in the channel
  const messagesRef = ref(db, `channels/${channelTitle}/messages`);

  // Use the push method to create a new message
  const newMessageRef = push(messagesRef);

  // Set the message data
  await set(newMessageRef, {
    sender: username,
    text: message,
    timestamp: Date.now(),
  });
};

export const getChannelParticipants = (cid) => {
    return get(query(db, `channels/${cid}/participants`))
};

// export const updateChannel = async (channelTitle, channelId) => {

//     const channelRef = ref(db, `channels/${channelTitle}`)
//     await update(channelRef, channelId)
//   }

export const getAllChannels = async (cid) => {
    const snapshot = await get(ref(db, 'channels'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
}

// [TODO]: Get channels by team id
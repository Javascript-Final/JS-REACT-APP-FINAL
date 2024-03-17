import { useState, useEffect, useContext, useRef } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getChannelByCid, getChannelTitleByCid, getChannelsByTid} from '../services/channel-service';
import { AppContext } from '../context/AppContext';


export default function TeamView({ cid }) {

  const [channels, setChannels] = useState([]);
    //const [channelTitle, setChannelTitle] = useState('');
   // const { userData } = useContext(AppContext);
   // const chatRef = useRef(null);

    useEffect(() => {
        const db = getDatabase();
        const channelRef = ref(db, `channels/${cid}/channelTitle`);

        // Listen for changes in the messages node
        return onValue(channelRef, (snapshot) => {
            const data = snapshot.val();
            const loadedChannels = [];
            for (const id in data) {
                loadedChannels.push({ id, ...data[id] });
            }
            setChannels(loadedChannels);
        });
    }, [cid]);

   /*  useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }, 0);

        // Cleanup function
        return () => {
            clearTimeout(timeoutId);
        };
    }, [messages]); */

    /* const send = async () => {
        if (message.trim() !== '') {
            await sendMessageToChannel(cid, userData?.username, message);
            setMessage('');
        }
    } */
    
    /* useEffect(() => {
        const fetchTeamChannels = async () => {
            try {
                const teamChannels = await getChannelsByTid(tid);
                setChannelTitle(teamChannels);
            } catch (error) {
                console.error('Error fetching channel title:', error);
            }
        };

        fetchTeamChannels();
    }, [cid]); */
 
    
    return (
        <div style={{ maxHeight: '500px', overflowY: 'auto', display: 'flex', flexDirection: 'column', paddingTop: '50px' }} >
           
            
            <div>
            {channels.map((channel) => (
                    <div
                        key={channel.channelTitle}
                       
                    >
                       
                    </div>
                ))}
              </div>            
            
        </div>
    );
};
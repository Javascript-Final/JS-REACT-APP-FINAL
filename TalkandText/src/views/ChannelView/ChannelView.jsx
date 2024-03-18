import { useState, useEffect, useContext, useRef } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getChannelByCid, getChannelTitleByCid, sendMessageToChannel } from '../../services/channel-service';
import { AppContext } from '../../context/AppContext';
import { Button, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ChannelView({ cid }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [channelTitle, setChannelTitle] = useState('');
    const { userData } = useContext(AppContext);
    const chatRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const db = getDatabase();
        const messagesRef = ref(db, `channels/${cid}/messages`);

        // Listen for changes in the messages node
        return onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = [];
            for (const id in data) {
                loadedMessages.push({ id, ...data[id] });
            }
            setMessages(loadedMessages);
        });
    }, [cid]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (chatRef.current) {
                chatRef.current?.scrollIntoView({ behavior: "instant" })
            }
        }, 0);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [messages]);


    const send = async () => {
        if (message.trim() !== '') {
            await sendMessageToChannel(cid, userData?.username, message, userData?.avatarUrl);
            setMessage('');
        }
    }

    useEffect(() => {
        const fetchChannelTitle = async () => {
            try {
                const channelTitle = await getChannelTitleByCid(cid);
                setChannelTitle(channelTitle);
            } catch (error) {
                console.error('Error fetching channel title:', error);
            }
        };

        fetchChannelTitle();
    }, [cid]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingTop: '20px' }} >
            <h1 style={{ marginBottom: '10px', paddingTop: '25px', textAlign: 'center' }}>{channelTitle}</h1>
            <div style={{ flex: '1', overflowY: 'auto', padding: '10px', position: 'relative' }}>
                <div style={{ overflowY: 'auto', marginBottom: '50px' }}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: msg.sender === userData?.username ? 'flex-end' : 'flex-start',
                                marginBottom: '10px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#e6e6e6',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    color: 'blue',
                                }}
                            >
                                <Avatar src={msg.avatarUrl} style={{ marginRight: '10px' }} />
                                <strong>
                                    {typeof msg.sender === 'object'
                                        ? JSON.stringify(msg.sender)
                                        : msg.sender}
                                </strong>
                                :{' '}
                                {typeof msg.text === 'object'
                                    ? JSON.stringify(msg.text)
                                    : msg.text}
                            </div>
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#999',
                                    marginTop: '5px',
                                    textAlign: msg.sender === userData?.username ? 'right' : 'left',
                                }}
                            >
                                {new Date(msg.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))}
                    <div ref={chatRef} />
                </div>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent the form from refreshing the page
                    send();
                }}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', borderTop: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ flex: '0.8', maxWidth: '600px', marginRight: '10px', backgroundColor: "white", color: "black", height: '30px', borderRadius: '5px', padding: '5px' }}
                />
                <Button type="submit" startIcon={<SendIcon />} variant="contained" color="primary">Send</Button>
            </form>
        </div>
    );
};
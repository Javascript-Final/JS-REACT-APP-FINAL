import { useState, useEffect, useContext, useRef } from 'react';
import { sendMessageToChannel } from '../services/channel-service';
import { getDatabase, ref, onValue } from 'firebase/database';
import { AppContext } from '../context/AppContext';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';

export default function ChatView({ channelTitle }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { userData } = useContext(AppContext);
    const chatRef = useRef(null);

    useEffect(() => {
        const db = getDatabase();
        const messagesRef = ref(db, `channels/${channelTitle}/messages`);

        // Listen for changes in the messages node
      return onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = [];
            for (const id in data) {
                loadedMessages.push({ id, ...data[id] });
            }
            setMessages(loadedMessages);
        });
    }, [channelTitle]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }, 0);

        // Cleanup function
        return () => {
            clearTimeout(timeoutId);
        };
    }, [messages]);

    const send = async () => {
        if (message.trim() !== '') {
            await sendMessageToChannel(channelTitle, userData?.username, message);
            setMessage('');
        }
    };

    return (
        <div style={{ maxHeight: '93vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', paddingTop: "40px" }} >
            <h1>{channelTitle}</h1>
            <div ref={chatRef} id='message-box' style={{ flex: '1', overflowY: 'auto', marginBottom: 'auto', maxHeight: "80vh" }}>
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
                                display: 'inline-block',
                                backgroundColor: '#e6e6e6',
                                borderRadius: '10px',
                                padding: '10px',
                                color: 'blue', 
                            }}
                        >
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
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent the form from refreshing the page
                    send();
                }}
                style={{ padding: '10px', borderTop: '1px solid #ddd', display: 'flex' }}
            >
                <input
                    type="text"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ flex: '1', marginRight: '10px' }}
                />
                    <Button type="submit" startIcon={<SendIcon />}></Button>
                {/* <SendIcon><button type="submit">Send</button></SendIcon> */}
            </form>
        </div>
    );
};
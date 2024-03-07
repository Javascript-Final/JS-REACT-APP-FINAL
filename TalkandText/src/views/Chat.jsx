import { useState, useEffect, useContext } from 'react';
import { sendMessageToChannel } from '../services/channel-service';
import { getDatabase, ref, onValue } from 'firebase/database';
import { AppContext } from '../context/AppContext';

export default function ChatView({ channelTitle }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { userData } = useContext(AppContext);

    useEffect(() => {
        const db = getDatabase();
        const messagesRef = ref(db, `channels/${channelTitle}/messages`);

        // Listen for changes in the messages node
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = [];
            for (let id in data) {
                loadedMessages.push({ id, ...data[id] });
            }
            setMessages(loadedMessages);
        });
    }, [channelTitle]);

    const send = async () => {
        await sendMessageToChannel(channelTitle, userData?.username, message);
        setMessage('');
    };

    return (
        <div>
            <h1>{channelTitle}</h1>
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
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={send}>Send</button>
        </div>
    );
}
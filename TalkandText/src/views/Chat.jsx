import { useState, useEffect, useContext, useRef } from 'react';
import { sendMessageToChannel, editMessageInChannel } from '../services/channel-service';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { AppContext } from '../context/AppContext';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

export default function ChatView({ channelTitle }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const { userData } = useContext(AppContext);
    const chatRef = useRef(null);

    useEffect(() => {
        const db = getDatabase();
        const messagesRef = ref(db, `channels/${channelTitle}/messages`);

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

        return () => {
            clearTimeout(timeoutId);
        };
    }, [messages]);

    const send = async () => {
        if (editingMessageId !== null) {
            await editMessageInChannel(channelTitle, editingMessageId, message);
            setEditingMessageId(null);
        } else {
            if (message.trim() !== '') {
                await sendMessageToChannel(channelTitle, userData?.username, message);
            }
        }
        setMessage('');
    };

    const handleEdit = (msgId, msgText) => {
        setMessage(msgText);
        setEditingMessageId(msgId);
    };

    const handleSave = () => {
        send();
    };

    const handleDelete = async (msgId) => {
        try {
            const db = getDatabase();
            const messageRef = ref(db, `channels/${channelTitle}/messages/${msgId}`);
            await remove(messageRef);
        } catch (error) {
            console.error('Error deleting message:', error);
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
                        {editingMessageId === msg.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    style={{ flex: '1', marginRight: '10px',
                                     backgroundColor: "white",
                                      color: "black",
                                      borderRadius: "5px",
                                        padding: "5px",
                                        border: "1px solid #ddd",
                                        width: "300px",
                                        height: "30px",
                                        fontFamily: "Arial",
                                        fontSize: "15px",
                                    }}
                                />
                                
                                <Button onClick={handleSave} startIcon={<SaveIcon />} /> 
                            </div>
                        ) : (
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
                                {msg.sender === userData?.username && ( 
                                    <>
                                        <Button onClick={() => handleEdit(msg.id, msg.text)}><EditIcon /></Button>
                                        <Button onClick={() => handleDelete(msg.id)}><DeleteIcon /></Button>
                                    </>
                                )}
                            </div>
                        )}
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
                    style={{ flex: '1', marginRight: '10px', backgroundColor: "white", color: "black" }}
                />
                <Button type="submit" startIcon={<SendIcon />}></Button>
            </form>
        </div>
    );
};

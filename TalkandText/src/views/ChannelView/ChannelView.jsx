import React, { useState, useEffect, useContext, useRef } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { sendMessageToChannel, editMessageInChannel, getChannelTitleByCid } from '../../services/channel-service';
import { AppContext } from '../../context/AppContext';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ChannelView({ cid }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [channelTitle, setChannelTitle] = useState('');
    const [editingMessageId, setEditingMessageId] = useState(null);
    const { userData } = useContext(AppContext);
    const chatRef = useRef(null);

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
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }, 0);

        // Cleanup function
        return () => {
            clearTimeout(timeoutId);
        };
    }, [messages]);

    const send = async () => {
        if (editingMessageId !== null) {
            await editMessageInChannel(cid, editingMessageId, message);
            setEditingMessageId(null); // Clear editing state
        } else {
            if (message.trim() !== '') {
                await sendMessageToChannel(cid, userData?.username, message);
            }
        }
        setMessage('');
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

    const handleEdit = (msgId, msgText) => {
        setMessage(msgText);
        setEditingMessageId(msgId);
    };

    const handleDelete = async (msgId) => {
        try {
            const db = getDatabase();
            const messageRef = ref(db, `channels/${cid}/messages/${msgId}`);
            await remove(messageRef);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div style={{ maxHeight: "100vh", overflowY: 'auto', display: 'flex', flexDirection: 'column', paddingTop: '70px', paddingLeft: "70px", paddingRight: "70px" }} >
            <h1>{channelTitle}</h1>
            <div ref={chatRef} style={{ flex: '1', overflowY: 'auto', marginBottom: 'auto' }}>
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
                                <Button onClick={send} startIcon={<SaveIcon />} /> 
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

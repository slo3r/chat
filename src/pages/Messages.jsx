import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    let unSub;
    if (data.roomName) {
      unSub = onSnapshot(doc(db, "groupChats", data.roomName), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    } else {
      unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    }

    return () => {
      unSub();
    };
  }, [data.chatId, data.roomName]);

  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
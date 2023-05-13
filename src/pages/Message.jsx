import React, { useContext, useEffect, useRef, useState } from 'react'
import userImage from '../images/user.png';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [timeDiff, setTimeDiff] = useState("");
  const [sender, setSender] = useState(null);

  const currentDate = new Date();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    updateTimeDiff();
  }, [message]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimeDiff(); // Calculate the time difference every second
    }, 1000);
    return () => clearInterval(interval);
  }, [message, currentDate]);

  useEffect(() => {
    const fetchSender = async () => {
      const userRef = doc(db, "users", message.senderId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setSender(userDoc.data());
      }
    };

    fetchSender();
  }, [message.senderId]);

  const updateTimeDiff = () => {
    const currentDate = new Date();
    const diff = currentDate - message.date.toDate();

    if (diff < 60000) {
      setTimeDiff(`${Math.floor(diff / 1000)} seconds ago`);
      console.log("updating")
    } else if (diff < 3600000) {
      setTimeDiff(`${Math.floor(diff / 60000)} minutes ago`);
    } else if (diff < 86400000) {
      setTimeDiff(`${Math.floor(diff / 3600000)} hours ago`);
    } else {
      setTimeDiff(`${Math.floor(diff / 86400000)} days ago`);
    }
  };

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='messageInfo'>
      <img src={sender && sender.photoURL ? sender.photoURL : userImage} alt="" />
        <span>{timeDiff}</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message
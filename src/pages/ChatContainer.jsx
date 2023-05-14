import React, { useContext, useState } from 'react'
import Messages from './Messages';
import groupImage from '../images/group.png'
import userImage from '../images/user.png';
import { FaRegPaperPlane } from 'react-icons/fa';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { MdAddPhotoAlternate } from 'react-icons/md';
import ChatSettings from './ChatSettings';
import { RxCross1 } from 'react-icons/rx';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { v4 as uuid } from "uuid";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from '../firebase';

const ChatContainer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { data } = useContext(ChatContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSend(text);
    }
  };

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if (data.roomName) { // send to group chat
              await updateDoc(doc(db, "groupChats", data.roomName), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            } else { // send to private chat
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            }
          });
        }
      );
    } else {
      if (data.roomName) { // send to group chat
        await updateDoc(doc(db, "groupChats", data.roomName), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      } else { // send to private chat
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
    }
    
    if (!data.roomName) {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }

    setText("");
    setImg(null);
  };

  return (
    <div className='chatComponent'>

      <div className='chatSettingsTab' style={{ width: isOpen ? '0px' : '200px' }}>
        <span className='closeSettings' onClick={toggleSidebar}>
          <RxCross1 />
        </span>
        <ChatSettings />
      </div>

      <div className='topBar'>
        <img src={data.roomName ? groupImage : data.user?.photoURL || userImage}></img>
        <p>{data.roomName ? data.roomName : data.user?.displayName || 'No user selected'}</p>
        <span className='dots' onClick={toggleSidebar}>
          <BiDotsHorizontalRounded size='40px' style={{ cursor: 'pointer' }} />
        </span>

      </div>

      <div className='mainBar'>
        <Messages />
      </div>

      <div className='inputBar'>
        <input
          onKeyDown={handleKey}
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></input>
        <label htmlFor="file" className='send-image'>
          <span>
            <MdAddPhotoAlternate size='35px' />
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </span>
        </label>
        <span onClick={handleSend} className='send-icon'>
          <FaRegPaperPlane size='30px' />
        </span>
      </div>

    </div>
  )
}

export default ChatContainer
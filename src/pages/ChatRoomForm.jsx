import { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function ChatRoomForm() {
  const [chatRoomName, setChatRoomName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const chatRoomDoc = await getDoc(doc(db, "chatRooms", chatRoomName));


    if (chatRoomDoc.exists) {
      // join existing chat room
      console.log('exists')
    } else {
      // create new chat room
      console.log('doesnt exists')
      await setDoc(doc(db, "chatRooms", chatRoomName), { messages: [] });
      
    }
  };
  

  const handleInputChange = (event) => {
    setChatRoomName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={chatRoomName} onChange={handleInputChange} />
      <button type="submit">Join</button>
    </form>
  );
}
export default ChatRoomForm
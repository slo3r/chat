import React, { useState } from 'react'

const ChatRoomForm = ({ handleJoinRoom, setChatRoomForm }) => {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roomName.trim()) {
      handleJoinRoom(roomName.trim());
      setRoomName('');
    }
    setChatRoomForm(false);
  };

  const handleCancel = () => {
    setChatRoomForm(false);
  }

  return (
    <div className='groupchatContainer'>
      <button onClick={handleCancel} className='closeForm'>X</button>
      <form className='groupchatForm' onSubmit={handleSubmit}>
        <h3>Join chat room</h3>
        <input
          type='text'
          placeholder='Enter Room Name'
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type='submit'>Join Room</button>
      </form>
    </div>
  )
}

export default ChatRoomForm
import React from 'react'
import userImage from '../images/user.png';


const Message = () => {

  return (
    <div className='message'>
        <div className='messageInfo'>
            <img src={userImage}></img>
            <span>just now</span>
        </div>
        <div className='messageContent'>
            <p>Random text is displayed hereaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
        </div>
    </div>
  )
}

export default Message
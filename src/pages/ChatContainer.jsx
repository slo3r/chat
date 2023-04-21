import React ,{ useState }from 'react'
import Messages from './Messages';
import userImage from '../images/user.png';
import {FaRegPaperPlane} from 'react-icons/fa';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import ChatSettings from './ChatSettings';
import {RxCross1} from 'react-icons/rx';
import backgroundImage from '../images/wallpaper.jpg';

const ChatContainer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
            <img src={userImage}></img>
            <p>Username</p>
            <span className='dots' onClick={toggleSidebar}>
            <BiDotsHorizontalRounded size='40px' style={{cursor: 'pointer'}}/> 
            </span>
            
        </div>

        <div className='mainBar'> 
           <Messages />
        </div>

        <div className='inputBar'>
            <input></input>
            <span className='send-icon'>
            <FaRegPaperPlane size='30px'style={{cursor: 'pointer',position: 'absolute',bottom: '10px',right:'20px'}}/>
            </span>
        </div>

    </div>
  )
}

export default ChatContainer
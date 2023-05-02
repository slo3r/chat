import React, {useState} from 'react'
import Sidebar from './Sidebar.jsx'
import ChatContainer from './ChatContainer.jsx'

const Chat = () => {

const [isOpen, setIsOpen] = useState(true);

const fixedPadding = () => {
    setIsOpen(!isOpen);
}

  return (
    <div>
        <div className='chat' style={{ paddingRight: isOpen ? '00px' : '00px' }}>
                <div className='bckgrimage'>
                </div>

                <div>
                 <Sidebar changePadding = {fixedPadding}/>
                 </div>

                <div className='msg'>
                <ChatContainer />
                </div>
        </div>
    </div>
  )
}

export default Chat
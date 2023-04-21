import React, { useState } from 'react'
import userImage from '../images/user.png';
import { MdOutlineLogout } from 'react-icons/md';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { AiOutlineSearch } from 'react-icons/ai';
import { GrGroup } from 'react-icons/gr';
import { BsChatSquareDots } from 'react-icons/bs';

const Sidebar = (props) => {

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    props.changePadding();
  };
 

  return (
    <div className='sidebar' style={{ width: isOpen ? '400px' : '100px' }}>

      <div className='slider' style={{ left: isOpen ? '375px' : '75px' }} onClick={toggleSidebar}>
          <HiOutlineArrowSmLeft size="30px" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.4s' }}/>
      </div>

        <div style={{ paddingTop: isOpen ? '0px' : '10px' }} className='active-user'>
            <img src={userImage}></img>
            <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
        </div>

        <div style={{ padding: isOpen ? '0px' : '20px' }} className='users'>
            <BsChatSquareDots size="40px"/>
            <p style={{ display: isOpen ? 'unset' : 'none' }}>Users</p>
        </div>

        <div className='userlist'>
              <div style={{ padding: isOpen ? '0px' : '20px' }} className='userlist-user'>
                <img src={userImage}></img>
                 <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
             </div>
             <div style={{ padding: isOpen ? '0px' : '20px' }} className='userlist-user'>
                <img src={userImage}></img>
                 <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
             </div>
             <div style={{ padding: isOpen ? '0px' : '20px' }} className='userlist-user'>
                <img src={userImage}></img>
                 <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
             </div>
             <div style={{ padding: isOpen ? '0px' : '20px' }} className='userlist-user'>
                <img src={userImage}></img>
                 <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
             </div>
             <div style={{ padding: isOpen ? '0px' : '20px' }} className='userlist-user'>
                <img src={userImage}></img>
                 <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
             </div>
             <div style={{ padding: isOpen ? '0px' : '20px' }} className='userlist-user'>
                <img src={userImage}></img>
                 <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
             </div>
             <div style={{ padding: isOpen ? '0px' : '20px' }} className='userlist-user'>
                <img src={userImage}></img>
                 <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
             </div>
             <div style={{ padding: isOpen ? '0px' : '20px' }} className='userlist-user'>
                <img src={userImage}></img>
                 <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
             </div>
             <div style={{ padding: isOpen ? '0px' : '20px' }} className='userlist-user'>
                <img src={userImage}></img>
                 <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>Username</p>
             </div>
             
        </div>

        <div className='nav'>
          <div style={{ width: isOpen ? '400px' : '100px' }} className='userSearch nav-child' onClick={toggleSidebar}>
            <AiOutlineSearch size="40px"/>
            <p style={{ display: isOpen ? 'unset' : 'none' }}>Search for user</p>
          </div>
          <div style={{ width: isOpen ? '400px' : '100px' }} className='createGroup nav-child'>
            <GrGroup size="40px"/>
          <p style={{ display: isOpen ? 'unset' : 'none' }}>Create chat group</p>
          </div>
          <div style={{ width: isOpen ? '400px' : '100px' }} className='logOut nav-child'>
          <MdOutlineLogout size="40px"/>
          <p style={{ display: isOpen ? 'unset' : 'none' }}>Log out</p>
          </div>
        </div>
    </div>
  )
}

export default Sidebar
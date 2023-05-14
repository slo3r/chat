import React, { useContext, useEffect, useState } from 'react';
import { signOut, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import userImage from '../images/user.png';
import { MdOutlineLogout } from 'react-icons/md';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { GrGroup } from 'react-icons/gr';
import { BsChatSquareDots } from 'react-icons/bs';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import Search from './Search';
import ChatRoomForm from './ChatRoomForm';

const Sidebar = (props) => {
  // toggle sidebar
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    props.changePadding();
  };

  //user list
  const [showChatRoomForm, setChatRoomForm] = useState(false);
  const { handleJoinRoom } = useContext(ChatContext);
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    let userId = u.uid;
    let combinedId =
      currentUser.uid > u.uid
        ? currentUser.uid + u.uid
        : u.uid + currentUser.uid;
    profilepicUpdate(userId, combinedId, u);
    //console.log(currentUser.uid);
    //console.log(u.uid);
  
        // console.log(combinedId);
  };
  const profilepicUpdate = async(userId, combinedId, u) =>{
    const userInfoRef = doc(db, "users", userId);
    const userInfoSnapshot = await getDoc(userInfoRef);
    const userInfoData = userInfoSnapshot.data();

    u.photoURL = userInfoData.photoURL
    // console.log(userInfoData.photoURL)
    const userChatsRef = doc(db, "userChats", currentUser.uid);
    const userChatsDoc = await getDoc(userChatsRef);
    const combinedIdData = userChatsDoc.data()[combinedId];
    // console.log(combinedIdData.userInfo.photoURL)
    combinedIdData.userInfo.photoURL = userInfoData.photoURL;

    await updateDoc(userChatsRef, {
      [`${combinedId}.userInfo.photoURL`]: userInfoData.photoURL
    });
  
  };

//////////////////////////
  const displayName = currentUser?.displayName;
  const photoURL = currentUser?.photoURL;
  let photo = "";

  const handleProfilePicUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    try {
      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            });
            // Update user on firestore
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
              photoURL: downloadURL,
            });
          } catch (err) {
            console.log("Error updating profile:", err);
          }
        });
      });
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };
  if(photoURL === null){
    photo = userImage;
  }else{
    photo = currentUser.photoURL;
  }
  return (
    <div className='sidebar' style={{ width: isOpen ? '400px' : '100px' }}>
      <div className='slider' style={{ left: isOpen ? '375px' : '75px' }} onClick={toggleSidebar}>
          <HiOutlineArrowSmLeft size="30px" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.4s' }}/>
      </div>

        <div style={{ paddingTop: isOpen ? '0px' : '0px' }} className='active-user'>
        <div className="currentUserImg">
            <label htmlFor="profile-pic-input">
              <img  src={photo} alt='' />
              <span className='changePicture'>Change</span>
            </label>
            </div>
            <input id="profile-pic-input" type="file" accept="image/*" onChange={handleProfilePicUpload} style={{ display: 'none' }} />
            <p style={{ display: isOpen ? 'unset' : 'none' }} className='userName'>{currentUser.displayName}</p>
        </div>

        <div style={{ padding: isOpen ? '0px' : '20px' }} className='users'>
            <BsChatSquareDots size="40px"/>
            <p style={{ display: isOpen ? 'unset' : 'none' }}>Users</p>
        </div>

        <div className='userlist'>
             
       {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
            <div className='userlist-user' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
              <img src={chat[1].userInfo.photoURL ? chat[1].userInfo.photoURL : userImage} alt="" />
            <div style={{ display: isOpen ? 'unset' : 'none' }} className="userName">
              <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>

        </div>
      ))}
             
        </div>

        {showChatRoomForm && (
        <ChatRoomForm handleJoinRoom={handleJoinRoom} showChatRoomForm={showChatRoomForm} setChatRoomForm={setChatRoomForm} />
      )
      }

        <div className='nav'>
            <Search isOpen={isOpen} />
          <div onClick={() => {setChatRoomForm(true); handleSelect(null);}} style={{ width: isOpen ? '400px' : '100px' }} className='createGroup nav-child'>
            <GrGroup size="40px"/>
            <p style={{ display: isOpen ? 'unset' : 'none' }}>Join chat room</p>
          </div>
          <div onClick={()=>signOut(auth)} style={{ width: isOpen ? '400px' : '100px' }} className='logOut nav-child'>
            <MdOutlineLogout size="40px"/>
            <p style={{ display: isOpen ? 'unset' : 'none' }}>Log out</p>
          </div>
        </div>
    </div>
  )
}

export default Sidebar
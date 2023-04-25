import React, { useContext, useState } from 'react';
import { signOut, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import userImage from '../images/user.png';
import { MdOutlineLogout } from 'react-icons/md';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { GrGroup } from 'react-icons/gr';
import { BsChatSquareDots } from 'react-icons/bs';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import Search from './Search';

const Sidebar = (props) => {
  // toggle sidebar
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    props.changePadding();
  };
  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const { currentUser } = useContext(AuthContext);
  const displayName = currentUser?.displayName;
  const photoURL = currentUser?.photoURL;
  let photo = "";
  // const photo = currentUser.photoURL ? currentUser.photoURL : userImage;


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
    console.log("working")
  }else{
    photo = currentUser.photoURL;
  }
 
  return (
    <div className='sidebar' style={{ width: isOpen ? '400px' : '100px' }}>
      <div className='slider' style={{ left: isOpen ? '375px' : '75px' }} onClick={toggleSidebar}>
          <HiOutlineArrowSmLeft size="30px" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.4s' }}/>
      </div>

        <div style={{ paddingTop: isOpen ? '0px' : '10px' }} className='active-user'>
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
            <Search isOpen={isOpen} />
          <div style={{ width: isOpen ? '400px' : '100px' }} className='createGroup nav-child'>
            <GrGroup size="40px"/>
            <p style={{ display: isOpen ? 'unset' : 'none' }}>Create chat group</p>
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
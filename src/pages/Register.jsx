import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { IoIosLock } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    console.log(displayName, email, password);
  
  try{
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(res.user, { displayName });
  console.log(res);

    await setDoc(doc(db, "users", res.user.uid),{
      uid: res.user.uid,
      displayName,
      email
    });
    await setDoc(doc(db, "userChats", res.user.uid),{})
    navigate("/");
  }catch(err){
    console.log(err);
    setErr(true);
  }
  }

  return (
    <div className='form-box'>
    <div className='form-container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input className='Input' required placeholder='Username'></input>
        <input className='Input' required placeholder='Email'></input>
        <input className='Input' type="password" required placeholder='Password'></input>
        <FaUserAlt size="20px" style={{ position: 'absolute', left: '385px', top:'220px'}}/>
        <MdAlternateEmail size="25px" style={{ position: 'absolute', left: '385px', top:'325px'}}/>
        <IoIosLock size="25px" style={{ position: 'absolute', left: '383px', top:'435px'}} />
        <button className='Button'>Register</button>
        {err && <span>Something went wrong</span>}
      </form>
      <p className='Switch'><Link to="/Login" style={{ color: 'inherit', textDecoration: 'inherit'}}>Click here to <b><i>login</i></b></Link></p>
    </div>
    </div>
  )
}
export default Register;
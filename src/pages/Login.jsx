import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { IoIosLock } from 'react-icons/io';
import { MdAlternateEmail } from 'react-icons/md';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
  
  try{
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/")
  }catch(err){
    console.log(err);
    setErr(true);
  }
  }

  return (
    <div className='form-box'>
    <div className='form-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input className='Input' required placeholder='Email'></input>
        <input className='Input' type="password" required placeholder='Password'></input>
        <MdAlternateEmail size="25px" style={{ position: 'absolute', left: '385px', top:'215px'}}/>
        <IoIosLock size="25px" style={{ position: 'absolute', left: '383px', top:'325px'}} />
        <button className='Button'>Login</button>
        {err && <span>Something went wrong</span>}
      </form>
      <p className='Switch'><Link to="/Register" style={{ color: 'inherit', textDecoration: 'inherit'}}>Click here to <b><i>register</i></b></Link></p>
    </div>
    </div>
  )
}
export default Login;
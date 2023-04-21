import React from 'react'
import { Link } from "react-router-dom";
import { IoIosLock } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';

const Login = () => {
  return (
    <div className='form-box'>
    <div className='form-container'>
      <h1>Login</h1>
      <form>
        <input className='Input' required placeholder='Username'></input>
        <input className='Input' type="password" required placeholder='Password'></input>
        <IoIosLock size="25px" style={{ position: 'absolute', left: '383px', top:'325px'}} />
        <FaUserAlt size="20px" style={{ position: 'absolute', left: '385px', top:'220px'}}/>
        <button className='Button'>Login</button>
      </form>
      <p className='Switch'><Link to="/Register" style={{ color: 'inherit', textDecoration: 'inherit'}}>Click here to <b><i>register</i></b></Link></p>
    </div>
    </div>
  )
}
export default Login;
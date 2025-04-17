import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const handlesignup=()=>{
  navigate("/signup");
  }
  const handlelogin=()=>{
  if(!username || !email){
  alert("Enter all fields to login");
  }
  }
 
  return (
   <div className="flex flex-col gap-5 p-4 max-w-md border border-gray-400 rounded shadow-lg m-auto">
   <div className="flex flex-col gap-3">
   <div className="flex bg-gray-700  items-center gap-2 rounded p-2">
   <MdEmail className="text-white text-xl"></MdEmail>
   <input type="text" className="border border-gray-300 bg-transparent text-white w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
   </div>
   <div className="flex bg-gray-700 items-center gap-2 rounded p-2">
   <RiLockPasswordLine className="text-white text-xl"></RiLockPasswordLine>
   <input type="text" className="border border-gray-300 bg-transparent text-white w-full" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
   </div>
   </div>
   <div className="flex justify-between">
   <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handlelogin}>LOG IN</button>
   <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handlesignup}>SIGN UP</button>
   </div>
   </div>
  )
}

export default Login

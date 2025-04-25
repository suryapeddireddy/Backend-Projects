import React, { useState ,useEffect} from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from 'axios';
import { connectSocket } from '../utils/socket'; // Import connectSocket from utils

const Login = ({ userdata, setuserdata }) => {
  const navigate = useNavigate();
 useEffect(() => {
 if(userdata.username){
 navigate('/home');
 }
 }, [userdata,navigate])
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handlesignup = () => {
    navigate("/signup");
  };

  const handlelogin = async () => {
    try {
      if (!email || !password) {
        alert("Enter all fields to login");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("User logged in");

        const user = { username: res.data.user.username, email };
        setuserdata(user);

        connectSocket(res.data.user.id);  
        navigate('/home');
      } else {
        alert("Unexpected response");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 404) {
          alert("User not found");
        } else if (status === 401) {
          alert("Incorrect Password");
        } else if (status === 500) {
          alert("Internal server error");
        } else {
          alert("Login failed");
        }
      } else {
        alert("Network error");
      }

      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 max-w-md border border-gray-400 rounded shadow-lg m-auto">
      <div className="flex flex-col gap-3">
        <div className="flex bg-gray-700 items-center gap-2 rounded p-2">
          <MdEmail className="text-white text-xl" />
          <input
            type="text"
            className="border border-gray-300 bg-transparent text-white w-full"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex bg-gray-700 items-center gap-2 rounded p-2">
          <RiLockPasswordLine className="text-white text-xl" />
          <input
            type={showPassword ? "text" : "password"}
            className="border border-gray-300 bg-transparent text-white w-full"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setShowPassword(!showPassword)} className="text-white">
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handlelogin}>
          LOG IN
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handlesignup}>
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Login;

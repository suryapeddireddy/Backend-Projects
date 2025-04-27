import React, { useState, useEffect } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from 'axios';
import { connectSocket } from '../utils/socket'; // Import connectSocket from utils

const Login = ({ userdata, setuserdata }) => {
  const navigate = useNavigate();
  
  // Clear userdata when you land on Login page
  useEffect(() => {
    setuserdata({ username: "", email: "", profile: "" });
  }, [setuserdata]);

  // Redirect if already logged in
  useEffect(() => {
    if (userdata.username) {
      navigate('/home');
    }
  }, [userdata, navigate]);

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

        const user = {
          username: res.data.user.username,
          email: res.data.user.email,
          profile: res.data.user.profile,
        };
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
    <div className="flex flex-col gap-5 p-6 max-w-md border border-gray-400 rounded-lg shadow-lg m-auto mt-10">
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">Login</h2>

      <div className="flex flex-col gap-4">
        <div className="flex bg-gray-700 items-center gap-3 rounded p-3">
          <MdEmail className="text-white text-xl" />
          <input
            type="text"
            className="border-none outline-none bg-transparent text-white w-full placeholder-gray-300"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex bg-gray-700 items-center gap-3 rounded p-3">
          <RiLockPasswordLine className="text-white text-xl" />
          <input
            type={showPassword ? "text" : "password"}
            className="border-none outline-none bg-transparent text-white w-full placeholder-gray-300"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white text-xl">
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
          onClick={handlelogin}
        >
          LOG IN
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg"
          onClick={handlesignup}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Login;

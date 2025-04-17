import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ state

  const handlesignup = async () => {
    try {
      if (!username || !email || !password) {
        alert("Enter all fields to signup");
        return;
      }

      const res = await axios.post("http://localhost:3000/api/v1/users/signup", {
        username,
        email,
        password
      });

      if (res.status === 201) {
        alert("Signed up successfully");
      } else {
        alert("Unexpected response");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          alert("User already exists");
        } else if (status === 500) {
          alert("Internal server error");
        } else {
          alert("Signup failed: " + error.response.data.message);
        }
      } else {
        alert("Network error");
      }
      console.log(error);
    }
  };

  const handlelogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-5 p-4 max-w-md border border-gray-400 rounded shadow-lg m-auto">
      <div className="flex flex-col gap-3">
        <div className="flex bg-gray-700 items-center gap-2 rounded p-2">
          <FaRegUser className="text-white text-xl" />
          <input
            type="text"
            className="border border-gray-300 bg-transparent text-white w-full"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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

export default Signup;

import React, { useState, useEffect } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ userdata }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userdata.username) {
      navigate('/home');
    }
  }, [userdata, navigate]);

  const handlesignup = async () => {
    try {
      if (!username || !email || !password) {
        alert('Please fill all the fields');
        return;
      }

      const res = await axios.post('http://localhost:3000/api/v1/users/signup', {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        alert('Signed up successfully');
        navigate('/login'); // Redirect to login after successful signup
      } else {
        alert('Unexpected response');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          alert('User already exists');
        } else if (status === 500) {
          alert('Internal server error');
        } else {
          alert('Signup failed: ' + error.response.data.message);
        }
      } else {
        alert('Network error');
      }
      console.log(error);
    } finally {
      setEmail('');
      setPassword('');
      setUsername('');
      setShowPassword(false);
    }
  };

  const handlelogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-4">
      <div className="flex flex-col gap-5 p-6 max-w-md w-full bg-gray-900 border border-gray-600 rounded-lg shadow-lg">
        <h2 className="text-3xl text-center text-white font-bold mb-6">Create Account</h2>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
            <FaRegUser className="text-white text-xl" />
            <input
              type="text"
              className="bg-transparent text-white w-full border border-gray-500 rounded-lg p-2 focus:outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
            <MdEmail className="text-white text-xl" />
            <input
              type="email"
              className="bg-transparent text-white w-full border border-gray-500 rounded-lg p-2 focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
            <RiLockPasswordLine className="text-white text-xl" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="bg-transparent text-white w-full border border-gray-500 rounded-lg p-2 focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => setShowPassword(!showPassword)} className="text-white">
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-1/2"
            onClick={handlelogin}
          >
            Log In
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-1/2"
            onClick={handlesignup}
          >
            Sign Up
          </button>
        </div>

        <div className="text-center text-white text-sm mt-4">
          <span>Already have an account? </span>
          <button onClick={handlelogin} className="text-blue-400 underline">
            Log in here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

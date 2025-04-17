import React, { useState } from 'react';
import profile from '../assets/profile.png';
import axios from 'axios';
const Navbar = ({ userlogged, setuserlogged}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/logout", {}, { withCredentials: true });
  
      if (res.status === 200) {
        setuserlogged(false);
        setShowDropdown(false);
        alert("Logged out successfully");
      } else {
        alert("Unexpected response");
      }
  
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 500) {
          alert("Internal server error");
        } else if (status === 401) {
          alert("Token not provided");
        } else {
          alert("Unexpected error");
        }
      } else {
        alert("Network error");
      }
      console.log(error);
    }
  };
  
  return (
    <div className="flex h-auto items-center w-full relative">
      {/* Left section */}
      <div className="w-3/4">
        <a href="/">Chatapp</a>
      </div>

      {/* Right section */}
      <div className="w-1/4 flex items-center justify-between relative">
        <a href="/Contact">Contact Us</a>
        <img
          src={profile}
          alt="profile"
          height={40}
          width={40}
          className="cursor-pointer"
          onClick={handleProfileClick}
        />

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 bg-white shadow-md border rounded-md w-32 p-2 z-10">
            <a
              href="/profile"
              className="block px-2 py-1 hover:bg-gray-100"
              onClick={() => setShowDropdown(false)}
            >
              Profile
            </a>

            {userlogged ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-1 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="block px-2 py-1 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Login
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

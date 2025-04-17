import React, { useState } from 'react';
import profile from '../assets/profile.png';

const Navbar = ({ loggedIn, setloggeIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setloggeIn(false);
    setShowDropdown(false);
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

            {loggedIn ? (
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

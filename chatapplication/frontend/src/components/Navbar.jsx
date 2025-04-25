import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added this import
import profile from "../assets/profile.png";
import axios from "axios";
import { disconnectSocket } from "../utils/socket"; // Import the socket disconnect utility

const Navbar = ({ userdata, setuserdata }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const profileImageRef = useRef(null);
  const navigate=useNavigate();
  // Toggle dropdown visibility
  const handleProfileClick = () => {
    setShowDropdown((prevState) => !prevState);
  };

  // Handle logout and disconnect socket
  const handleLogout = async () => {
    try {
      // Send logout request to the backend
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        // If logout is successful, disconnect the socket and clear user data
        disconnectSocket(); // Disconnect the socket here
        setShowDropdown(false);
        alert("Logged out successfully");
        const user = { username: "", email: "", profile: "" };
        setuserdata(user);
        navigate('/');
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

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        profileImageRef.current &&
        !profileImageRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("User data changed:", userdata);
  }, [userdata]);

  return (
    <div>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
        <div className="flex h-auto items-center w-full relative py-4 px-6">
          {/* Left section */}
          <div className="w-3/4">
            <Link to="/" className="font-semibold text-lg">
              Chatapp
            </Link>
          </div>

          {/* Right section */}
          <div className="w-1/4 flex items-center justify-between relative">
            <Link to="/Contact" className="text-sm">
              Contact Us
            </Link>

            {/* Profile Image */}
            <img
              ref={profileImageRef}
              src={userdata?.profile || profile}
              alt="profile"
              className="cursor-pointer rounded-full w-12 h-11"
              onClick={handleProfileClick}
            />

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-full mt-2 bg-white shadow-md border rounded-md w-32 p-2 z-10"
              >
                <Link
                  to="/profile"
                  className="block px-2 py-1 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>

                {userdata?.username ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block px-2 py-1 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content (this is where the padding comes into play) */}
      <div className="pt-16">
        {/* Your page content goes here */}
      </div>
    </div>
  );
};

export default Navbar;

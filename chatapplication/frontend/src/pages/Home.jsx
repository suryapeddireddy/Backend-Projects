import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import ChatContainer from "../components/ChatContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connectSocket, getSocket } from "../utils/socket";

const ChatHome = ({ userdata, setuserdata }) => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [onlineusers, setonlineusers] = useState([]);

  useEffect(() => {
    if (!userdata.username || !userdata.email) {
      navigate("/login");
      return;
    }

    // 1. Connect socket
  

    const socket = getSocket();

    // 2. Listen for online users
    socket.on("online-users", (userList) => {
      setonlineusers(userList);
    });

    // 3. Fetch all users
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/messages/", {
          withCredentials: true,
        });

        if (res.status === 200 && res.data.filteredUsers) {
          setUsers(res.data.filteredUsers);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        navigate("/");
      }
    };

    fetchUsers();

    return () => {
      socket.off("online-users");
    };
  }, [userdata, navigate]);

  // 4. Enhance each user with online status
  const enhancedUsers = users.map((user) => ({
    ...user,
    online: onlineusers.includes(user._id),
  }));

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left - User List */}
      <div className="w-full sm:w-1/3 bg-gray-100 overflow-y-auto">
        <h2 className="text-lg font-semibold p-4">Users</h2>
        <ul>
          {enhancedUsers.map((user) => (
            <li
              key={user._id}
              className="flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer gap-3"
              onClick={() => setSelectedUser(user)}
            >
              {user.profile ? (
                <img
                  src={user.profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}
              <div className="flex flex-col">
                <span className="font-medium">{user.username}</span>
                <span
                  className={`text-sm ${
                    user.online ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {user.online ? "Online" : "Offline"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right - Chat Container */}
      <div
        className={`w-full sm:w-2/3 ${
          selectedUser ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        {!selectedUser ? (
          <div className="flex justify-center items-center h-full">
            <h2 className="text-gray-400 text-lg">
              Select a user to start chatting
            </h2>
          </div>
        ) : (
          <ChatContainer
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>
    </div>
  );
};

export default ChatHome;

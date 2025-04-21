import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // 👈 avatar icon
import ChatContainer from '../components/ChatContainer'

const ChatHome = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const users = [
    { id: 1, name: "Alice", profile: "", online: true },
    { id: 2, name: "Bob", profile: "", online: false },
    { id: 3, name: "Charlie", profile: "", online: true },
    { id: 4, name: "David", profile: "", online: false },
    { id: 5, name: "Eve", profile: "", online: true },
    { id: 6, name: "Frank", profile: "", online: false },
    { id: 7, name: "Grace", profile: "", online: true },
    { id: 8, name: "Heidi", profile: "", online: false },
    { id: 9, name: "Ivan", profile: "", online: true },
    { id: 10, name: "Judy", profile: "", online: false },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Side - User List */}
      <div className="w-full sm:w-1/3 bg-gray-100 overflow-y-auto">
        <h2 className="text-lg font-semibold p-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer gap-3"
              onClick={() => setSelectedUser(user)}
            >
              {/* Profile Icon or Image */}
              {user.profile ? (
                <img
                  src={user.profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}

              {/* Name and Status */}
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
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

      {/* Right Side - Chat Window */}
      <div
        className={`w-full sm:w-2/3 ${
          selectedUser ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        {/* When no user is selected */}
        {!selectedUser ? (
          <div className="flex justify-center items-center h-full">
            <h2 className="text-gray-400 text-lg">
              Select a user to start chatting
            </h2>
          </div>
        ) : (
          <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        )}
      </div>
    </div>
  );
};

export default ChatHome;

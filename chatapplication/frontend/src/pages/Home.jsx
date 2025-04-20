import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // 👈 avatar icon

const ChatHome = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const users = [
    { id: 1, name: "Alice", profile: "", online: true },
    { id: 2, name: "Bob", profile: "", online: false },
    { id: 3, name: "Charlie", profile: "", online: true },
    { id: 4, name: "David", profile: "", online: false },
  ];

  return (
    <div className="flex h-screen">
      {/* Left Side - User List */}
      <div className="w-full sm:w-1/3 bg-gray-100 overflow-y-auto border-r">
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
                <span className={`text-sm ${user.online ? "text-green-500" : "text-gray-500"}`}>
                  {user.online ? "Online" : "Offline"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side - Chat Window (hidden on mobile) */}
      <div className="max-sm:hidden sm:flex w-2/3 items-center justify-center">
        {selectedUser ? (
          <h2 className="text-xl">Chatting with {selectedUser.name}</h2>
        ) : (
          <h2 className="text-gray-400 text-lg">Select a user to start chatting</h2>
        )}
      </div>
    </div>
  );
};

export default ChatHome;

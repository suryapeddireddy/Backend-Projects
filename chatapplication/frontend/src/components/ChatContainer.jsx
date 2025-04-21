import React, { useState } from "react";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const [newMessage, setNewMessage] = useState("");

  const messages = [
    {
      id: "1",
      sender: "you",
      message: "Hey there!",
      createdAt: "10:00 AM",
    },
    {
      id: "2",
      sender: selectedUser.name,
      message: "Hi! How are you?",
      createdAt: "10:01 AM",
    },
    {
      id: "3",
      sender: "you",
      message: "I’m good, thanks!",
      createdAt: "10:02 AM",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 bg-gray-200 flex items-center justify-between">
        <button onClick={() => setSelectedUser(null)} className="text-blue-500">
          ← Back
        </button>
        <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
        <span className={`text-sm ${selectedUser.online ? "text-green-500" : "text-gray-400"}`}>
          {selectedUser.online ? "Online" : "Offline"}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.sender === "you";
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  isMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 text-black rounded-bl-none"
                }`}
              >
                {msg.message}
                <div className="text-xs opacity-70 text-right mt-1">{msg.createdAt}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          onClick={() => {
            if (!newMessage.trim()) return;
            alert(`Sent: ${newMessage}`);
            setNewMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;

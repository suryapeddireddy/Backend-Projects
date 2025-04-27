import React, { useState, useEffect } from "react";
import profile from "../assets/profile.png";
import { MdEdit, MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = ({ userdata, setuserdata }) => {
  const [showmodal, setshowmodal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  // Redirect to login if no userdata or if userdata is incomplete
  useEffect(() => {
    if (!userdata.username || !userdata.email) {
      navigate("/login");
    }
  }, [userdata, navigate]);

  const handleEditClick = () => {
    setshowmodal(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("profile", selectedFile);

      const res = await axios.post(
        "http://localhost:3000/api/v1/users/upload",
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // if you're using cookies
        }
      );

      if (res.status === 200) {
        alert("Uploaded avatar successfully");

        // Update userdata state with the new profile image URL
        setuserdata({
          ...userdata,
          profile: res.data.profile,
        });
      } else {
        alert("Unexpected error");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) alert("Cloudinary error");
        else if (status === 500) alert("Internal server error");
        else alert("Upload failed");
      } else {
        alert("Something went wrong");
      }
      console.log(error);
    } finally {
      setshowmodal(false); // Close modal after upload
      setSelectedFile(null); // Clear file input
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Profile</h2>
        <h3 className="text-sm text-gray-500 mb-6">Your Profile Information</h3>

        <div className="relative">
          <img
            src={userdata?.profile || profile}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover mx-auto"
          />

          <button
            onClick={handleEditClick}
            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white"
          >
            <MdEdit />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-2">
          <FaUser className="text-lg text-gray-600" />
          <div className="font-medium text-gray-700">Username</div>
        </div>
        <div className="border border-gray-300 px-4 py-2 rounded-md bg-gray-50">
          {userdata.username}
        </div>

        <div className="flex items-center gap-2">
          <MdEmail className="text-lg text-gray-600" />
          <div className="font-medium text-gray-700">Email</div>
        </div>
        <div className="border border-gray-300 px-4 py-2 rounded-md bg-gray-50">
          {userdata.email}
        </div>
      </div>

      {showmodal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96 space-y-6 shadow-md">
            <h3 className="text-lg font-semibold text-center">Upload Profile Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                onClick={() => setshowmodal(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

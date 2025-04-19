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
    <div className="border border-gray-700 p-3 max-w-md m-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold">Profile</h2>
        <h3 className="text-sm mb-4 text-gray-500">Your Profile Information</h3>

        <div className="relative">
          <img
            src={userdata?.profile || profile}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
          />

          <button
            onClick={handleEditClick}
            className="absolute bottom-0 right-0 bg-gray-500 p-2 rounded-full text-white profile-edit-btn"
          >
            <MdEdit />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div>
          <div className="flex items-center gap-1 font-semibold">
            <FaUser /> Username
          </div>
          <div className="border border-gray-700 px-2 py-1">
            {userdata.username}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 font-semibold">
            <MdEmail /> Email
          </div>
          <div className="border border-gray-700 px-2 py-1">
            {userdata.email}
          </div>
        </div>
      </div>

      {showmodal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 space-y-4 shadow-md">
            <h3 className="text-lg font-semibold">Upload Profile Image</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 rounded bg-gray-300"
                onClick={() => setshowmodal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 rounded bg-blue-600 text-white"
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

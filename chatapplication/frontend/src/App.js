import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Contact from './pages/contact';
import Home from "./pages/Home";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./components/Loading"; // Import Loading component

export default function App() {
  const [userdata, setuserdata] = useState({ username: "", email: "", profile: "" });
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track the location

  useEffect(() => {
    // Delay the loading spinner for at least 2 seconds when route changes
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false); // Hide the loading spinner after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout on cleanup
  }, [location]); // Re-run on location change (when navigating to a different route)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/users/isauth", {
          withCredentials: true,
        });

        if (res.status === 200 && res.data.user) {
          setuserdata({
            username: res.data.user.username,
            email: res.data.user.email,
            profile: res.data.user.profile,
          });
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loading />; // Show loading spinner while loading
  }

  return (
    <>
      <Navbar userdata={userdata} setuserdata={setuserdata} />
      <Routes>
        <Route path="/signup" element={<Signup userdata={userdata} />} />
        <Route path="/profile" element={<Profile userdata={userdata} setuserdata={setuserdata} />} />
        <Route path="/login" element={<Login userdata={userdata} setuserdata={setuserdata} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home userdata={userdata} setuserdata={setuserdata} />} />
      </Routes>
    </>
  );
}

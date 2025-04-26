import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom"; // Correct imports for Routes and Route
import Signup from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Contact from './pages/contact'
import Home from "./pages/Home";
import axios from 'axios'
import { useState ,useEffect} from "react"; // Removed useEffect because it's not needed here
import { useNavigate } from "react-router-dom";

export default function App() {
  const [userdata, setuserdata] = useState({ username: "", email: "", profile: "" });
  const navigate=useNavigate();
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
  }, []); // 🔥 Remove `userdata` from deps
  
  
  return (
    <>
      <Navbar userdata={userdata} setuserdata={setuserdata} />
      <Routes>
        <Route path="/signup" element={<Signup userdata={userdata} />} />
        <Route
          path="/profile"
          element={<Profile userdata={userdata} setuserdata={setuserdata}/>}
        />
        <Route
          path="/login"
          element={<Login userdata={userdata} setuserdata={setuserdata} />}
        />
        <Route
          path="/Contact"
          element={<Contact/>}
        />
        <Route
          path="/Home"
          element={<Home userdata={userdata} setuserdata={setuserdata}/>}
        />
      </Routes>
    </>
  );
}

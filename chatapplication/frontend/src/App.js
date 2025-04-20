import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom"; // Correct imports for Routes and Route
import Signup from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Contact from './pages/contact'
import Home from "./pages/Home";
import { useState } from "react"; // Removed useEffect because it's not needed here

export default function App() {
  const [userdata, setuserdata] = useState({ username: "", email: "", profile: "" });

  return (
    <>
      <Navbar userdata={userdata} setuserdata={setuserdata} />
      <Routes>
        <Route path="/signup" element={<Signup setuserdata={setuserdata} />} />
        <Route
          path="/profile"
          element={<Profile userdata={userdata} setuserdata={setuserdata}/>}
        />
        <Route
          path="/login"
          element={<Login setuserdata={setuserdata} />}
        />
        <Route
          path="/Contact"
          element={<Contact/>}
        />
        <Route
          path="/Home"
          element={<Home/>}
        />
      </Routes>
    </>
  );
}

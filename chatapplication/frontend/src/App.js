import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom'; // Correct imports for Routes and Route
import Signup from './pages/signup'
import Login from './pages/login'
import { useState } from "react";
export default function App() {
const [userlogged, setuserlogged] = useState(false);
  return (
    <>
    <Navbar userlogged={userlogged} setuserlogged={setuserlogged}></Navbar>
    <Routes>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/login" element={<Login userlogged={userlogged} setuserlogged={setuserlogged}/>}></Route>
    </Routes>
    </>
  )
}
import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom'; // Correct imports for Routes and Route
import Signup from './pages/signup'
import Login from './pages/login'
export default function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </>
  )
}
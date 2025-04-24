import Loadingscreen from "./components/Loadingscreen";
import Navbar from "./components/Navbar";
import { useState ,useEffect} from "react";
import { Routes, Route ,useLocation} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import RevealonScroll from "./components/revealonscroll";
export default function App() {
  const [isloaded, setisloaded] = useState(false);
  const location=useLocation();
  useEffect(() => {
  const handlestart=()=>setisloaded(false);
  const handleend=()=>setisloaded(true);
  handlestart();
  const timer=setTimeout(handleend, 2000);
  return ()=>clearTimeout(timer);
  }, [location])
  if(!isloaded){
  return <Loadingscreen isloaded={isloaded} setisloaded={setisloaded} />;
  }
  return (
    <>
      <Navbar />
      <RevealonScroll>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </RevealonScroll>
    </>
  );
}

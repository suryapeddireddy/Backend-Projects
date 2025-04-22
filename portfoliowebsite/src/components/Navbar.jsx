import React from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [dropdown, setdropdown] = useState(false);
  const linkStyles =
  "transition-all duration-300 ease-in-out hover:text-blue-800 hover:scale-105 font-medium";
  return (
    <>
      <div className="fixed top-0 w-full z-4 h-20 flex justify-between items-center p-4">
        <div className="flex max-w-1/3">
          <Link className="font-bold text-xl" to="/">
            Surya<span className="text-blue-400">Tech</span>.co
          </Link>
        </div>
        <MdMenu className="md:hidden text-3xl flex items-center cursor-pointer" onClick={()=>{setdropdown(!dropdown)}} />
        <div className="flex max-w-2/3 items-center  max-md:hidden font-medium gap-10">
        <Link to="/" className={linkStyles}>Home</Link>
          <Link to="/projects" className={linkStyles}>Projects</Link>
          <Link to="/about" className={linkStyles}>About</Link>
          <Link to="/contact" className={linkStyles}>Contact</Link>
        </div>
      </div>
      {dropdown && (
        <div className="md:hidden absolute top-20 w-full shadow-md flex flex-col items-center py-4 z-40 justify-between font-semibold gap-1">
        <Link
            to="/"
            onClick={() => setdropdown(false)}
            className={linkStyles}
          >
            Home
          </Link>
          <Link
            to="/projects"
            onClick={() => setdropdown(false)}
            className={linkStyles}
          >
            Projects
          </Link>
          <Link
            to="/about"
            onClick={() => setdropdown(false)}
            className={linkStyles}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setdropdown(false)}
            className={linkStyles}
          >
            Contact
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;

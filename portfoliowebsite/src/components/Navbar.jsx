import React, { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const linkStyles =
    "transition-all duration-300 ease-in-out hover:text-blue-800 hover:scale-105 font-medium";

  useEffect(() => {
    // Disable scrolling when dropdown is open
    if (dropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset body overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dropdown]);

  return (
    <>
      <div className="fixed top-0 w-full z-20 h-20 flex justify-between items-center p-4">
        <div className="flex max-w-1/3">
          <Link className="font-bold text-xl" to="/">
            Surya<span className="text-blue-400">Tech</span>.co
          </Link>
        </div>
        <MdMenu
          className="md:hidden text-3xl flex items-center cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setDropdown(true);
          }}
        />
        <div className="flex max-w-2/3 items-center max-md:hidden font-medium gap-10">
          <Link to="/" className={linkStyles}>
            Home
          </Link>
          <Link to="/projects" className={linkStyles}>
            Projects
          </Link>
          <Link to="/about" className={linkStyles}>
            About
          </Link>
          <Link to="/contact" className={linkStyles}>
            Contact
          </Link>
        </div>
      </div>

      {dropdown && (
        <div className="md:hidden absolute w-full h-screen shadow-md z-50 top-0 left-0 gap-2 overflow-hidden">
          <div className="w-full flex justify-end p-4">
            <MdOutlineCancel
              className="text-4xl cursor-pointer mx-2"
              onClick={() => setDropdown(false)}
            />
          </div>

          <div className="flex flex-col text-2xl font-semibold items-center gap-10 mt-10">
            <Link
              to="/"
              onClick={() => setDropdown(false)}
              className={linkStyles}
            >
              Home
            </Link>
            <Link
              to="/projects"
              onClick={() => setDropdown(false)}
              className={linkStyles}
            >
              Projects
            </Link>
            <Link
              to="/about"
              onClick={() => setDropdown(false)}
              className={linkStyles}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setDropdown(false)}
              className={linkStyles}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

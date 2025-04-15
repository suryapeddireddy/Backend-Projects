import React from "react";

const Navbar = ({ isUserLogged, setIsUserLogged }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Logo */}
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-2xl font-bold text-purple-600">
          💬 <span className="tracking-wide font-mono">ChatApp</span>
        </a>
      </div>

      {/* Right-side */}
      <div className="flex items-center gap-4">
        {isUserLogged && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-outline"
              title="Your Profile"
            >
              {/* Placeholder for uploaded avatar */}
              <span className="font-bold text-lg">U</span>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44"
            >
              <li>
                <a href="/profile" className="justify-between">
                  Profile
                  <span className="badge badge-info">New</span>
                </a>
              </li>
              <li>
                <a
                  href="/logout"
                  onClick={() => setIsUserLogged(false)} // optional logout logic
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

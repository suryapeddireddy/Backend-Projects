import React, { useEffect } from "react";

const Loadingscreen = ({ isloaded, setisloaded }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setisloaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isloaded) return null;

  return (
    <div className="flex items-center justify-center h-screen w-full fixed top-0 left-0 bg-black z-50 overflow-hidden">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

        {/* Loading Text with animation */}
        <p className="text-white text-lg animate-pulse tracking-widest">Loading...</p>
      </div>
    </div>
  );
};

export default Loadingscreen;

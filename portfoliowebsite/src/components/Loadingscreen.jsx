import React, { useEffect } from "react";

const Loadingscreen = ({ isloaded, setisloaded }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setisloaded(true); // mark as loaded after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, []); // Empty dependency array to run the effect only once

  if (isloaded) {
    return <></>;
  }

  return (
    <div className="flex items-center h-screen w-full justify-center fixed top-0 left-0 z-50 overflow-hidden">
      <span className="loading loading-bars loading-xl"></span>
    </div>
  );
};

export default Loadingscreen;

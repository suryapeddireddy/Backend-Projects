import React from "react";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-20 flex flex-col items-center w-full gap-5">
      <div className="text-center px-4 mt-20 flex flex-col gap-5">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text shadow-lg">
          Hi, I'm Surya Tech
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4">
          I’m an aspiring software developer with a strong foundation in web and
          backend technologies. I have hands-on experience with Node.js and
          full-stack development, and I’m passionate about building scalable
          applications.
        </p>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4">
          Always eager to learn new technologies, I’m actively seeking
          opportunities in Web Development, Software Development, and Backend
          Engineering.
        </p>
      </div>

      <div className="flex gap-6 mt-8">
        <Button
          text="View Projects"
          backgroundColor="bg-blue-900"
          textColor="text-white"
          size="md"
          onClick={() => navigate("/projects")}
        />
        <Button
          text="View Skills"
          backgroundColor="bg-green-500"
          textColor="text-white"
          size="md"
          onClick={() => navigate("/about")}
        />
      </div>
    </div>
  );
};

export default Home;

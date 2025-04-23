import React from "react";

const About = () => {
  const frontendSkills = ["React", "JavaScript", "TailwindCSS"];
  const backendSkills = [
    "Node.js",
    "Microservices",
    "Redis",
    "Express",
    "MongoDB",
    "Mongoose",
    "REST API",
  ];

  return (
    <div className="flex flex-col mt-20 gap-10 items-center px-5 text-white">
      {/* Heading */}
      <div className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        About Me
      </div>

      {/* Description */}
      <div className="max-w-3xl text-center text-purple-300 text-lg leading-relaxed">
        I'm a passionate software developer who enjoys building sleek, scalable web apps. 
        With a solid foundation in full-stack development, I love crafting user experiences 
        that feel fast and intuitive. Always up for learning something new or tackling 
        exciting projects.
      </div>

    </div>
  );
};

export default About;

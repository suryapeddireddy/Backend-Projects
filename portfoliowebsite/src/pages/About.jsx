import React from "react";
import { IoMdSchool } from "react-icons/io";
import { FaBriefcase } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";
const About = () => {
  const frontendSkills = ["React", "JavaScript", "TailwindCSS", "Vite", "Vue"];
  const backendSkills = [
    "Node.js",
    "Microservices",
    "Redis",
    "Express",
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
      <div className="max-w-3xl text-center text-white text-lg leading-relaxed">
        I'm a passionate software developer who enjoys building sleek, scalable
        web apps. With a solid foundation in full-stack development, I love
        crafting user experiences that feel fast and intuitive. Always up for
        learning something new or tackling exciting projects.
      </div>

      {/* Skills */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl justify-center">
        {/* Frontend */}
        <div className="w-full md:w-1/2 hover:animate-pulse">
          <p className="text-2xl font-semibold text-center mb-4">Frontend</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            {frontendSkills.map((ele, index) => (
              <div
                key={index}
                className="text-center bg-blue-900 px-4 py-2  shadow-md text-gray-500"
              >
                {ele}
              </div>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="w-full md:w-1/2 hover:animate-pulse">
          <p className="text-2xl font-semibold text-center mb-4">Backend</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            {backendSkills.map((ele, index) => (
              <div
                key={index}
                className="text-center bg-blue-900 shadow-md text-gray-500 p-2"
              >
                {ele}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Education + Experience */}
      {/* Education + Experience */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl">
        {/* Education */}
        <div className="w-full md:w-1/2 p-4 rounded-md shadow-md hover:animate-vibrate">
          <div className="text-3xl flex items-center gap-2 text-blue-400 mb-2">
            <IoMdSchool className="text-4xl" />
            <p>Education</p>
          </div>
          <p className="text-white font-medium mb-1">
            B.Tech in Mining Engineering, IIT Kharagpur (2020–2024)
          </p>
          <p className="text-gray-400 text-sm">
            Relevant Coursework: Data Structures & Algorithms, Web Development,
            Computer Networks, DBMS
          </p>
        </div>

        {/* Experience */}
        <div className="w-full md:w-1/2 p-4 rounded-md shadow-md hover:animate-vibrate">
          <div className="text-3xl flex items-center gap-2 text-blue-400 mb-2">
            <FaBriefcase className="text-3xl" />
            <p>Experience</p>
          </div>
          <p className="text-white font-medium mb-1">
            Project Intern at Unified Mentor Pvt. Ltd. (Gurgaon, Haryana)
          </p>
          <p className="text-gray-400 text-sm">
            Contributed to a job portal platform by implementing key frontend
            features using React.js and TailwindCSS. Built job listing, search,
            and filtering components for enhanced UX. Integrated REST APIs for
            dynamic data handling. Gained hands-on experience in version control
            with Git, responsive UI design, and agile development practices.
          </p>
        </div>
      </div>
      <div className="w-full p-4 rounded-md shadow-md hover:animate-vibrate">
        <div className="text-3xl flex items-center gap-2 text-blue-400 mb-4">
          <FaRocket className="text-3xl" />
          <p>Extra Skills</p>
        </div>

        <p className="text-white font-medium mb-2">Competitive Programming</p>
        <p className="text-gray-400 text-sm mb-4">
          Actively engaged in competitive programming to improve problem-solving
          skills. Focused on algorithmic challenges and optimizations.
        </p>

        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
          <li>
            <strong>LeetCode Knight:</strong> Regularly solving problems for the
            past 2 years.
            <a
              href="https://leetcode.com/u/surya11145/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline hover:text-yellow-500"
            >
              My LeetCode Profile
            </a>
          </li>
          <li>
            <strong>Codeforces Pupil:</strong> Engaged in solving competitive
            problems and actively improving ranking.
            <a
              href="https://codeforces.com/profile/__11145"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-500"
            >
              My Codeforces Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;

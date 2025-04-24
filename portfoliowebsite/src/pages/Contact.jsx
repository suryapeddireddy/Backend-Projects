import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  
  console.log("SERVICE_ID:", SERVICE_ID); // just for testing
  


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      PUBLIC_KEY
    );

    alert("Message Sent successfully");
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    console.error("EmailJS Error:", error);
    alert("Something went wrong, please try again");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center mt-20 px-4">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent mb-8">
          Get in Touch
        </h2>
        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
              placeholder="Your Name"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="relative">
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
              placeholder="Your Message"
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

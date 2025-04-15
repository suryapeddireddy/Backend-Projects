import React from 'react';

const LogInPage = ({ email, setemail, password, setpassword, handleLogin }) => {

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form behavior
    handleLogin(); // call login logic from App.js
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm gap-2">

        {/* Email */}
        <label className="input validator w-full flex items-center gap-2">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </g>
          </svg>
          <input
            type="email"
            placeholder="mail@site.com"
            required
            className="w-full"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </label>

        {/* Password */}
        <label className="input validator w-full flex items-center gap-2">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="Password"
            minLength="8"
            className="w-full"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </label>

        {/* Login Button */}
        <button type="submit" className="btn btn-wide btn-primary mt-2">
          LogIn
        </button>

        {/* Signup Redirect */}
        <p className="text-sm text-gray-600 text-center mt-2">
          Not Registered?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default LogInPage;

import React from "react";

const SignUpPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Sign Up Submitted:", { username, email, password });

    // You can add further logic here (e.g., send to backend or redirect)
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-sm gap-2"
      >
        {/* Username */}
        <label className="input validator w-full flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </g>
          </svg>
          <input
            name="username"
            type="text"
            required
            placeholder="Username"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
            className="w-full"
          />
        </label>
        <p className="validator-hint text-xs text-gray-500 -mt-1">
          Must be 3 to 30 characters
          <br />
          containing only letters, numbers or dash
        </p>

        {/* Email */}
        <label className="input validator w-full flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </g>
          </svg>
          <input
            name="email"
            type="email"
            placeholder="mail@site.com"
            required
            className="w-full"
          />
        </label>
        <div className="validator-hint hidden text-xs text-red-500 -mt-1">
          Enter valid email address
        </div>

        {/* Password */}
        <label className="input validator w-full flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </g>
          </svg>
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            className="w-full"
          />
        </label>
        <p className="validator-hint hidden text-xs text-gray-500 -mt-1">
          Must be more than 8 characters, including:
          <br />• At least one number
          <br />• One lowercase letter
          <br />• One uppercase letter
        </p>

        {/* Register Button */}
        <button type="submit" className="btn btn-wide btn-primary mt-2">
          Register
        </button>

        {/* Login link */}
        <p className="text-sm text-gray-600 text-center mt-2">
          Already Registered?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;

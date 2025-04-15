import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import ProfilePage from "./pages/ProfilePage";
import { login, signup ,logout} from "./api/auth"; // ✅ Correct relative path
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isuserlogged, setisuserlogged] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // Handle Login
  const handleLogin = async () => {
    const res = await login({ email, password,username});
    if (res.status===500 || res.error) {
      console.log("Login error:", res.data.error);
    } else {
      console.log("Login success:", res);
      setisuserlogged(true); 
    }
  };

  // Handle Signup
  const handleSignup = async () => {
    const res = await signup({ username, email, password });
    if (res.status===500 || res.error) {
      console.log("Signup error:", res.data.error);
    } else {
      console.log("Signup success:", res);
      setisuserlogged(true); // ✅ update login status
    }
  };
  // Handle Logout
  const handleLogout=async()=>{
  const res=await logout();
  if(res.error || res.status===500){
  console.log("Logout error:" ,res.data.error);
  }
  else{
  console.log("Logout success");
  setisuserlogged(false);
  }
  }
  return (
    <>
      <Navbar isuserlogged={isuserlogged} setisuserlogged={setisuserlogged} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={
            <SignUpPage
              username={username}
              setusername={setusername}
              email={email}
              setemail={setemail}
              password={password}
              setpassword={setpassword}
              handleSignup={handleSignup}
            />
          }
        />

        <Route
          path="/login"
          element={
            <LogInPage
              email={email}
              setemail={setemail}
              password={password}
              setpassword={setpassword}
              handleLogin={handleLogin}
            />
          }
        />

        <Route
          path="/profile"
          element={
            isuserlogged ? (
              <ProfilePage username={username} email={email} />
            ) : (
              <LogInPage
                email={email}
                setemail={setemail}
                password={password}
                setpassword={setpassword}
                handleLogin={handleLogin}
              />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;

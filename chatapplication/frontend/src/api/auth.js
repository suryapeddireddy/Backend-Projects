const API_URL = "http://localhost:3000/api/v1/users"; // ✅ Use http if it's local

// LOGIN
const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return  response;
  } catch (error) {
    return { error: error.message };
  }
};

// SIGNUP
const signup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
   return response;
  } catch (error) {
    return { error: error.message };
  }
};

const logout=async()=>{
try {
const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return  response; 
} catch (error) {
return {error:error.message};
}
}
export { login, logout, signup };

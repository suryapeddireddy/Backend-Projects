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
      credentials:true
    });
    return  response;
  } catch (error) {
    return { error: error.message };
  }
};

// SIGNUP
const signup = async ({ username, email, password }) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  // If you have a profile image:
  // formData.append("profile", file); // where `file` is a File object

  const response = await fetch("http://localhost:3000/api/v1/users/register", {
    method: "POST",
    body: formData,
    credentials: 'include', // include if you're using cookies
  });

  return response;
};



const logout=async()=>{
try {
const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
   headers: { "Content-Type": "multipart/form-data" }
  });
  return  response; 
} catch (error) {
return {error:error.message};
}
}
export { login, logout, signup };

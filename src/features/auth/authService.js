import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL + "/api/user" : "/api/users";

const login = async (userData) => {
  console.log(userData); // Check if user data is correctly received


  const response = await axios.post(`${API_URL}/signin`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

console.log(response.data)


};








//  Logout

const logout = () => localStorage.removeItem("user");
const authService = {
  login,
  logout,
};

export default authService;

import axios from "axios";

// Use the environment variable as the base URL, or fallback to "/api"
const API_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL + "/api" : "/api";

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.get(`${API_URL}/users/getUsers`, config);

  return response.data;
};

const usersService = {
  getUsers,
};

export default usersService;

import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //it there is token add this token to every single request we will make to the server
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    //Delete auth header if there is no token
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;

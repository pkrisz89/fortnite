import axios from "axios";

const registerUser = payload => {
  const uri = "http://localhost:3001/register";
  return axios.post(uri, payload).then(res => {
    return res.data;
  });
};

export default registerUser;

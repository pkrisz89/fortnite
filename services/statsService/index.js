import axios from "axios";
import AuthenticationService from "../authenticationService";

const getStatsForUser = userId => {
  const token = AuthenticationService.getToken().token;

  const url = `http://localhost:3001/stats/${userId}`;

  return axios({
    method: "get",
    url,
    headers: { Authorization: token }
  }).then(res => {
    return res.data;
  });
};

export default getStatsForUser;

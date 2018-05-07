import axios from "axios";
import axiosCookieJarSupport from "@3846masa/axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import AuthenticationService from "../authenticationService";

axiosCookieJarSupport(axios);
const cookieJar = new CookieJar();

const getStatsForUser = userId => {
  const url = `http://localhost:3001/stats/${userId}`;

  return axios.get(url, { jar: cookieJar, withCredentials: true }).then(res => {
    return res.data;
  });
};

const getStatsForSelf = () => {
  const url = `http://localhost:3001/mystats`;
  return axios
    .get(url, { jar: cookieJar, withCredentials: true })
    .then(res => res.data);
};

export { getStatsForUser, getStatsForSelf };

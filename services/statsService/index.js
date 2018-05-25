import axios from "axios";
import axiosCookieJarSupport from "@3846masa/axios-cookiejar-support";
import {CookieJar} from "tough-cookie";

axiosCookieJarSupport(axios);
const cookieJar = new CookieJar();

const getStatsForUser = userId => {
  const url = `localhost:8081/stats/${userId}`;

  return axios
    .get(url, {
    jar: cookieJar,
    withCredentials: true
  })
    .then(res => {
      return res.data;
    });
};

const getStatsForSelf = () => {
  const url = `localhost:8081/mystats`;
  return axios
    .get(url, {
    jar: cookieJar,
    withCredentials: true
  })
    .then(res => res.data);
};

export {getStatsForUser, getStatsForSelf};

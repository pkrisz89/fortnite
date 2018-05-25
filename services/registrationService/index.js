import axios from "axios";
import axiosCookieJarSupport from "@3846masa/axios-cookiejar-support";
import {CookieJar} from "tough-cookie";

axiosCookieJarSupport(axios);
const cookieJar = new CookieJar();

const registerUser = payload => {
  document.cookie = 'user_sid=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  const uri = "localhost:8081/register";
  return axios
    .post(uri, payload, {
    jar: cookieJar,
    withCredentials: true
  })
    .then(res => {
      return res.data;
    });
};

export default registerUser;

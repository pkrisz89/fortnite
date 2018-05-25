import axios from "axios";
import axiosCookieJarSupport from "@3846masa/axios-cookiejar-support";
import {CookieJar} from "tough-cookie";

axiosCookieJarSupport(axios);
const cookieJar = new CookieJar();

class AuthenticationService {
  authenticate(payload) {
    const uri = "localhost:8081/login";
    return axios.post(uri, payload, {
      jar: cookieJar,
      withCredentials: true
    })
  }

  isAuthenticated() {
    return Boolean(document.cookie.indexOf('user_sid') >= 0);
  }

  logout() {
    document.cookie = 'user_sid=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    const uri = "localhost:8081/logout";
    return axios.post(uri, {
      jar: cookieJar,
      withCredentials: true
    })
  }

}

export default new AuthenticationService();

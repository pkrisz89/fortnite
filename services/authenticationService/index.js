import axios from "axios";
import axiosCookieJarSupport from "@3846masa/axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

axiosCookieJarSupport(axios);
const cookieJar = new CookieJar();

class AuthenticationService {
  constructor() {
    this.authenticate = this.authenticate.bind(this);
    this.setToken = this.setToken.bind(this);
    this.getToken = this.getToken.bind(this);
    this.removeToken = this.removeToken.bind(this);
    this.isExpired = this.isExpired.bind(this);

    this.token = null;
  }

  authenticate(payload) {
    const uri = "http://localhost:3001/login";
    return axios
      .post(uri, payload, { jar: cookieJar, withCredentials: true })
      .then((res, ...rest) => {
        this.setToken({
          userId: res.data.userId
        });
      });
  }

  isAuthenticated() {
    const token = this.getToken();
    return token ? !this.isExpired(token.expiry) : false;
  }

  setToken(token) {
    // localStorage.setItem("AuthToken", JSON.stringify(token));
    this.token = token;
  }

  getToken() {
    // return JSON.parse(localStorage.getItem("AuthToken"));
    return this.token;
  }

  removeToken() {
    this.token = null;
    // localStorage.removeItem("AuthToken");
  }

  isExpired(expiry) {
    const current_time = new Date().getTime() / 1000;
    return current_time > expiry ? true : false;
  }
}

export default new AuthenticationService();

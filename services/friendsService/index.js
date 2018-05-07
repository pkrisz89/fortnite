import axios from "axios";
import axiosCookieJarSupport from "@3846masa/axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import AuthenticationService from "../authenticationService";

axiosCookieJarSupport(axios);
const cookieJar = new CookieJar();

class FriendsService {
  constructor() {
    this.baseUrl = "http://localhost:3001/";
    this.getFriends = this.getFriends.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
  }

  addFriend(data) {
    const url = `${this.baseUrl}friends`;

    return axios.post(url, data, { jar: cookieJar, withCredentials: true });
  }

  deleteFriend(id) {
    const url = `${this.baseUrl}friend/${id}`;
    return axios.delete(url, { jar: cookieJar, withCredentials: true });
  }

  getFriends() {
    const url = `${this.baseUrl}friends`;
    return axios
      .get(url, { jar: cookieJar, withCredentials: true })
      .then(res => {
        return res.data;
      });
  }
}

export default new FriendsService();

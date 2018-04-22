import axios from "axios";
import AuthenticationService from "../authenticationService";

class FriendsService {
  constructor() {
    this.token = AuthenticationService.getToken().token;
    this.baseUrl = "http://localhost:3001/";
    this.getFriends = this.getFriends.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
  }

  addFriend(data) {
    const url = `${this.baseUrl}friends`;

    return axios({
      method: "post",
      url,
      data,
      headers: { Authorization: this.token }
    });
  }

  deleteFriend(id) {
    const url = `${this.baseUrl}friend/${id}`;
    return axios({
      method: "delete",
      url,
      headers: { Authorization: this.token }
    });
  }

  getFriends() {
    const url = `${this.baseUrl}friends`;
    return axios({
      method: "get",
      url,
      headers: { Authorization: this.token }
    }).then(res => {
      return res.data;
    });
  }
}

export default new FriendsService();

import Router from "next/router";
import Nav from "../components/nav";
import Head from "../components/head";
import AuthenticationService from "../services/authenticationService";
import FriendsService from "../services/friendsService";

class Compare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      username: "",
      platform: "pc"
    };

    this.handleChange = this.handleChange.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  componentWillMount() {
    FriendsService.getFriends()
      .then(friends => {
        this.setState({ friends });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    if (!AuthenticationService.isAuthenticated()) {
      Router.replace("/login");
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addFriend() {
    const { username, platform } = this.state;
    return FriendsService.addFriend({
      username,
      platform
    })
      .then(FriendsService.getFriends)
      .then(friends => {
        this.setState({ friends, username: "", platform: "pc" });
      });
  }

  render() {
    console.log(this.state.friends);
    const { username, platform, friends } = this.state;

    return (
      <React.Fragment>
        <Nav />
        <h1>Compare</h1>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="platform">
          Platform
          <select value={platform} name="platform" onChange={this.handleChange}>
            <option value="pc">PC</option>
            <option value="psn">Play Station</option>
            <option value="xbl">Xbox</option>
          </select>
        </label>
        <button onClick={this.addFriend}>Add Friend</button>
      </React.Fragment>
    );
  }
}

export default Compare;

import Router from "next/router";
import Nav from "../components/nav";
import Head from "../components/head";
import AuthenticationService from "../services/authenticationService";
import FriendsService from "../services/friendsService";

const FriendsList = ({ friends, removeFriend }) => {
  if (!friends.length) return null;
  return friends.map(friend => {
    return (
      <div>
        <a>
          {friend.username}
          <button
            onClick={() => {
              removeFriend(friend.id);
            }}
          >
            Remove
          </button>
        </a>
      </div>
    );
  });
};

class Compare extends React.Component {
  static async getInitialProps() {
    return FriendsService.getFriends()
      .then(friends => {
        return friends;
      })
      .catch(err => {
        console.log(err);
      });
  }
  constructor(props) {
    super(props);

    this.state = {
      friends: props.friends,
      username: "",
      platform: "pc"
    };

    this.handleChange = this.handleChange.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
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

  removeFriend(id) {
    return FriendsService.deleteFriend(id)
      .then(FriendsService.getFriends)
      .then(res => {
        this.setState({ friends: res.friends, username: "", platform: "pc" });
      });
  }

  addFriend() {
    const { username, platform } = this.state;
    return FriendsService.addFriend({
      username,
      platform
    })
      .then(FriendsService.getFriends)
      .then(res => {
        this.setState({ friends: res.friends, username: "", platform: "pc" });
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
        <h2>Friends</h2>
        <FriendsList friends={friends} removeFriend={this.removeFriend} />
      </React.Fragment>
    );
  }
}

export default Compare;

import Router from "next/router";
import styled from "styled-components";
import Nav from "../components/nav";
import Head from "../components/head";
import AuthenticationService from "../services/authenticationService";
import {getStatsForSelf, getStatsForUser} from "../services/statsService";
import FriendsService from "../services/friendsService";

const Wrapper = styled.div `
  cursor: pointer;
`;

const FriendsList = ({friends, removeFriend, selectFriend}) => {
  if (!friends.length) 
    return null;
  return friends.map(friend => {
    return (
      <Wrapper key={friend.id}>
        <a>
          {friend.username}
          <button onClick={() => {
            selectFriend(friend.id);
          }}>
            Compare
          </button>
          <button onClick={() => {
            removeFriend(friend.id);
          }}>
            Remove
          </button>
        </a>
      </Wrapper>
    );
  });
};

class Compare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      stats: {},
      friendStats: {},
      chosenFriend: undefined,
      username: "",
      platform: "pc"
    };

    this.handleChange = this
      .handleChange
      .bind(this);
    this.addFriend = this
      .addFriend
      .bind(this);
    this.removeFriend = this
      .removeFriend
      .bind(this);
    this.getStats = this
      .getStats
      .bind(this);
    this.selectFriend = this
      .selectFriend
      .bind(this);
  }

  componentWillMount() {
    return Promise.all([
      getStatsForSelf(), FriendsService.getFriends()
    ]).then(([stats, friends]) => {
      this.setState({friends: friends.friends, stats});
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    if (!AuthenticationService.isAuthenticated()) {
      Router.replace("/login");
    }
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  removeFriend(id) {
    return FriendsService
      .deleteFriend(id)
      .then(FriendsService.getFriends)
      .then(res => {
        this.setState({friends: res.friends, username: "", platform: "pc"});
      });
  }

  addFriend() {
    const {username, platform} = this.state;
    return FriendsService
      .addFriend({username, platform})
      .then(FriendsService.getFriends)
      .then(res => {
        this.setState({friends: res.friends, username: "", platform: "pc"});
      });
  }

  getStats(model, key) {
    return (this.state[model].response.lifeTimeStats.find(stat => stat.key === key).value || "N/A");
  }

  selectFriend(id) {
    return getStatsForUser(id).then(res => {
      this.setState({friendStats: res});
    });
  }

  render() {
    const {username, platform, friends, stats, friendStats} = this.state;

    return (
      <React.Fragment>
        <Nav/>
        <div className="registration">
          <span className="registration__header">Friends</span>
          <fieldset className="registration__fieldset">
            <label className="registration__label" htmlFor="username">
              Username
            </label>
            <input
              className="registration__input"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}/>
          </fieldset>
          <fieldset className="registration__fieldset">
            <label className="registration__label" htmlFor="platform">
              Platform
            </label>
            <select
              value={platform}
              className="registration__input"
              name="platform"
              onChange={this.handleChange}>
              <option value="pc">PC</option>
              <option value="psn">Play Station</option>
              <option value="xbl">Xbox</option>
            </select>
          </fieldset>

          <button
            disabled={!this.state.username}
            className="registration__button"
            onClick={this.addFriend}>Add Friend</button>
          <hr/>
          <FriendsList
            friends={friends}
            removeFriend={this.removeFriend}
            selectFriend={this.selectFriend}/>
        </div>

        <h2>Friends</h2>
        {stats.response
          ? (
            <div>
              Lifetime Statistics for {stats.response.epicUserHandle}
              <p>Matches played {this.getStats("stats", "Matches Played")}</p>
              <p>Wins {this.getStats("stats", "Wins")}</p>
              <p>Kills {this.getStats("stats", "Kills")}</p>
              <p>Kill/Death {this.getStats("stats", "K/d")}</p>
              <p>Top3 {this.getStats("stats", "Top 3")}</p>
              <p>Score {this.getStats("stats", "Score")}</p>
            </div>
          )
          : ("loading...")}
        {friendStats.response
          ? (
            <div>
              Lifetime Statistics for {friendStats.response.epicUserHandle}
              <p>
                Matches played {this.getStats("friendStats", "Matches Played")}
              </p>
              <p>Wins {this.getStats("friendStats", "Wins")}</p>
              <p>Kills {this.getStats("friendStats", "Kills")}</p>
              <p>Kill/Death {this.getStats("friendStats", "K/d")}</p>
              <p>Top3 {this.getStats("friendStats", "Top 3")}</p>
              <p>Score {this.getStats("friendStats", "Score")}</p>
            </div>
          )
          : null}
      </React.Fragment>
    );
  }
}

export default Compare;

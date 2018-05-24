import Router from "next/router";
import Nav from "../components/nav";
import Head from "../components/head";
import AuthenticationService from "../services/authenticationService";
import {getStatsForSelf, getStatsForUser} from "../services/statsService";
import FriendsService from "../services/friendsService";
import FriendsList from '../components/friendsList'
import Loader from '../components/loader';
import Error from '../components/error';
import AddFriends from '../components/addFriends';
import StatsComparer from '../components/statsComparer';

class Compare extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      stats: {},
      friendStats: {},
      chosenFriend: undefined,
      username: "",
      platform: "pc",
      view: "friends",
      loading: true,
      error: false
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
    this.close = this
      .close
      .bind(this)
  }

  componentDidMount() {
    if (!AuthenticationService.isAuthenticated()) {
      Router.replace("/login");
    } else {
      this.setState({loading: true});
      return Promise.all([
        getStatsForSelf(), FriendsService.getFriends()
      ]).then(([stats, friends]) => {
        this.setState({friends: friends.friends, stats, loading: false});
      }).catch(err => {
        this.setState({loading: false});
      });
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
    this.setState({loading: true, error: false});
    return getStatsForUser(id).then(res => {
      if (res.response.error) {
        this.setState({error: true, loading: false})
      } else {
        this.setState({friendStats: res, loading: false, view: 'compare', error: false});
      }

    });
  }

  close() {
    this.setState({view: 'friends'})
  }

  render() {
    const {username, platform, friends, stats, friendStats} = this.state;
    const showFriendsList = this.state.view === 'friends';

    return (
      <Loader loading={this.state.loading}>
        <React.Fragment>
          <Nav/> {showFriendsList
            ? <AddFriends
                handleChange={this.handleChange}
                username={this.state.username}
                platform={this.state.platform}
                addFriend={this.addFriend}
                friends={this.state.friends}
                removeFriend={this.removeFriend}
                selectFriend={this.selectFriend}/>
            : <StatsComparer
              close={this.close}
              stats={stats}
              friendStats={friendStats}
              getStats={this.getStats}/>}
          <Error show={this.state.error}>This player has not played any game yet.</Error>
        </React.Fragment>
      </Loader>
    );
  }
}

export default Compare;

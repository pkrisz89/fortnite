import Router from "next/router";
import Nav from "../components/nav";
import Head from "../components/head";
import AuthenticationService from "../services/authenticationService";
import {getStatsForSelf, getStatsForUser} from "../services/statsService";
import FriendsService from "../services/friendsService";
import FriendsList from '../components/friendsList'
import Loader from '../components/loader';
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
      view: "friends"
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
    this.setState({loading: true});
    return Promise.all([
      getStatsForSelf(), FriendsService.getFriends()
    ]).then(([stats, friends]) => {
      this.setState({friends: friends.friends, stats, loading: false});
    }).catch(err => {
      console.log(err);
      this.setState({loading: false});
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
    this.setState({loading: true});
    return getStatsForUser(id).then(res => {
      this.setState({friendStats: res, loading: false, view: 'compare'});
    });
  }

  render() {
    const {username, platform, friends, stats, friendStats} = this.state;
    const showFriendsList = this.state.view === 'friends';
    console.log(this.state.view);

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
              stats={stats}
              friendStats={friendStats}
              getStats={this.getStats}/>}
        </React.Fragment>
      </Loader>
    );
  }
}

export default Compare;

import Nav from "../components/nav";
import Head from "../components/head";
import AuthenticationService from "../services/authenticationService";
import getStatsForUser from "../services/statsService";

class MyStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    };
  }

  componentWillMount() {
    const userId = AuthenticationService.getToken().userId;
    return getStatsForUser(userId).then(stats => this.setState({ stats }));
  }

  componentDidMount() {
    if (!AuthenticationService.isAuthenticated()) {
      this.props.url.replace("/");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Nav />
        <h1>My stats page..</h1>
      </React.Fragment>
    );
  }
}

export default MyStats;

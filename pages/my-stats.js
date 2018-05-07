import Nav from "../components/nav";
import Head from "../components/head";
// import AuthenticationService from "../services/authenticationService";
import { getStatsForSelf } from "../services/statsService";

class MyStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {}
    };
    this.getStats = this.getStats.bind(this);
  }

  componentWillMount() {
    return getStatsForSelf().then(stats => this.setState({ stats }));
  }

  getStats(key) {
    return (
      this.state.stats.response.lifeTimeStats.find(stat => stat.key === key)
        .value || "N/A"
    );
  }

  render() {
    const { stats } = this.state;

    return (
      <React.Fragment>
        <Nav />
        <h1>My stats page..</h1>
        {stats.response ? (
          <div>
            Lifetime Statistics
            <p>Matches played {this.getStats("Matches Played")}</p>
            <p>Wins {this.getStats("Wins")}</p>
            <p>Kills {this.getStats("Kills")}</p>
            <p>Kill/Death {this.getStats("K/d")}</p>
            <p>Top3 {this.getStats("Top 3")}</p>
            <p>Score {this.getStats("Score")}</p>
          </div>
        ) : (
          "loading..."
        )}
      </React.Fragment>
    );
  }
}

export default MyStats;

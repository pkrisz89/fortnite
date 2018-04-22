import Nav from "../components/nav";
import Head from "../components/head";
import AuthenticationService from "../services/authenticationService";

class Compare extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!AuthenticationService.isAuthenticated()) {
      this.props.url.replace("/login");
    }
  }
  render() {
    return (
      <React.Fragment>
        <Nav />
        <h1>Compare</h1>
      </React.Fragment>
    );
  }
}

export default Compare;

import Router from "next/router";
import Nav from "../components/nav";
import Head from "../components/head";
import Error from "../components/error";
import AuthenticationService from "../services/authenticationService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.AuthenticationService = AuthenticationService;
    this.state = {
      email: "",
      password: "",
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if (AuthenticationService.isAuthenticated()) {
      this.props.url.replace("/");
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  login() {
    this.setState({ error: false });
    const payload = {
      password: this.state.password,
      email: this.state.email
    };
    return AuthenticationService.authenticate(payload)
      .then(res => {
        Router.replace("/");
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render() {
    const { email, password, error } = this.state;

    return (
      <React.Fragment>
        <Nav />
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <button onClick={this.login} disabled={!email || !password}>
          Login
        </button>
        <Error show={error}>An error has occured</Error>
      </React.Fragment>
    );
  }
}

export default Login;

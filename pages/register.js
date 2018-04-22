import Router from "next/router";
import Nav from "../components/nav";
import Head from "../components/head";
import Error from "../components/error";
import AuthenticationService from "../services/authenticationService";
import registrationService from "../services/registrationService";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      platform: "pc",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  componentWillMount() {
    if (AuthenticationService.isAuthenticated()) {
      this.props.url.replace("/");
    }
  }

  registerUser() {
    const { username, password, email, platform } = this.state;
    this.setState({ error: false });
    const payload = { username, password, email, platform };
    return registrationService(payload)
      .then(res => {
        AuthenticationService.setToken({
          token: res.token,
          expires: res.expiry
        });
        Router.replace("/");
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { username, email, password, platform, error } = this.state;
    return (
      <React.Fragment>
        <Nav />
        <h1>Register</h1>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </label>{" "}
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </label>{" "}
        <label htmlFor="platform">
          Platform
          <select value={platform} name="platform" onChange={this.handleChange}>
            <option value="pc">PC</option>
            <option value="psn">Play Station</option>
            <option value="xbl">Xbox</option>
          </select>
        </label>
        <button onClick={this.registerUser}>Register</button>
        <Error show={error}>An error has occured</Error>
      </React.Fragment>
    );
  }
}

export default Register;

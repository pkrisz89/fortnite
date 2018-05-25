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

    this.handleChange = this
      .handleChange
      .bind(this);
    this.login = this
      .login
      .bind(this);
  }

  componentDidMount() {
    if (AuthenticationService.isAuthenticated()) {
      Router.replace("/");
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  login() {
    this.setState({ error: false });
    const payload = {
      password: this.state.password,
      email: this.state.email
    };
    return AuthenticationService
      .authenticate(payload)
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
        <div className="form__container">
          <h1 className="form__header">Login</h1>
          <img className="form__image" src='./static/images/trap.png' alt="" />
          <div className="form__fieldset">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              className="form__input"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange} />
          </div>
          <div className="form__fieldset">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form__input"
              value={password}
              onChange={this.handleChange} />
          </div>
          <button
            className="form__button"
            onClick={this.login}
            disabled={!email || !password}>
            Login
          </button>
          <Error show={error}>An error has occurred</Error>
        </div>
        <a
          href="https://twitter.com/messages/compose?recipient_id=&ref_src=twsrc%5Etfw"
          className="contact">Created by @KPintr</a>
      </React.Fragment>
    );
  }
}

export default Login;

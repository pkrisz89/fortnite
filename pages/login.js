import Router from "next/router";
import styled from 'styled-components';
import Nav from "../components/nav";
import Head from "../components/head";
import Error from "../components/error";
import AuthenticationService from "../services/authenticationService";

const Circle = styled.div `
  height: 100px;
  width: 100px;
  background-color: red;
`;

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
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  login() {
    this.setState({error: false});
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
        this.setState({error: true});
      });
  }

  render() {
    const {email, password, error} = this.state;

    return (
      <React.Fragment>
        <Nav/>
        <div className="registration">
          <h1 className="registration__header">Login</h1>
          <img className="registration__image" src='./static/images/trap.png' alt=""/>
          <div className="registration__fieldset">
            <label className="registration__label" htmlFor="email">
              Email
            </label>
            <input
              className="registration__input"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}/>
          </div>
          <div className="registration__fieldset">
            <label className="registration__label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="registration__input"
              value={password}
              onChange={this.handleChange}/>
          </div>
          <button
            className="registration__button"
            onClick={this.login}
            disabled={!email || !password}>
            Login
          </button>
          <Error show={error}>An error has occurred</Error>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

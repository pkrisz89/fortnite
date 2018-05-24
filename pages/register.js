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
    this.handleChange = this
      .handleChange
      .bind(this);
    this.registerUser = this
      .registerUser
      .bind(this);
  }

  componentDidMount() {
    if (AuthenticationService.isAuthenticated()) {
      Router.replace("/");
    }
  }

  registerUser() {
    const {username, password, email, platform} = this.state;
    this.setState({error: false});
    const payload = {
      username,
      password,
      email,
      platform
    };
    return registrationService(payload).then(() => {
      Router.replace("/");
    }).catch(() => {
      this.setState({error: true});
    });
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  render() {
    const {username, email, password, platform, error} = this.state;
    return (
      <React.Fragment>
        <Nav/>

        <div className="form__container">
          <span className="form__header">Register</span>
          <img className="form__image" src='./static/images/woman.png' alt=""/>
          <div className="form__fieldset">
            <label className="form__label" htmlFor="username">
              Username
            </label>
            <input
              className="form__input"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}/>
          </div>
          <div className="form__fieldset">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              className="form__input"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}/>
          </div>
          <div className="form__fieldset">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}/>
          </div>
          <div className="form__fieldset">
            <label className="form__label" htmlFor="platform">
              Platform
            </label>
            <select
              className="form__input"
              value={platform}
              name="platform"
              onChange={this.handleChange}>
              <option value="pc">PC</option>
              <option value="psn">Play Station</option>
              <option value="xbl">Xbox</option>
            </select>
          </div>
          <button
            className="form__button"
            onClick={this.registerUser}
            disabled={!username || !email || !password}>Register</button>
          <Error show={error}>An error has occured</Error>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;

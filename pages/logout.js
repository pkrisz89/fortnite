import Router from "next/router";
import AuthenticationService from "../services/authenticationService";

const Logout = () => {
  AuthenticationService.removeToken();
  Router.replace("/");
  return null;
};

export default Logout;

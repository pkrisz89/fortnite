import Router from "next/router";
import AuthenticationService from "../services/authenticationService";

const Logout = () => {
  AuthenticationService.logout();
  Router.replace("/login");
  return null;
};

export default Logout;

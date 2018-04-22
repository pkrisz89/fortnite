import Link from "next/link";
import AuthenticationService from "../services/authenticationService";

const noAuthRoutes = [
  { id: "Home", href: "/" },
  { id: "Register", href: "/register" },
  { id: "Login", href: "/login" }
];

const authRoutes = [
  { id: "Home", href: "/" },
  { id: "My stats", href: "/my-stats" },
  { id: "Compare stats", href: "/compare" },
  { id: "Logout", href: "/logout" }
];

const Links = ({ links }) => {
  return links.map(item => {
    return (
      <li key={item.id}>
        <Link href={item.href}>
          <a>{item.id}</a>
        </Link>
      </li>
    );
  });
};

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }
  componentDidMount() {
    this.setState({
      authenticated: AuthenticationService.isAuthenticated()
    });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <nav>
        <ul>
          <Links links={authenticated ? authRoutes : noAuthRoutes} />
        </ul>
      </nav>
    );
  }
}

export default Nav;

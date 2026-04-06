import { Link } from "react-router-dom";
import { pathsNavigation } from "../../../resources/routes/paths-navigation.routes";

function LoginScreen() {
  return (
    <fieldset className="fieldset">
      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" />
      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" />
      <div>
        <a className="link link-hover">Forgot password?</a>
      </div>
      <Link className="btn btn-neutral mt-4" to={pathsNavigation.dashboard}>
        Login
      </Link>
    </fieldset>
  );
}

export default LoginScreen;

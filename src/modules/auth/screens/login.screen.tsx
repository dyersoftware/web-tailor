import { Link } from "react-router-dom";
import { pathsNavigation } from "../../../resources/routes/paths-navigation.routes";
import { AUTH_PATHS } from "../../../resources/endpoints/api_endpoints.constants";

function LoginScreen() {
  console.log(AUTH_PATHS.LOGIN);
  return (
    <fieldset className="fieldset">
      <label className="label">Email</label>
      {AUTH_PATHS.LOGIN}

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

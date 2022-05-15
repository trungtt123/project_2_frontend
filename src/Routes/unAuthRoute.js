import { Route, Switch } from "react-router-dom";
import RedirectLogin from "./redirectLogin";
import LoginPage from "../pages/LoginPages";
const UnAuth = () => {
  return (
    <>
      <Switch>
        <>
          <Route path="/login" exact component={LoginPage} />
          <Route path="*" component={RedirectLogin} />
        </>
      </Switch>
    </>
  );
};

export default UnAuth;

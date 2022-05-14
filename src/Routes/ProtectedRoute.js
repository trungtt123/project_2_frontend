import { Redirect } from "react-router";

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Redirect to="/" />;
  }
  return children;
};
export default ProtectedRoute;

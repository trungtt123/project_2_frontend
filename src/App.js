import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./pages/DashBoard";
import StyledNavbar from "./components/StyledNavbar";
import NotfoundPage from "./pages/NotfoundPage";
import LoginPage from "./pages/LoginPages";

import About from "./pages/About";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/authSlice";
import { useEffect, useState } from "react";
import UnAuth from "./Routes/unAuthRoute";
import { Switch } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [component, setComponent] = useState();
  const getCurrentView = () => {
    if (isAuthenticated === false) {
      return <UnAuth />;
    }
    return (
      <>
        <StyledNavbar />
        <Switch>
          <Route path="/" component={DashBoard} />
          <Route path="about" component={About} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="*" component={NotfoundPage} />
        </Switch>
      </>
    );
  };
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  useEffect(() => {
    setComponent(getCurrentView());
  }, [isAuthenticated]);
  return (
    <>
      <BrowserRouter>{component}</BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

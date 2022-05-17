import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./pages/DashBoard";
import StyledNavbar from "./components/StyledNavbar";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPages";
import { Triangle } from "react-loader-spinner";
import About from "./pages/About";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/authSlice";
import { useEffect, useState } from "react";
import UnAuth from "./Routes/unAuthRoute";
import { Switch } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const [component, setComponent] = useState();
  const getCurrentView = () => {
    if (isAuthenticated === false) {
      return <UnAuth />;
    } else
      return (
        <>
          <div className="app-header">
            <StyledNavbar />
          </div>
          <Switch>
            <Route path="/" exact component={DashBoard} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="*" component={ProductPage} />
          </Switch>
        </>
      );
  };
  useEffect(() => {
    dispatch(loadUser());
    setComponent(getCurrentView());
  }, []);
  useEffect(() => {
    setComponent(getCurrentView());
  }, [isAuthenticated]);
  return (
    <>
      <BrowserRouter>
        {!isLoading ? (
          <>{component}</>
        ) : (
          <div className="loading-container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <Triangle
              height="100"
              width="100"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data...</div>
          </div>
        )}
      </BrowserRouter>
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

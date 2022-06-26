import "./App.scss";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./pages/DashBoard";
import StyledNavbar from "./components/StyledNavbar";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPages";
import { Triangle } from "react-loader-spinner";
// import About from "./pages/About";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/authSlice";
import { useEffect, useState } from "react";
import UnAuth from "./Routes/unAuthRoute";
import { Switch } from "react-router-dom";
import NotfoundPage from "./pages/NotfoundPage";
import ProductBatchPage from "./pages/ProductBatch";
import Remain from "./components/Remain";
import ProductTypePage from "./pages/ProductTypePage";
import InputInfoPage from "./pages/InputInfoPage";
import { fetchAllUsers } from "../src/Redux/userSlice";
import { fetchAllProducts } from "../src/Redux/productSlice";
import { getListProductBatches } from "../src/Redux/productBatchSlice";
import OutputInfoPage from "./pages/OutputInfoPage";
function App() {
  const dispatch = useDispatch();
  const history = useHistory();
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
            {/* <Route path="/about" exact component={About} /> */}
            <Route path="/login" exact component={LoginPage} />
            <Route path="/products" exact component={ProductPage} />
            <Route path="/product-type" exact component={ProductTypePage} />
            <Route path="/input-info-page" exact component={InputInfoPage} />
            <Route path="/output-info-page" exact component={OutputInfoPage} />
            <Route path="/remain" exact component={Remain} />
            <Route path="*" component={NotfoundPage} />
          </Switch>
        </>
      );
  };
  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchAllUsers());
    dispatch(fetchAllProducts());
    dispatch(getListProductBatches());
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

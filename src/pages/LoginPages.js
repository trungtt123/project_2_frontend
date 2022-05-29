import { useState } from "react";
import { login } from "../Redux/authSlice";
import "./LoginPages.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState([false, false]);
  const handleChangeUserName = (value) => {
    console.log(value);
    setUserName(value);
  };

  const handleChangePassword = (value) => {
    console.log(value);
    setPassword(value);
  };
  const checkEmty = () => {
    const tmp = [false, false];
    if (userName !== "") tmp[0] = true;
    if (password !== "") tmp[1] = true;
    return tmp;
  };
  const handleFocus = (type) => {
    const tmp = checkEmty();
    if (type === "username") tmp[0] = true;
    else if (type === "password") tmp[1] = true;
    setFocus(tmp);
  };
  const handleBlur = () => {
    setFocus(checkEmty());
  };
  const handleLogin = async () => {
    console.log("asdf", userName, password);
    dispatch(login({ userName, password })).then(() => {
      history.push("/");
    });
    //await fetch('https://localhost:7092/api/getlistpermissions')
  };
  return (
    <div className="loginPage">
      <div className="left-content">
        <div className="wave"></div>
        <div className="phone-background"></div>
      </div>
      <div className="right_content">
        <div className="login-form">
          <div className="avatar"> </div>
          <h1 className="welcome"> welcome</h1>

          <div
            className={focus[0] ? "input-div one focus" : "input-div one"}
            onFocus={(e) => handleFocus("username")}
            onBlur={(e) => handleBlur()}
          >
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <h5>Username</h5>
              <input
                type="text"
                onChange={(e) => handleChangeUserName(e.target.value)}
              />
            </div>
          </div>
          <div
            className={focus[1] ? "input-div pass focus" : "input-div pass"}
            onFocus={(e) => handleFocus("password")}
            onBlur={(e) => handleBlur()}
          >
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <h5>Password</h5>
              <input
                type="password"
                onChange={(e) => handleChangePassword(e.target.value)}
              />
            </div>
          </div>
          <input
            type="button"
            className="button"
            value="Login"
            onClick={() => handleLogin()}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

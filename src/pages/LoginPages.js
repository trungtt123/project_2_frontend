import { useState } from "react";
import { login } from "../Services/API/authService";
import "./LoginPages.scss";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [focus, setFocus] = useState([false, false]);
  const handleChangeUserName = (value) => {
    console.log(value);
    setUserName(value);
  };

  const handleChangePassWord = (value) => {
    console.log(value);
    setPassWord(value);
  };
  const checkEmty = () => {
    const tmp = [false, false];
    if (userName !== "") tmp[0] = true;
    if (passWord !== "") tmp[1] = true;
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
  const Submit = async () => {
    const abc = await login(userName, passWord);
    //await fetch('https://localhost:7092/api/getlistpermissions')
    console.log(abc);
  };
  return (
    // <div className="m-5">
    //   <div className="body_user_ui">
    //     {/* <div className="main-header_user">
    //     <div className="top-navbar">
    //       <div className="navbar-custom-menu">
    //         <a className="navbar-icon home-page"> T&K </a>
    //       </div>
    //     </div>
    //   </div> */}

    //     <div className="content-chinh-user">
    //       <div className="main-content1-user" id="main_content_play">
    //         <div className="content-header-user">
    //           <div className="title">
    //             <h2> Vui lòng đăng nhập </h2>
    //           </div>

    //           <hr className="red-line" />
    //         </div>
    //         {/* {userName} */}
    //         <div className="content-user">
    //           <div className="box-user">
    //             <div className="box-body-user">
    //               <div className="box-user-infor">
    //                 <div className="user-name">Đăng nhập</div>
    //                 {/*  */}
    //                 <div>
    //                   <div className="container">
    //                     <label for="uname">
    //                       <b>Username</b>
    //                     </label>
    //                     <input
    //                       type="text"
    //                       placeholder="Enter Email or phone number"
    //                       name="uname"
    //                       required
    //                       onChange={(e) => handleChangeUserName(e.target.value)}
    //                     />

    //                     <label for="psw">
    //                       <b>Password</b>
    //                     </label>
    //                     <input
    //                       type="password"
    //                       placeholder="Enter Password"
    //                       name="psw"
    //                       required
    //                       onChange={(e) => handleChangePassWord(e.target.value)}
    //                     />

    //                     <button onClick={() => Submit()}>Login</button>
    //                   </div>

    //                   <div className="container">
    //                     <span className="psw">
    //                       <a href="#"> Forgot password?</a>
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
                onChange={(e) => handleChangePassWord(e.target.value)}
              />
            </div>
          </div>
          <input
            type="button"
            className="button"
            value="Login"
            onClick={() => Submit()}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

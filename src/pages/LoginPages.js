import { useState } from "react";
import { login } from "../Services/API/authService";
import "./LoginPages.css";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleChangeUserName = (value) => {
    console.log(value);
    setUserName(value);
  };

  const handleChangePassWord = (value) => {
    console.log(value);
    setPassWord(value);
  };

  const Submit = async () => {
    const abc = await login(userName, passWord);
    //await fetch('https://localhost:7092/api/getlistpermissions')
    console.log(abc);
  };
  return (
    <div className="m-5">
      <div className="body_user_ui">
        {/* <div className="main-header_user">
        <div className="top-navbar">
          <div className="navbar-custom-menu">
            <a className="navbar-icon home-page"> T&K </a>
          </div>
        </div>
      </div> */}

        <div className="content-chinh-user">
          <div className="main-content1-user" id="main_content_play">
            <div className="content-header-user">
              <div className="title">
                <h2> Vui lòng đăng nhập </h2>
              </div>

              <hr className="red-line" />
            </div>
            {/* {userName} */}
            <div className="content-user">
              <div className="box-user">
                <div className="box-body-user">
                  <div className="box-user-infor">
                    <div className="user-name">Đăng nhập</div>
                    {/*  */}
                    <div>
                      <div class="container">
                        <label for="uname">
                          <b>Username</b>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Email or phone number"
                          name="uname"
                          required
                          onChange={(e) => handleChangeUserName(e.target.value)}
                        />

                        <label for="psw">
                          <b>Password</b>
                        </label>
                        <input
                          type="password"
                          placeholder="Enter Password"
                          name="psw"
                          required
                          onChange={(e) => handleChangePassWord(e.target.value)}
                        />

                        <button onClick={() => Submit()}>Login</button>
                      </div>

                      <div className="container">
                        <span className="psw">
                          <a href="#"> Forgot password?</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

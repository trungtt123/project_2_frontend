import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Container from "@material-ui/core/Container";
import _ from "lodash";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import ModalOutputInfo from "../components/outputinfo/ModalOutputInfo";
import TextField from "@mui/material/TextField";
import { Button, Modal, Dialog, ButtonGroup } from "@material-ui/core";
import ModalProduct from "../components/outputinfo/ModalProduct";
import ModalProductBatchProduct from "../components/inputinfo/ModalProductBatchProduct";

import { fetchAllProducts, fetchAllProductType } from "../Redux/productSlice";

import productBatchService from "../Services/API/productBatchService";

import { logout } from "../Redux/authSlice";
export default function ChangePasswordPage() {

  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = async () => {

    if (oldPassword === '') {
      alert('Hãy nhập password cũ!');
      return;
    }
    if (newPassword === '') {
      alert('Hãy nhập password mới!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Confirm password không chính xác!');
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    var url = process.env.REACT_APP_BASE_URL + "/change-password";
    try {
      var res = await axios.put(url, {
        userName: user?.userName,
        oldPassword,
        newPassword
      }, {
        headers: headers,
      });
      console.log(res);
      if (res?.status === 200) {
        dispatch(logout());
        alert('Đổi mật khẩu thành công! Đăng nhập lại để tiếp tục!');
      }
    }
    catch (e) {
      alert('Mật khẩu không đúng!');
      return;
    }

  }
  useEffect(() => {

  }, []);

  return (
    <div>
      <div style={{ margin: "auto", width: '40%' }}>
        <div className="text-center mt-3 mb-3" >
          <h3>ĐỔI MẬT KHẨU</h3>
        </div>
        <div className="content-body row">
          <div className="form-group">
            <label>
              Username (<span className="text-danger">*</span>)
            </label>
            <input
              type="text"
              className="form-control"
              value={user?.userName}
              disabled
            />
          </div>

          <div className="form-group">
            <label>
              Mật khẩu cũ (<span className="text-danger">*</span>)
            </label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Nhập mật khẩu cũ . . ."
            />
          </div>
          <div className="form-group">
            <label>
              Mật khẩu mới (<span className="text-danger">*</span>)
            </label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới . . ."
            />
          </div>
          <div className="form-group">
            <label>
              Xác nhận mật khẩu mới (<span className="text-danger">*</span>)
            </label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu mới . . ."
            />
          </div>
          <button onClick={() => handleSubmit()}
            className="btn btn-warning" style={{ width: 100, margin: 'auto' }}>Gửi</button>
        </div>
      </div>
    </div>
  );
}

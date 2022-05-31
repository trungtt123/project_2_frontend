import React, { useState, useEffect } from "react";
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
import axios from "axios";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function InputInfo(props) {
  const [open, setOpen] = useState(false);
  const { inputInfo } = props;
  console.log(inputInfo);
  return (
    <>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        size="small"
        style={{ fontSize: "0.2em" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Typography style={{ fontSize: 15 }}>
            Lô 1, lô thịt bò, có 20 mặt hàng
          </Typography>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ProductTable inputInfoId={props.inputInfoId} />
        </Collapse>
      </List>
    </>
  );
}
function ProductTable(props) {
  const [listProductTable, setListProductTable] = useState([]);
  const getListInputInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    var url =
      "https://localhost:7092/api/v1/input-info?inputInfoId=" +
      props?.inputInfoId;
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        setListProductTable(res?.data?.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getListInputInfo();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listProductTable.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{1}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function InputInfoPage() {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [listInputInfo, setListInputInfo] = useState([]);
  const getListInputInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    var url = "https://localhost:7092/api/v1/list-input-info";
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        setListInputInfo(res?.data?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getListInputInfo();
  }, []);
  return (
    <div style={{ margin: "auto 2px" }}>
      <div className="text-center mt-3 mb-3">
        <h3>TRANG NHẬP HÀNG</h3>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow>
              <TableCell width={20} />
              <TableCell width={200}>ID</TableCell>
              <TableCell align="right">Tên bản nhập hàng</TableCell>
              <TableCell align="right">Người giao hàng</TableCell>
              <TableCell align="right">Người nhận hàng</TableCell>
              <TableCell align="right">Thời gian tạo</TableCell>
              <TableCell align="right">Chỉnh sửa lần cuối</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listInputInfo.map((inputInfo, index) => (
              <React.Fragment key={index}>
                <TableRow className={classes.root}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {inputInfo?.inputInfoId}
                  </TableCell>
                  <TableCell align="right">
                    {inputInfo?.inputInfoName}
                  </TableCell>
                  <TableCell align="right">{inputInfo?.shipper}</TableCell>
                  <TableCell align="right">
                    {inputInfo?.inputInfoName}
                  </TableCell>
                  <TableCell align="right">
                    {inputInfo?.receiverUserId}
                  </TableCell>
                  <TableCell align="right">
                    {inputInfo?.inputCreateTime}
                  </TableCell>
                  <TableCell align="right">
                    {inputInfo?.inputUpdateTime}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <InputInfo inputInfoId={inputInfo?.inputInfoId} />
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

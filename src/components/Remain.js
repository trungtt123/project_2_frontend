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
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
const formatDateTime = (s, type) => {
  if (type === 1) return moment(s).format("DD/MM/YYYY");
  if (type === 2) return moment(s).format("DD/MM/YYYY - hh:mm:ss A");
};


function Product(props) {
  const classes = useRowStyles();
  const { productInventory } = props;
  const [open, setOpen] = useState(false);
  const { productList, productTypeList } = useSelector(
    (state) => state.product
  );
  const { productBatchList } = useSelector((state) => state.productBatch);
  const product = productList.find(o => o.productId == productInventory.productId);
  const productType = productTypeList.find(o => o.productTypeId == product.productTypeId);
  console.log(productInventory.listInventories);
  return (
    <>
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell width="1%">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell width="10%" scope="row">
            {product?.productId}
          </TableCell>
          <TableCell width="20%" align="right">
            {product?.productName}
          </TableCell>
          <TableCell width="20%" align="right">
            {product?.productOrigin}
          </TableCell>
          <TableCell width="20%" align="right">
            {product?.productSuplier}
          </TableCell>
          <TableCell width="20%" align="right">
            {productType?.productTypeName}
          </TableCell>
          <TableCell width="15%" align="right">
            {product?.productUnit}
          </TableCell>

        </TableRow>
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={8}>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              style={{ backgroundColor: "white" }}
            >
              <div
                className="mt-3 mb-5"
                style={{
                  boxShadow: "2px 2px 2px 2px #AAA",
                  borderRadius: "25px",
                  margin: "auto",
                  width: "95%",
                  padding: 10,
                }}
              >
                <Table
                  style={{ margin: "auto" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Mã lô</TableCell>
                      <TableCell align="right">Tên lô</TableCell>
                      <TableCell align="right">Mã trong lô</TableCell>
                      <TableCell align="right">Số lượng còn lại</TableCell>
                      <TableCell align="right">Hạn sử dụng</TableCell>
                      <TableCell align="right">Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productInventory?.listInventories?.map((item, index) => {
                      var today = new Date();
                      var productBatchDetail = productBatchList.find(o => o.productBatchId == item.productBatchId);
                      return <TableRow key={index} style={{
                        background: `${index % 2 ? "#fdffe0" : "white"}`,
                      }}>
                        <TableCell align="left">{item?.productBatchId}</TableCell>
                        <TableCell align="right">{productBatchDetail?.productBatchName}</TableCell>
                        <TableCell align="right">{item?.productBatchProductId}</TableCell>
                        <TableCell align="right">{item?.productQuantity}</TableCell>
                        <TableCell align="right">{formatDateTime(item?.dateExpiry, 1)}</TableCell>
                        <TableCell align="right">
                          {
                            item?.productQuantity <= 0 ? "Hết hàng, " : "Còn hàng, "
                          }
                          {
                            item?.dateExpiry <= today ? "Hết hạn" : "Còn hạn"
                          }
                        </TableCell>
                      </TableRow>
                    })}


                  </TableBody>
                </Table>
              </div>
            </Collapse>
          </TableCell>
        </TableRow>

      </React.Fragment>

    </>
  );
}

export default function RemainPage() {
  const [openModalOutputInfo, setOpenModalOutputInfo] = React.useState(false);
  const [confirmOutputInfo, setComfirmOutputInfo] = React.useState(0);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    //width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();

  const [listInventories, setListInventories] = useState([]);
  const getListInventories = async () => {
    const response = await productBatchService.getStatistic();
    const data = response?.data;
    setListInventories(data);
  };

  useEffect(() => {
    console.log("trung da toi day");
    // dispatch(fetchAllProducts());
    // dispatch(fetchAllProductType());
    getListInventories();
  }, []);

  return (
    <div>
      <div style={{ margin: "auto 2px" }}>
        <div className="text-center mt-3 mb-3">
          <h3>TRANG QUẢN LÝ TỒN KHO</h3>
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
                <TableCell align="right">Tên sản phẩm</TableCell>
                <TableCell align="right">Nơi xuất xứ</TableCell>
                <TableCell align="right">Nhà cung cấp</TableCell>
                <TableCell align="right">Loại sản phẩm</TableCell>
                <TableCell align="right">Đơn vị</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listInventories.map((inventory, index) => (
                <Product
                  key={index}
                  productInventory={inventory}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </div>
  );
}

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
const handleProductInOutput = (listProducts) => {
  var app = new Map();
  var listId = [];
  var products = [];
  for (const product of listProducts) {
    if (app[product.productId] === undefined) {
      app[product.productId] = 1;
      listId.push(product.productId);
    }
  }
  for (const productId of listId) {
    var arr = listProducts.filter((o) => o.productId === productId);
    var quantity = 0;
    for (const item of arr) {
      quantity += item.productQuantity;
    }
    products.push({
      productId: productId,
      listProducts: arr,
      productQuantity: quantity,
    });
  }
  return products;
};
function ProductInBatch(props) {
  const { productDetail, outputInfo } = props;
  const [openModalProductEdit, setOpenModalProductEdit] = useState(false);
  const productModalData = useRef({});
  console.log("chay tiep product in batch", productDetail);
  const { productBatchList } = useSelector((state) => state.productBatch);

  const handleDeleteProductOutputInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    if (window.confirm(`Bạn có chắc chắn xóa sản phẩm này?`) == false) {
      return;
    }
    var url = `https://localhost:7092/api/v1/output-info/products?id=${productModalData?.current?.outputProductId}`;
    await axios.delete(url, {
      headers: headers,
    });
    props.confirmProductTable();
  };
  return (
    <div
      className="mt-4 mb-4"
      style={{
        fontSize: 14,
        boxShadow: "2px 2px 2px 2px #AAA",
        borderRadius: "25px",
        margin: "auto",
        width: "60%",
        padding: 10,
      }}
    >
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Mã lô</TableCell>
            <TableCell align="right">Tên lô</TableCell>
            <TableCell align="right">Mã trong lô</TableCell>
            <TableCell align="right">Số lượng</TableCell>
            <TableCell align="right">Hạn sử dụng</TableCell>
            <TableCell align="right">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productDetail?.listProducts?.map((item, index) => {
            var productBatchDetail = productBatchList.find(
              (o) => o.productBatchId === item.productBatchId
            );
            return (
              <TableRow
                key={index}
                style={{ background: `${index % 2 ? "#fdffe0" : "white"}` }}
              >
                <TableCell align="left">
                  {productBatchDetail?.productBatchId}
                </TableCell>
                <TableCell align="right">
                  {productBatchDetail?.productBatchName}
                </TableCell>
                <TableCell align="right">
                  {item.productBatchProductId}
                </TableCell>
                <TableCell align="right">{item.productQuantity}</TableCell>
                <TableCell align="right">
                  {formatDateTime(item.dateExpiry, 1)}
                </TableCell>
                <TableCell align="right">
                  <ButtonGroup size="small" aria-label="small button group">
                    <Button
                      key="one"
                      color="primary"
                      variant="contained"
                      style={{ fontSize: 10, backgroundColor: "#F4A460" }}
                      onClick={() => {
                        setOpenModalProductEdit(true);
                        productModalData.current = item;
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      key="three"
                      color="primary"
                      variant="contained"
                      style={{ fontSize: 10, backgroundColor: "#DC143C" }}
                      onClick={() => {
                        productModalData.current = item;
                        handleDeleteProductOutputInfo();
                      }}
                    >
                      Xóa
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ModalProduct
        show={openModalProductEdit}
        handleClose={() => {
          setOpenModalProductEdit(false);
          props.confirmProductTable();
        }}
        outputInfo={outputInfo}
        dataModalProduct={productModalData.current}
        action={"EDIT"}
      />
    </div>
  );
}

function ProductTableDetail(props) {
  const { productDetail, outputInfo } = props;
  console.log("chay tiep product table detail", productDetail);
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        style={{
          background: "white",
        }}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell width={20} align="left">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{productDetail?.productId}</TableCell>
        <TableCell align="right">{productDetail?.productName}</TableCell>
        <TableCell align="right">{productDetail?.productOrigin}</TableCell>
        <TableCell align="right">{productDetail?.productSuplier}</TableCell>
        <TableCell align="right">{productDetail?.productUnit}</TableCell>
        <TableCell align="right">{productDetail?.productQuantity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={8}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{ backgroundColor: "white" }}
          >
            <ProductInBatch
              productDetail={productDetail}
              outputInfo={outputInfo}
              confirmProductTable={() => props.confirmProductTable()}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function ProductTable(props) {
  const { outputInfo, changeProductTable } = props;
  const [open, setOpen] = useState(false);
  const [confirmProductTable, setConfirmProductTable] = useState(0);
  const [listProductTable, setListProductTable] = useState([]);
  const { productList } = useSelector((state) => state.product);

  const getListProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    var url = `https://localhost:7092/api/v1/output-info?outputInfoId=${outputInfo?.outputInfoId}`;
    var res = await axios.get(url, {
      headers: headers,
    });
    var data = res?.data?.data?.listProducts;
    console.log(data);
    var listProducts = handleProductInOutput(data);
    data = _.sortBy(data, [
      (o) => {
        return o.productId;
      },
    ]);
    setListProductTable(listProducts);
  };

  useEffect(() => {
    getListProducts();
  }, [changeProductTable, confirmProductTable]);
  return (
    <div>
      {listProductTable?.length === 0 ? (
        <div
          style={{
            fontSize: 14,
            boxShadow: "2px 2px 2px 2px #AAA",
            borderRadius: "25px",
            margin: "auto",
            width: "95%",
            padding: 10,
          }}
          className="text-center mt-3 mb-3"
        >
          Không có dữ liệu về sản phẩm!
        </div>
      ) : (
        <div
          className="mt-3 mb-3"
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
                <TableCell align="left" width={20}></TableCell>
                <TableCell align="left" width={200}>
                  Mã sản phẩm
                </TableCell>
                <TableCell align="right">Tên sản phẩm</TableCell>
                <TableCell align="right">Xuất xứ</TableCell>
                <TableCell align="right">Công ty sản xuất</TableCell>
                <TableCell align="right">Đơn vị</TableCell>
                <TableCell align="right">Số lượng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProductTable.map((product, index) => {
                var productInfo = productList?.find(
                  (o) => o.productId === product.productId
                );
                console.log(productInfo);
                var productDetail = {
                  ...product,
                  productName: productInfo?.productName,
                  productOrigin: productInfo?.productOrigin,
                  productSuplier: productInfo?.productSuplier,
                  productUnit: productInfo?.productUnit,
                };
                console.log(product);
                return (
                  <ProductTableDetail
                    key={index}
                    productDetail={productDetail}
                    outputInfo={outputInfo}
                    confirmProductTable={() =>
                      setConfirmProductTable(confirmProductTable + 1)
                    }
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
function OutputInfo(props) {
  console.log("chay tiep");
  const { index, outputInfo } = props;
  const [confirmOutputInfo, setConfirmOutputInfo] = useState(0);
  const [changeProductTable, setChangeProductTable] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModalOutputInfoEdit, setOpenModalOutputInfoEdit] = useState(false);
  const [openModalProductCreate, setOpenModalProductCreate] = useState(false);
  const { userList, isLoading } = useSelector((state) => state.user);
  const classes = useRowStyles();
  const signatorUser = userList?.find(
    (o) => o.userId === outputInfo.signatorId
  );
  const pickerUser = userList?.find((o) => o.userId === outputInfo.pickerId);
  const handleDeleteOutputInfo = (outputInfoId) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    if (window.confirm(`Bạn có chắc chắn xóa bản xuất hàng này?`) == false) {
      return;
    }
    var url = `https://localhost:7092/api/v1/output-info?outputInfoId=${outputInfoId}`;
    axios
      .delete(url, {
        headers: headers,
      })
      .then((res) => {
        //setListInputInfo(res?.data?.data);

        console.log(res);
        props.confirmOutputInfo();
      })
      .catch((error) => console.log(error));
  };
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
            {index + 1}
          </TableCell>
          <TableCell width="15%" align="right">
            {outputInfo?.outputInfoName}
          </TableCell>
          <TableCell width="15%" align="right">
            {signatorUser?.surName + " " + signatorUser?.givenName}
          </TableCell>
          <TableCell width="15%" align="right">
            {pickerUser?.surName + " " + pickerUser?.givenName}
          </TableCell>
          <TableCell width="15%" align="right">
            {formatDateTime(outputInfo?.outputCreateTime, 2)}
          </TableCell>
          <TableCell width="15%" align="right">
            {formatDateTime(outputInfo?.outputUpdateTime, 2)}
          </TableCell>
          <TableCell width="15%" align="right">
            <ButtonGroup size="small" aria-label="small button group">
              <Button
                key="one"
                color="primary"
                variant="contained"
                style={{ fontSize: 10, backgroundColor: "#F4A460" }}
                onClick={() => setOpenModalOutputInfoEdit(true)}
              >
                Chỉnh sửa
              </Button>
              <Button
                key="two"
                color="primary"
                variant="contained"
                style={{ fontSize: 10 }}
                onClick={() => setOpenModalProductCreate(true)}
              >
                Thêm sản phẩm
              </Button>
              <Button
                key="three"
                color="primary"
                variant="contained"
                style={{ fontSize: 10, backgroundColor: "#DC143C" }}
                onClick={() => handleDeleteOutputInfo(outputInfo?.outputInfoId)}
              >
                Xóa
              </Button>
            </ButtonGroup>
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
              <ProductTable
                outputInfo={outputInfo}
                changeProductTable={changeProductTable}
              />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      <ModalProduct
        show={openModalProductCreate}
        handleClose={() => {
          setOpenModalProductCreate(false);
          props.confirmOutputInfo();
          setChangeProductTable(changeProductTable + 1);
        }}
        outputInfo={outputInfo}
        action={"CREATE"}
      />
      <ModalOutputInfo
        show={openModalOutputInfoEdit}
        handleClose={() => {
          props.confirmOutputInfo();
          setOpenModalOutputInfoEdit(false);
        }}
        dataModalOutputInfo={outputInfo}
        action={"EDIT"}
      />
    </>
  );
}

export default function OutputInfoPage() {
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
  const [listOutputInfo, setListOutputInfo] = useState([]);
  const getListOutputInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    var url = "https://localhost:7092/api/v1/list-output-info";
    var res = await axios.get(url, {
      headers: headers,
    });
    setListOutputInfo(res?.data?.data);
  };

  useEffect(() => {
    console.log("trung da toi day");
    getListOutputInfo();
  }, [openModalOutputInfo, confirmOutputInfo]);
  console.log(listOutputInfo);
  return (
    <div>
      <div style={{ margin: "auto 2px" }}>
        <div className="text-center mt-3 mb-3">
          <h3>TRANG XUẤT HÀNG</h3>
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
                <TableCell width={200}>STT</TableCell>
                <TableCell align="right">Tên bản xuất hàng</TableCell>
                <TableCell align="right">Người ký xuất</TableCell>
                <TableCell align="right">Người lấy hàng</TableCell>
                <TableCell align="right">Thời gian tạo</TableCell>
                <TableCell align="right">Chỉnh sửa lần cuối</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOutputInfo.map((outputInfo, index) => (
                <OutputInfo
                  key={index}
                  index={index}
                  outputInfo={outputInfo}
                  confirmOutputInfo={() =>
                    setComfirmOutputInfo(confirmOutputInfo + 1)
                  }
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Box
        m={1}
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ height: 40 }}
          onClick={() => setOpenModalOutputInfo(true)}
        >
          Thêm trang
        </Button>
      </Box>

      <ModalOutputInfo
        show={openModalOutputInfo}
        handleClose={() => setOpenModalOutputInfo(false)}
        action={"CREATE"}
      />
    </div>
  );
}

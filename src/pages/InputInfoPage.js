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
import ModalInputInfo from "../components/inputinfo/ModalInputInfo";
import TextField from "@mui/material/TextField";
import { Button, Modal, Dialog, ButtonGroup } from "@material-ui/core";
import ModalProductBatch from "../components/inputinfo/ModalProductBatch";
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
function ProductBatch(props) {
  const { inputInfo, productBatchChanged } = props;
  console.log(inputInfo);
  const [confirmProductBatch, setConfirmProductBatch] = useState(0);
  const [listProductBatches, setListProductBatches] = useState([]);
  const getListProductBatch = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    var url =
      "https://localhost:7092/api/v1/input-info?inputInfoId=" +
      inputInfo?.inputInfoId;
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        setListProductBatches(res?.data?.data?.listProductBatches);
        //console.log(res?.data?.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getListProductBatch();
  }, [productBatchChanged, confirmProductBatch]);
  return (
    <>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        size="small"
        style={{ fontSize: "0.2em" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {listProductBatches?.map((productBatch, index) => (
          <div key={index}>
            <ProductTable
              productBatch={productBatch}
              inputInfo={inputInfo}
              confirmProductBatch={() =>
                setConfirmProductBatch(confirmProductBatch + 1)
              }
            />
          </div>
        ))}
      </List>
    </>
  );
}
function ProductTable(props) {
  const { productBatch } = props;
  const [open, setOpen] = useState(false);
  const [listProductTable, setListProductTable] = useState([]);
  const [openModalProductBatchEdit, setOpenModalProductBatchEdit] =
    useState(false);
  const [
    openModalProductBatchProductCreate,
    setOpenModalProductBatchProductCreate,
  ] = useState(false);
  const [
    openModalProductBatchProductEdit,
    setOpenModalProductBatchProductEdit,
  ] = useState(false);
  const { productList } = useSelector((state) => state.product);
  const productData = useRef({});
  const handleDeleteProductBatch = () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    if (
      window.confirm(
        `Bạn có chắc chắn xóa lô hàng mã ${productBatch.productBatchId}`
      ) == false
    ) {
      return;
    }
    var url = `https://localhost:7092/api/v1/product-batch?productBatchId=${productBatch.productBatchId}`;
    axios
      .delete(url, {
        headers: headers,
      })
      .then((res) => {
        //setListInputInfo(res?.data?.data);

        console.log(res);
        props.confirmProductBatch();
        //props.confirmInputInfo();
      })
      .catch((error) => console.log(error));
  };
  const getListProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    var url = `https://localhost:7092/api/v1/product-batch?productBatchId=${productBatch?.productBatchId}`;
    var res = await axios.get(url, {
      headers: headers,
    });
    setListProductTable(res?.data?.data?.listProducts);
  };
  const handleDeleteProductInBatch = async (id, productInfo) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa sản phẩm này trong lô mã ${productBatch.productBatchId}`
      )
    )
      return;
    await productBatchService.deleteProductBatchProduct(id);
    getListProducts();
  };

  useEffect(() => {
    getListProducts();
  }, []);
  return (
    <div>
      <div
        style={{
          fontSize: 15,
          margin: "auto",
          width: "95%",
          position: "relative",
        }}
        className="mb-2"
      >
        <InboxIcon />
        <span
          style={{
            display: "inline-block",
            position: "absolute",
            marginLeft: 10,
            width: 200,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            bottom: 0,
          }}
        >
          Mã lô hàng: {productBatch.productBatchId}, tên lô:{" "}
          {productBatch.productBatchName}
        </span>

        <span style={{ marginLeft: 250 }}>
          <ButtonGroup size="small" aria-label="small button group">
            <Button
              color="primary"
              variant="contained"
              key="one"
              onClick={() => setOpenModalProductBatchEdit(true)}
              style={{ fontSize: 10, backgroundColor: "#F4A460" }}
            >
              Chỉnh sửa
            </Button>
            <Button
              color="primary"
              variant="contained"
              key="two"
              onClick={() => setOpenModalProductBatchProductCreate(true)}
              style={{ fontSize: 10 }}
            >
              Thêm sản phẩm
            </Button>
            <Button
              key="three"
              onClick={() => handleDeleteProductBatch()}
              color="secondary"
              variant="contained"
              style={{ fontSize: 10, backgroundColor: "#DC143C" }}
            >
              Xóa
            </Button>
          </ButtonGroup>
          {open ? (
            <ExpandLess onClick={() => setOpen(false)} />
          ) : (
            <ExpandMore onClick={() => setOpen(true)} />
          )}
        </span>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
                <TableCell align="left">STT</TableCell>
                <TableCell align="right">Mã sản phẩm</TableCell>
                <TableCell align="right">Tên sản phẩm</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Ngày hết hạn</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProductTable.map((product, index) => {
                var productInfo = productList?.find(
                  (o) => o.productId === product.productId
                );
                var productDetail = {
                  ...product,
                  productName: productInfo?.productName,
                };
                console.log(product);
                return (
                  <>
                    <TableRow
                      style={{
                        background: `${index % 2 ? "#fdffe0" : "white"}`,
                      }}
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell width="10%" align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">
                        {productDetail?.productId}
                      </TableCell>
                      <TableCell align="right">
                        {productDetail?.productName}
                      </TableCell>
                      <TableCell align="right">
                        {product?.productQuantity}
                      </TableCell>
                      <TableCell align="right" component="th">
                        {formatDateTime(product?.dateExpiry, 1)}
                      </TableCell>
                      <TableCell align="right" component="th">
                        <ButtonGroup
                          size="small"
                          aria-label="small button group"
                        >
                          <Button
                            key="one"
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              setOpenModalProductBatchProductEdit(true);
                              productData.current = _.cloneDeep(product);
                            }}
                            style={{ fontSize: 10, backgroundColor: "#F4A460" }}
                          >
                            Chỉnh sửa
                          </Button>
                          <Button
                            key="three"
                            color="primary"
                            variant="contained"
                            style={{ fontSize: 10, backgroundColor: "#DC143C" }}
                            onClick={() =>
                              handleDeleteProductInBatch(
                                product.id,
                                productInfo
                              )
                            }
                          >
                            Xóa
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Collapse>
      <ModalProductBatch
        show={openModalProductBatchEdit}
        handleClose={() => {
          setOpenModalProductBatchEdit(false);
          props.confirmProductBatch();
        }}
        dataModalProductBatch={productBatch}
        action={"EDIT"}
      />
      <ModalProductBatchProduct
        show={openModalProductBatchProductCreate}
        handleClose={() => {
          setOpenModalProductBatchProductCreate(false);
          getListProducts();
        }}
        productBatchId={productBatch?.productBatchId}
        action={"CREATE"}
      />
      <ModalProductBatchProduct
        show={openModalProductBatchProductEdit}
        handleClose={() => {
          setOpenModalProductBatchProductEdit(false);
          getListProducts();
        }}
        dataModalProduct={productData.current}
        productBatchId={productBatch?.productBatchId}
        action={"EDIT"}
      />
    </div>
  );
}

function InputInfo(props) {
  const { inputInfo } = props;
  const [productBatchChanged, setProductBatchChanged] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModalInputInfoEdit, setOpenModalInputInfoEdit] = useState(false);
  const [openModalProductBatchCreate, setOpenModalProductBatchCreate] =
    useState(false);
  const { userList, isLoading } = useSelector((state) => state.user);
  const classes = useRowStyles();
  const receiverUser = userList?.find(
    (o) => o.userId === inputInfo.receiverUserId
  );
  const handleDeleteInputInfo = (inputInfoId) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    if (
      window.confirm(`Bạn có chắc chắn xóa bản nhập hàng ${inputInfoId}`) ==
      false
    ) {
      return;
    }
    var url = `https://localhost:7092/api/v1/input-info?inputInfoId=${inputInfoId}`;
    axios
      .delete(url, {
        headers: headers,
      })
      .then((res) => {
        //setListInputInfo(res?.data?.data);

        console.log(res);
        props.confirmInputInfo();
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
            {inputInfo?.inputInfoId}
          </TableCell>
          <TableCell width="15%" align="right">
            {inputInfo?.inputInfoName}
          </TableCell>
          <TableCell width="15%" align="right">
            {inputInfo?.shipper}
          </TableCell>
          <TableCell width="15%" align="right">
            {receiverUser?.surName + " " + receiverUser?.givenName}
          </TableCell>
          <TableCell width="15%" align="right">
            {formatDateTime(inputInfo?.inputCreateTime, 2)}
          </TableCell>
          <TableCell width="15%" align="right">
            {formatDateTime(inputInfo?.inputUpdateTime, 2)}
          </TableCell>
          <TableCell width="15%" align="right">
            <ButtonGroup size="small" aria-label="small button group">
              <Button
                key="one"
                color="primary"
                variant="contained"
                style={{ fontSize: 10, backgroundColor: "#F4A460" }}
                onClick={() => setOpenModalInputInfoEdit(true)}
              >
                Chỉnh sửa
              </Button>
              <Button
                key="two"
                color="primary"
                variant="contained"
                style={{ fontSize: 10 }}
                onClick={() => setOpenModalProductBatchCreate(true)}
              >
                Thêm lô
              </Button>
              <Button
                key="three"
                color="primary"
                variant="contained"
                style={{ fontSize: 10, backgroundColor: "#DC143C" }}
                onClick={() => handleDeleteInputInfo(inputInfo?.inputInfoId)}
              >
                Xóa
              </Button>
            </ButtonGroup>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <ProductBatch
                inputInfo={inputInfo}
                productBatchChanged={() =>
                  setProductBatchChanged(productBatchChanged + 1)
                }
              />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      <ModalProductBatch
        show={openModalProductBatchCreate}
        handleClose={() => {
          setOpenModalProductBatchCreate(false);
        }}
        inputInfo={inputInfo}
        action={"CREATE"}
      />
      <ModalInputInfo
        show={openModalInputInfoEdit}
        handleClose={() => {
          props.confirmInputInfo();
          setOpenModalInputInfoEdit(false);
        }}
        dataModalInputInfo={inputInfo}
        action={"EDIT"}
      />
    </>
  );
}

export default function InputInfoPage() {
  const [openModalInputInfo, setOpenModalInputInfo] = React.useState(false);
  const [confirmInputInfo, setComfirmInputInfo] = React.useState(0);

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
  const [listInputInfo, setListInputInfo] = useState([]);
  const getListInputInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    var url = "https://localhost:7092/api/v1/list-input-info";
    var res = await axios.get(url, {
      headers: headers,
    });
    setListInputInfo(res?.data?.data);
  };

  useEffect(() => {
    console.log("trung da toi day");
    getListInputInfo();
  }, [openModalInputInfo, confirmInputInfo]);
  return (
    <div>
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
                <TableCell width={200}>Mã số</TableCell>
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
                <InputInfo
                  key={index}
                  inputInfo={inputInfo}
                  confirmInputInfo={() =>
                    setComfirmInputInfo(confirmInputInfo + 1)
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
          onClick={() => setOpenModalInputInfo(true)}
        >
          Thêm trang
        </Button>
      </Box>

      <ModalInputInfo
        show={openModalInputInfo}
        handleClose={() => setOpenModalInputInfo(false)}
        //dataModalUser={userData.current}

        action={"CREATE"}
      />
    </div>
  );
}

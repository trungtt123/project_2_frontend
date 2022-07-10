import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import productBatchService from "../../Services/API/productBatchService";
import { getProductBatch } from "../../Redux/productBatchSlice";
import { fetchAllProducts } from "../../Redux/productSlice";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
const ModalProduct = (props) => {
  const { outputInfo, dataModalProduct, handleClose, show, action } = props;
  console.log(dataModalProduct);
  const defaultNewProduct = {
    productId: undefined,
    productBatchProductId: undefined,
    productQuantity: 0,
  };
  const defaultValidInput = {
    productQuantity: true,
  };

  const { productList } = useSelector((state) => state.product);
  const [productInventories, setProductInventories] = useState([]);
  const [listProductBatches, setListProductBatches] = useState([]);
  const [productBatchProduct, setProductBatchProduct] = useState();
  const [isShowAddProduct, setIsShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState(defaultNewProduct);

  const dispatch = useDispatch();

  const getListProductInventories = async () => {
    const response = await productBatchService.getStatistic();
    const data = response?.data;
    console.log(data);
    setProductInventories(data);
  };

  useEffect(() => {
    getListProductInventories();
    // let _productBatchData = _.cloneDeep(productBatch);
    // setProductBatchEdit(_productBatchData);
    setNewProduct(defaultNewProduct);
    setIsShowAddProduct(false);
    if (action === "EDIT") {
      var _dataModalProduct = _.cloneDeep(dataModalProduct);
      var data = productInventories.find(
        (o) => o.productId == dataModalProduct.productId
      );
      setListProductBatches(data?.listInventories);
      var p = data?.listInventories.find(
        (o) => o.productBatchProductId == dataModalProduct.productBatchProductId
      );
      setProductBatchProduct(p);
      setNewProduct(_dataModalProduct);
    }
  }, [show]);
  const handleCloseModal = () => {
    handleClose();
  };
  useEffect(() => {
    setNewProduct(defaultNewProduct);
  }, [isShowAddProduct]);

  const handleOnChangeNewProduct = (value, name) => {
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(productData))
    let _newProduct = _.cloneDeep(newProduct);
    if (name === "productId") {
      var data = productInventories.find((o) => o.productId == value);
      setListProductBatches(data?.listInventories);
    }
    if (name === "productBatchProductId") {
      var p = listProductBatches.find((o) => o.productBatchProductId == value);
      setProductBatchProduct(p);
    }
    if (name === "productQuantity") {
      if (value > productBatchProduct.productQuantity) {
        value = productBatchProduct.productQuantity;
      }
    }
    _newProduct[name] = value;
    setNewProduct(_newProduct);
  };
  const handleAddNewProduct = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (action === "CREATE") {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      var url = process.env.REACT_APP_BASE_URL + `/output-info/products?outputInfoId=${outputInfo?.outputInfoId}`;
      await axios.post(url, newProduct, {
        headers: headers,
      });
    } else if (action === "EDIT") {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      var url = process.env.REACT_APP_BASE_URL + `/output-info/products?id=${dataModalProduct?.outputProductId}`;
      await axios.put(url, newProduct, {
        headers: headers,
      });
    }
    handleCloseModal();
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        className="modal-user"
        onHide={() => handleCloseModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="w-100 text-center"
          >
            {action === "CREATE" ? `Thêm sản phẩm` : `Chỉnh sửa sản phẩm`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <div className="col-4 form-group">
                <label>
                  Sản phẩm (<span className="text-danger">*</span>)
                </label>
                <select
                  className="form-control"
                  style={{ fontSize: 16, height: 48 }}
                  onChange={(event) =>
                    handleOnChangeNewProduct(event.target.value, "productId")
                  }
                  value={newProduct?.productId}
                >
                  <option defaultValue>Chọn sản phẩm</option>
                  {productList?.length > 0 &&
                    productList.map((product, index1) => {
                      console.log("productList", index1);
                      return (
                        <option value={+product?.productId} key={index1}>
                          {product?.productName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 form-group">
                <label>
                  Lô hàng (<span className="text-danger">*</span>)
                </label>
                <select
                  className="form-control"
                  style={{ fontSize: 16, height: 48 }}
                  onChange={(event) =>
                    handleOnChangeNewProduct(
                      event.target.value,
                      "productBatchProductId"
                    )
                  }
                  value={newProduct.productBatchProductId}
                >
                  <option defaultValue>Chọn lô hàng</option>
                  {listProductBatches?.length > 0 &&
                    listProductBatches.map((product, index) => {
                      var today = new Date();
                      var dateExpiry = new Date(product?.dateExpiry);

                      return (
                        <option
                          style={{color: dateExpiry > today && product.productQuantity > 0 ? 'Green' : 'LightCoral'}}
                          value={product?.productBatchProductId}
                          key={index} disabled={dateExpiry <= today || product.productQuantity <= 0}
                        >
                          {`Lô ${product?.productBatchId} - Mã ${product?.productBatchProductId} - Còn ${product?.productQuantity} sản phẩm`}
                        </option>
                      );

                    })}
                </select>
              </div>
              <div className="col-3 form-group">
                <label>
                  Nhập số lượng (<span className="text-danger">*</span>)
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={newProduct.productQuantity}
                  onChange={(event) =>
                    handleOnChangeNewProduct(
                      event.target.value,
                      "productQuantity"
                    )
                  }
                />
              </div>
            </div>
            <div style={{color: 'Green', fontSize: 12}}>
              (*) Còn hàng / còn hạn
            </div>
            <div style={{color: 'LightCoral', fontSize: 12}}>
              (*) Hết hàng / hết hạn
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              handleAddNewProduct();
            }}
          >
            {action === "CREATE" ? "Thêm" : "Lưu"}
          </Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProduct;

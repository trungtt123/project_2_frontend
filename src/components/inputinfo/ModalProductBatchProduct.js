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

import "react-datepicker/dist/react-datepicker.css";
const ModalProductBatchProduct = (props) => {
  const { productBatchId, dataModalProduct, handleClose, show, action } = props;
  const defaultNewProduct = {
    productId: null,
    dateExpiry: new Date(),
    productQuantity: 0,
  };
  console.log("check", productBatchId);
  const [productBatch, setProductBatch] = useState(defaultNewProduct);
  const { productList } = useSelector((state) => state.product);
  const [productBatchEdit, setProductBatchEdit] = useState({});
  const [isShowAddProduct, setIsShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState(defaultNewProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    let _productBatchData = _.cloneDeep(productBatch);
    setProductBatchEdit(_productBatchData);
  }, [productBatch]);
  useEffect(() => {
    let _productBatchData = _.cloneDeep(productBatch);
    setProductBatchEdit(_productBatchData);
    setNewProduct(defaultNewProduct);
    setIsShowAddProduct(false);
    if (action === "EDIT") {
      var _dataModalProduct = _.cloneDeep(dataModalProduct);
      _dataModalProduct.dateExpiry = new Date(dataModalProduct.dateExpiry);
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
    console.log("handle chage", name, value);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(productData))
    let _newProduct = _.cloneDeep(newProduct);
    _newProduct[name] = value;
    setNewProduct(_newProduct);
  };
  const handleAddNewProduct = async () => {
    if (action === "CREATE")
      await productBatchService.createProductBatchProduct({
        ...newProduct,
        productBatchId,
      });
    else if (action === "EDIT") {
      await productBatchService.updateProductBatchProduct({
        ...newProduct,
        productBatchId,
        id: dataModalProduct.id,
      });
    }
    handleCloseModal();
  };
  console.log(dataModalProduct);
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
            {action === "CREATE"
              ? `Thêm sản phẩm vào lô mã số ${productBatchId}`
              : `Chỉnh sửa sản phẩm trong lô mã số ${productBatchId}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <div className="col-4 form-group">
                <label>
                  Tên lô hàng (<span className="text-danger">*</span>)
                </label>
                <select
                  className="form-control"
                  style={{ fontSize: 16, height: 48 }}
                  onChange={(event) =>
                    handleOnChangeNewProduct(event.target.value, "productId")
                  }
                  value={newProduct.productId}
                >
                  <option defaultValue>Choose Product</option>
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
              <div className="col-3 form-group">
                <label>
                  Thời gian hết hạn (<span className="text-danger">*</span>)
                </label>
                <span className="form-control d-flex justify-content-between align-items-center p-0">
                  <DatePicker
                    id="datepicker"
                    className="border-0 m-0"
                    selected={newProduct.dateExpiry}
                    onChange={(date) =>
                      handleOnChangeNewProduct(date, "dateExpiry")
                    }
                  />
                  <label for="datepicker">
                    {" "}
                    <i className="fa fa-solid fa-calendar px-2" />
                  </label>
                </span>
              </div>
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
            {action === "CREATE" ? "Create" : "Save"}
          </Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProductBatchProduct;

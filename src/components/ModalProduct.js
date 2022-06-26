import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useSelector } from "react-redux";
import productService from "../Services/API/productService";

const ModalProduct = (props) => {
  const { action, dataModalProduct, handleClose, show } = props;
  const { productTypeList } = useSelector((state) => state.product);

  const defaultProductData = {
    productName: "",
    productOrigin: "",
    productSuplier: "",
    productTypeId: "",
    productUnit: "",
  };
  const defaultValidInput = {
    productName: true,
    productOrigin: true,
    productSuplier: true,
    productTypeId: true,
    productUnit: true,
  };
  const [productData, setProductData] = useState(defaultProductData);
  const [validInput, setValidInput] = useState(defaultValidInput);
  useEffect(() => {
    if (action === "EDIT") {
      const {
        productId,
        productName,
        productOrigin,
        productSuplier,
        productTypeId,
        productUnit,
      } = dataModalProduct;
      console.log("data<odal", dataModalProduct);
      setProductData({
        productId,
        productName,
        productOrigin,
        productSuplier,
        productTypeId,
        productUnit,
      });
    }
  }, [dataModalProduct, action]);
  const handleOnChangeInput = (value, name) => {
    console.log("handle chage", name, value);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(productData))
    let _productData = _.cloneDeep(productData);
    _productData[name] = value;
    setProductData(_productData);
  };
  const checkValidateInput = () => {
    setValidInput(defaultValidInput);
    let arr =
      action === "CREATE"
        ? [
            "productName",
            "productOrigin",
            "productSuplier",
            "productTypeId",
            "productUnit",
          ]
        : [
            "productName",
            "productOrigin",
            "productSuplier",
            "productTypeId",
            "productUnit",
          ];
    for (let i = 0; i < arr.length; i++) {
      if (!productData[arr[i]]) {
        let _validInput = _.cloneDeep(defaultValidInput);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        toast.error(`Empty input ${arr[i]}`);
        return false;
      }
    }
    return true;
  };
  const handleConfirmProduct = async () => {
    let check = checkValidateInput();
    if (!check) return;
    console.log("productData", productData);
    console.log("action nay", action);
    if (action === "CREATE") {
      await productService.createProduct(productData);
    } else if (action === "EDIT") {
      await productService.updateProduct(productData);
    }
    handleCloseModal();
    // :// update action
  };
  const handleCloseModal = () => {
    setValidInput(defaultValidInput);
    setProductData(defaultProductData);
    handleClose();
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
          <Modal.Title id="contained-modal-title-vcenter">
            {action === "CREATE" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Tên sản phẩm (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.productName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={productData.productName}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productName")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Xuất xứ (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.productOrigin
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={productData.productOrigin}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productOrigin")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Công ty sản xuất (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.productSuplier
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={productData.productSuplier}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productSuplier")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Đơn vị (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.productUnit
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={productData.productUnit}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productUnit")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Loại sản phẩm (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.productUnit
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={productData.productUnit}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productUnit")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Product Type (<span className="text-danger">*</span>)
              </label>
              <select
                style={{ fontSize: 16, height: 48 }}
                className={
                  validInput.productTypeId
                    ? "form-select my-2 form-select-lg"
                    : "form-select my-2 is-invalid form-select-lg"
                }
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productTypeId")
                }
                value={productData.productTypeId}
              >
                <option defaultValue>Chọn loại sản phẩm</option>
                {productTypeList?.length > 0 &&
                  productTypeList.map((item, index) => {
                    console.log("productTypeList", item?.productTypeId);
                    return (
                      <option value={+item?.productTypeId} key={index}>
                        {item?.productTypeName}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="warning" onClick={() => handleConfirmProduct()}>
            {action === "CREATE" ? "Thêm sản phẩm" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProduct;

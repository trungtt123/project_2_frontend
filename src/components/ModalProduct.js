import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useSelector } from "react-redux";
import productService from "../Services/API/productService";
const ModalProduct = (props) => {
  const { action, dataModalProduct, handleClose, show } = props;
  const { roleList } = useSelector((state) => state.privilege);
  const defaultProductData = {
    productId: "", 
    productName: "", 
    Orgin: "", 
    companySuplier: "", 
    typeId: "", 
    productUnit: "",
  };
  const defaultValidInput = {
    
    productName: true, 
    Orgin: true, 
    companySuplier: true, 
    typeId: true, 
    productUnit: true,
  };
  const [productData, setProductData] = useState(defaultProductData);
  const [validInput, setValidInput] = useState(defaultValidInput);
  useEffect(() => {
    if (action === "EDIT") {
      const { productId, productName, productOrgin, productSuplier, productTypeId, productUnit } =
        dataModalProduct;
      console.log("data<odal", dataModalProduct);
      setProductData({
        productId: productId, 
        productName: productName, 
        Orgin: productOrgin, 
        companySuplier: productSuplier, 
        typeId: productTypeId, 
        productUnit: productUnit,
      });
    }
  }, [dataModalProduct, action]);
  const handleOnChangeInput = (value, name) => {
    console.log("handle chage", name, value);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(userData))
    let _productData = _.cloneDeep(productData);
    _productData[name] = value;
    setProductData(_productData);
  };
  const checkValidateInput = () => {
    setValidInput(defaultValidInput);
    let arr =
      action === "CREATE"
        ? ["productId", "productName", "Orgin", "companySuplier", "typeId", "productUnit"]
        : ["productId", "productName", "Orgin", "companySuplier", "typeId", "productUnit"];
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
        className="modal-product"
        onHide={() => handleCloseModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {action === "CREATE" ? "Create new product" : "Edit a product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Product (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.productId
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={productData.productId}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productId")
                }
              />
            </div>
            {/* <div className="col-12 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label>
                    Password 123(<span className="text-danger">*</span>)
                  </label>
                  <input
                    type="password"
                    className={
                      validInput.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    value={userData.password}
                    onChange={(event) =>
                      handleOnChangeInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div> */}
            <div className="col-12 col-sm-6 form-group">
              <label>
                Product name (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.firstName
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
                Product Orgin (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.lastName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={productData.Orgin}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "Orgin")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Product Suplier (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.email ? "form-control" : "form-control is-invalid"
                }
                value={productData.productSuplier}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "companySuplier")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Product Type ID (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.email ? "form-control" : "form-control is-invalid"
                }
                value={productData.productTypeId}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "typeId")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group" >
              <label>
                Product Unit (<span className="text-danger">*</span>)
              </label>
              <select  style={{fontSize: 16, height: 48}}
                className={
                  validInput.role
                    ? "form-select my-2 form-select-lg"
                    : "form-select my-2 is-invalid form-select-lg"
                }
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productUnit")
                }
                value={productData.role}
              >
                <option defaultValue>Choose Unit</option>
                {roleList?.length > 0 &&
                  roleList.map((item, index) => {
                    console.log("roleId", item?.roleID);
                    return (
                      <option value={+item?.roleID} key={index}>
                        {item?.roleName}
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
            {action === "CREATE" ? "Create product" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProduct;

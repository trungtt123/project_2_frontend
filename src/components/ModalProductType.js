import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useSelector } from "react-redux";
import productTypeService from "../Services/API/productTypeService";
const ModalproductType = (props) => {
  const { action, dataModalproductType, handleClose, show } = props;
  console.log("props", props);
  const { roleList } = useSelector((state) => state.privilege);
  const defaultproductTypeData = {
    productTypename: "",
  };
  const defaultValidInput = {
    productTypename: true,
  };
  const [productTypeData, setproductTypeData] = useState(
    defaultproductTypeData
  );
  const [validInput, setValidInput] = useState(defaultValidInput);
  useEffect(() => {
    if (action === "EDIT") {
      const { productTypeId, productTypeName } = dataModalproductType;
      console.log("data<odal", dataModalproductType);
      setproductTypeData({
        productTypeId: productTypeId,
        productTypename: productTypeName,
      });
    }
  }, [dataModalproductType, action]);
  const handleOnChangeInput = (value, name) => {
    console.log("handle chage", name, value);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(productTypeData))
    let _productTypeData = _.cloneDeep(productTypeData);
    _productTypeData[name] = value;
    setproductTypeData(_productTypeData);
  };
  const checkValidateInput = () => {
    setValidInput(defaultValidInput);
    let arr = action === "CREATE" ? ["productTypename"] : ["productTypename"];
    for (let i = 0; i < arr.length; i++) {
      if (!productTypeData[arr[i]]) {
        let _validInput = _.cloneDeep(defaultValidInput);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        toast.error(`Empty input ${arr[i]}`);
        return false;
      }
    }
    return true;
  };
  const handleConfirmproductType = async () => {
    let check = checkValidateInput();
    if (!check) return;
    console.log("productTypeData", productTypeData);
    console.log("action nay", action);
    console.log("acction", action);
    if (action === "CREATE") {
      await productTypeService.createproductType(productTypeData);
    } else if (action === "EDIT") {
      await productTypeService.updateproductType(productTypeData);
    }
    handleCloseModal();
    // :// update action
  };
  const handleCloseModal = () => {
    setValidInput(defaultValidInput);
    setproductTypeData(defaultproductTypeData);
    handleClose();
  };
  return (
    <>
      <Modal
        size="lg"
        show={show}
        className="modal-productType"
        onHide={() => handleCloseModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {action === "CREATE"
              ? "Create new productType"
              : "Edit a productType"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                productTypename (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.productTypename
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={productTypeData.productTypename}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productTypename")
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
                    value={productTypeData.password}
                    onChange={(event) =>
                      handleOnChangeInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="warning" onClick={() => handleConfirmproductType()}>
            {action === "CREATE" ? "Create productType" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalproductType;

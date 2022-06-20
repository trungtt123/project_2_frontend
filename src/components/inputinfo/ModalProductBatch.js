import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useSelector } from "react-redux";
import productService from "../../Services/API/productService";
import axios from "axios";
const ModalProductBatch = (props) => {
  const { action, dataModalProductBatch, inputInfo, handleClose, show } = props;
  const { roleList } = useSelector((state) => state.privilege);
  const defaultProductBatchData = {
    productBatchId: "",
    productBatchName: "",
    inputInfoId: inputInfo?.inputInfoId,
  };
  const defaultValidInput = {
    productBatchName: true,
  };
  const [productBatchData, setProductBatchData] = useState(
    defaultProductBatchData
  );
  const [validInput, setValidInput] = useState(defaultValidInput);
  useEffect(() => {
    if (action === "EDIT") {
      const { productBatchId, productBatchName } = dataModalProductBatch;
      console.log("data<odal", dataModalProductBatch);
      setProductBatchData({
        productBatchId: productBatchId,
        productBatchName: productBatchName,
      });
    }
  }, [dataModalProductBatch, action]);
  const handleOnChangeInput = (value, name) => {
    console.log("handle chage", name, value);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(userData))
    let _productBatchData = _.cloneDeep(productBatchData);
    _productBatchData[name] = value;
    setProductBatchData(_productBatchData);
  };
  const checkValidateInput = () => {
    setValidInput(defaultValidInput);
    let arr = ["productBatchName"];

    for (let i = 0; i < arr.length; i++) {
      if (!productBatchData[arr[i]]) {
        let _validInput = _.cloneDeep(defaultValidInput);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        console.log(_validInput);
        toast.error(`Empty input ${arr[i]}`);
        return false;
      }
    }
    return true;
  };
  const handleConfirmProduct = async () => {
    let check = checkValidateInput();
    if (!check) return;
    console.log("productBatchData", productBatchData);
    console.log("action nay", action);
    if (action === "CREATE") {
      //await productService.createProduct(productData);
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      console.log(productBatchData);
      var url = `https://localhost:7092/api/v1/product-batch`;
      await axios.post(url, productBatchData, {
        headers: headers,
      });
    } else if (action === "EDIT") {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      console.log(productBatchData);
      var url = `https://localhost:7092/api/v1/product-batch?productBatchId=${productBatchData.productBatchId}`;
      await axios.put(url, productBatchData, {
        headers: headers,
      });
    }
    handleCloseModal();
    // :// update action
  };
  const handleCloseModal = () => {
    setValidInput(defaultValidInput);
    setProductBatchData(defaultProductBatchData);
    handleClose();
  };
  console.log(validInput);
  return (
    <>
      <Modal
        size="lg"
        show={show}
        className="modal-product"
        onHide={() => handleCloseModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="w-100 text-center"
          >
            {action === "CREATE"
              ? "Thêm lô hàng"
              : `Chỉnh sửa lô hàng mã ${productBatchData.productBatchName}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Mã lô hàng (<span className="text-danger">*</span>)
              </label>
              
              <input
                type="text"
                className={
                  validInput.productBatchName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Nhập mã lô hàng . . ."
                value={productBatchData.productBatchName}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "productBatchName")
                }
              />
            </div>
            <small style={{fontSize: 12}}><i>Ví dụ: Hxxxxx</i></small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="warning" onClick={() => handleConfirmProduct()}>
            {action === "CREATE" ? "Create" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProductBatch;

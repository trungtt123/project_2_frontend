import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useSelector } from "react-redux";
import userService from "../../Services/API/userService";
import axios from "axios";
const ModalInputInfo = (props) => {
  const { action, dataModalInputInfo, handleClose, show } = props;
  const { roleList } = useSelector((state) => state.privilege);
  // const
  const defaultInputInfoData = {
    inputInfoId: "",
    inputInfoName: "",
    shipper: "",
    receiverUserId: localStorage.getItem("userId"), // la nguoi tao trang nhung hien tai dang bug verify token
  };
  const defaultValidInput = {
    inputInfoName: true,
    shipper: true,
    receiverUserId: true,
  };
  const [inputInfoData, setInputInfoData] = useState(defaultInputInfoData);
  const [validInput, setValidInput] = useState(defaultValidInput);
  useEffect(() => {
    if (action === "EDIT") {
      const { inputInfoId, inputInfoName, shipper } = dataModalInputInfo;
      console.log("data<odal", dataModalInputInfo);
      setInputInfoData({
        inputInfoId: inputInfoId,
        inputInfoName: inputInfoName,
        shipper: shipper,
        receiverUserId: localStorage.getItem("userId"),
      });
    }
  }, [dataModalInputInfo, action]);
  const handleOnChangeInput = (value, name) => {
    console.log("handle chage", name, value);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(userData))
    let _inputInfoData = _.cloneDeep(inputInfoData);
    _inputInfoData[name] = value;
    setInputInfoData(_inputInfoData);
  };
  const checkValidateInput = () => {
    setValidInput(defaultValidInput);
    let arr = ["inputInfoName", "shipper"];

    for (let i = 0; i < arr.length; i++) {
      if (!inputInfoData[arr[i]]) {
        let _validInput = _.cloneDeep(defaultValidInput);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        toast.error(`Empty input ${arr[i]}`);
        return false;
      }
    }
    return true;
  };
  const handleConfirmUser = async () => {
    let check = checkValidateInput();
    if (!check) return;
    console.log(action);
    if (action === "CREATE") {
      //await userService.createUser(userData);
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      var url = "https://localhost:7092/api/v1/input-info";
      await axios.post(url, inputInfoData, {
        headers: headers,
      });
    } else if (action === "EDIT") {
      //await userService.updateUser(userData);
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      var url = `https://localhost:7092/api/v1/input-info?inputInfoId=${dataModalInputInfo.inputInfoId}`;
      await axios.put(url, inputInfoData, {
        headers: headers,
      });
      // .then((res) => {
      //     console.log("ABCXYZ");
      // })
      // .catch((error) => console.log(error));
    }
    handleCloseModal();
    // :// update action
  };
  const handleCloseModal = () => {
    setValidInput(defaultValidInput);
    setInputInfoData(defaultInputInfoData);
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
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="w-100 text-center"
          >
            {action === "CREATE"
              ? "Tạo bản ghi nhập hàng"
              : `Chỉnh sửa bản ghi nhập hàng`}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Tên bản ghi (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.inputInfoName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={inputInfoData.inputInfoName}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "inputInfoName")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Người giao hàng (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.shipper
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={inputInfoData.shipper}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "shipper")
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="warning" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? "Create" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalInputInfo;

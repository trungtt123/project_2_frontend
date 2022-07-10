import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useSelector } from "react-redux";
import userService from "../../Services/API/userService";
import axios from "axios";
const ModalOutputInfo = (props) => {
  const { action, dataModalOutputInfo, handleClose, show } = props;
  const { userList } = useSelector((state) => state.user);
  console.log(dataModalOutputInfo);
  const defaultOutputInfoData = {
    outputInfoId: "",
    outputInfoName: "",
    pickerId: 0,
    signatorId: localStorage.getItem("userId"), // la nguoi tao trang nhung hien tai dang bug verify token
  };
  const defaultValidInput = {
    outputInfoName: true,
    pickerId: true,
  };
  const [outputInfoData, setOutputInfoData] = useState(defaultOutputInfoData);
  const [validInput, setValidInput] = useState(defaultValidInput);
  useEffect(() => {
    if (action === "EDIT") {
      const { outputInfoId, outputInfoName, pickerId, signatorId } =
        dataModalOutputInfo;
      console.log("data<odal", dataModalOutputInfo);
      setOutputInfoData({
        outputInfoId: outputInfoId,
        outputInfoName: outputInfoName,
        pickerId: pickerId,
        signatorId: localStorage.getItem("userId"),
      });
    }
  }, [dataModalOutputInfo, action]);
  const handleOnChangeInput = (value, name) => {
    console.log("handle chage", name, value);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(userData))
    let _outputInfoData = _.cloneDeep(outputInfoData);
    _outputInfoData[name] = value;
    setOutputInfoData(_outputInfoData);
  };
  const checkValidateInput = () => {
    setValidInput(defaultValidInput);
    let arr = ["outputInfoName", "pickerId"];

    for (let i = 0; i < arr.length; i++) {
      if (!outputInfoData[arr[i]]) {
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
      var url = "REACT_APP_BASE_URL/output-info";
      await axios.post(url, outputInfoData, {
        headers: headers,
      });
    } else if (action === "EDIT") {
      //await userService.updateUser(userData);
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      var url = process.env.REACT_APP_BASE_URL + `/output-info?outputInfoId=${dataModalOutputInfo.outputInfoId}`;
      await axios.put(url, outputInfoData, {
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
    setOutputInfoData(defaultOutputInfoData);
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
              ? "Tạo bản ghi xuất hàng"
              : `Chỉnh sửa bản ghi xuất hàng`}
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
                  validInput.outputInfoName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={outputInfoData.outputInfoName}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "outputInfoName")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Người lấy hàng (<span className="text-danger">*</span>)
              </label>
              <select
                style={{ fontSize: 16, height: 48 }}
                className={
                  validInput.pickerId
                    ? "form-select my-2 form-select-lg"
                    : "form-select my-2 is-invalid form-select-lg"
                }
                value={outputInfoData?.pickerId}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "pickerId")
                }
              >
                <option defaultValue>Chọn người lấy hàng</option>
                {userList?.length > 0 &&
                  userList.map((item, index) => {
                    console.log(item);
                    return (
                      <option value={+item?.userId} key={index}>
                        {item?.surName +
                          " " +
                          item?.givenName +
                          ` (ID: ${item?.userId}) `}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="warning" onClick={() => handleConfirmUser()}>
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

export default ModalOutputInfo;

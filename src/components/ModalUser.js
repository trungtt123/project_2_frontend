import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useSelector } from "react-redux";
import userService from "../Services/API/userService";
const ModalUser = (props) => {
  const { action, dataModalUser, handleClose, show } = props;
  const { roleList } = useSelector((state) => state.privilege);
  const defaultUserData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  };
  const defaultValidInput = {
    username: true,
    password: true,
    firstName: true,
    lastName: true,
    email: true,
    role: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInput, setValidInput] = useState(defaultValidInput);
  useEffect(() => {
    if (action === "EDIT") {
      const { userId, userName, givenName, surName, email, roleId } =
        dataModalUser;
      console.log("data<odal", dataModalUser);
      setUserData({
        userId: userId,
        username: userName,
        firstName: givenName,
        lastName: surName,
        email: email,
        role: roleId,
      });
    }
  }, [dataModalUser, action]);
  const handleOnChangeInput = (value, name) => {
    console.log("handle chage", name, value);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(userData))
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  const checkValidateInput = () => {
    setValidInput(defaultValidInput);
    let arr =
      action === "CREATE"
        ? ["username", "password", "firstName", "lastName", "email", "role"]
        : ["username", "firstName", "lastName", "email", "role"];
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
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
    console.log("userData", userData);
    console.log("action nay", action);
    if (action === "CREATE") {
      await userService.createUser(userData);
    } else if (action === "EDIT") {
      await userService.updateUser(userData);
    }
    handleCloseModal();
    // :// update action
  };
  const handleCloseModal = () => {
    setValidInput(defaultValidInput);
    setUserData(defaultUserData);
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
            {action === "CREATE" ? "Create new user" : "Edit a user"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Username (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.username
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={userData.username}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "username")
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
                First name (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.firstName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={userData.firstName}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "firstName")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Last name (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.lastName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={userData.lastName}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "lastName")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.email ? "form-control" : "form-control is-invalid"
                }
                value={userData.email}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "email")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group" >
              <label>
                Role (<span className="text-danger">*</span>)
              </label>
              <select  style={{fontSize: 16, height: 48}}
                className={
                  validInput.role
                    ? "form-select my-2 form-select-lg"
                    : "form-select my-2 is-invalid form-select-lg"
                }
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "role")
                }
                value={userData.role}
              >
                <option defaultValue>Choose Role</option>
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
          <Button variant="warning" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? "Create user" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;

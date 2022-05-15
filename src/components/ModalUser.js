import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
const ModalUser = (props) => {
  const { action, dataModalUser, handleClose, show } = props;
  const defaultUserData = {
    phone: "",
    username: "",
    password: "",
    address: "",
    role: "",
  };
  const defaultValidInput = {
    phone: true,
    username: true,
    password: true,
    address: true,
    role: true,
  };
  const [userRoles, setUserRoles] = useState([]);
  const [userData, setUserData] = useState(defaultUserData);
  const [validInput, setValidInput] = useState(defaultValidInput);
  useEffect(() => {
    getRoles();
  }, []);
  // Lưu ý tk modal đã được gắn vào cây dom và mount 1 lần =>componetDidUpdate
  useEffect(() => {
    if (action === "EDIT") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser, action]);
  const getRoles = async () => {};
  const handleOnChangeInput = (value, name) => {
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(userData))
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  const checkValidateInput = () => {
    setValidInput(defaultValidInput);
    let arr =
      action === "CREATE"
        ? ["password", "phone", "username", "role"]
        : ["phone", "username", "role"];
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
    let res = action === "CREATE";
    // ? //create action
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
            <div className="col-12 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label>
                    Password (<span className="text-danger">*</span>)
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
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.phone ? "form-control" : "form-control is-invalid"
                }
                value={userData.phone}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "phone")
                }
                disabled={action === "CREATE" ? false : true}
              />
            </div>

            <div className="col-12 form-group">
              <label>
                Address (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                className={
                  validInput.address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={userData.address}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Role (<span className="text-danger">*</span>)
              </label>
              <select
                className={
                  validInput.sex ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "role")
                }
                value={userData.role}
              >
                <option defaultValue>Choose Role</option>
                <option value="Admin">Admin</option>
                <option value="Stockeeper">Stockeeper</option>
                <option value="Manager">Manager</option>
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

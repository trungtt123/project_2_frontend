import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import productTypeService from "../Services/API/productTypeService";

const ModalNewType = (props) => {
  const { handleClose, show } = props;

  const [typeDataName, setTypeDataName] = useState();
  const handleConfirmType = async () => {
    await productTypeService.createProductType(typeDataName);
    handleClose();
    return;
  };
  return (
    <>
      <Modal
        size="lg"
        show={show}
        className="modal-user"
        onHide={() => handleClose()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thêm loại sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Tên loại sản phẩm (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                value={typeDataName}
                onChange={(event) => setTypeDataName(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Đóng
          </Button>
          <Button variant="warning" onClick={() => handleConfirmType()}>
            Thêm loại sản phẩm{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalNewType;
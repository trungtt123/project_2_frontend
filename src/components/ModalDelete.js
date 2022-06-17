import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const ModalDelete = (props) => {
  //console.log(props.userData);

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, bạn muốn xóa sản phẩm này: &nbsp;
          {props.deleteName} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={props.confirmDelete}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;

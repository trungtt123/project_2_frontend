import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const ModalDeleteUser = (props) => {
  const {
    userData: { username, email },
    handleClose,
    confirmDelete,
  } = props;
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, bạn muốn xóa người dùng&nbsp; {username} có email {email} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;

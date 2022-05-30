import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const ModalDelete = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, are you sure to delete this product:
          {props.deleteName} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;

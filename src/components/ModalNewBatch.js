import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import productBatchService from "../Services/API/productBatchService";

const ModalNewBatch = (props) => {
  const { handleClose, show } = props;

  const [batchDataName, setBatchDataName] = useState();
  const handleConfirmBatch = async () => {
    await productBatchService.createProductBatch(batchDataName);
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
            Create new product batch
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Batch name (<span className="text-danger">*</span>)
              </label>
              <input
                type="text"
                value={batchDataName}
                onChange={(event) => setBatchDataName(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="warning" onClick={() => handleConfirmBatch()}>
            Create product batch
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalNewBatch;

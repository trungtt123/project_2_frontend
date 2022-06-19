import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import productBatchService from "../Services/API/productBatchService";
import { getProductBatch } from "../Redux/productBatchSlice";
import { fetchAllProducts } from "../Redux/productSlice";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const ModalProductBatch = (props) => {
  const { productBatchId, handleClose, show } = props;
  const defaultNewProduct = {
    productId: null,
    dateExpiry: new Date(),
    productQuantity: 0,
  };
  console.log("check", productBatchId);
  const { productBatch } = useSelector((state) => state.productBatch);
  const { productList } = useSelector((state) => state.product);
  const [productBatchEdit, setProductBatchEdit] = useState({});
  const [isShowAddProduct, setIsShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState(defaultNewProduct);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductBatch(productBatchId));
    dispatch(fetchAllProducts());
  }, [productBatchId]);
  useEffect(() => {
    let _productBatchData = _.cloneDeep(productBatch);
    setProductBatchEdit(_productBatchData);
  }, [productBatch]);
  useEffect(() => {
    let _productBatchData = _.cloneDeep(productBatch);
    dispatch(getProductBatch(productBatchId));
    setProductBatchEdit(_productBatchData);
    setNewProduct(defaultNewProduct);
    setIsShowAddProduct(false);
  }, [show]);
  const handleCloseModal = () => {
    handleClose();
  };
  useEffect(() => {
    setNewProduct(defaultNewProduct);
  }, [isShowAddProduct]);
  const updateProductBatchProduct = async (index) => {
    await productBatchService.updateProductBatchProduct({
      productBatchId,
      productBatchName: productBatchEdit.productBatchName,
      ...productBatchEdit.listProducts[index],
    });
  };
  const deleteProductBatchProduct = async (index) => {
    await productBatchService.deleteProductBatchProduct(
      productBatchId,
      productBatchEdit.listProducts[index].productId
    );
  };
  const handleOnChangeInput = (value, name, index) => {
    console.log("handle chage", name, value, index);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(productData))
    let _productBatchData = _.cloneDeep(productBatchEdit);
    console.log("chjec goc", _productBatchData);
    _productBatchData.listProducts[index][name] = value;
    setProductBatchEdit(_productBatchData);
  };
  const handleOnChangeNewProduct = (value, name) => {
    console.log("handle chage", name, value);
    //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(productData))
    let _newProduct = _.cloneDeep(newProduct);
    _newProduct[name] = value;
    setNewProduct(_newProduct);
  };
  const handleAddNewProduct = async () => {
    return await productBatchService.createProductBatchProduct({
      ...newProduct,
      productBatchId,
    });
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
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div>
              <span className="fw-bold">Product batch's name: </span>{" "}
              {productBatch.productBatchName}
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Product : </span>
              <button
                className="btn btn-primary d-flex align-content-center"
                onClick={() => setIsShowAddProduct(true)}
              >
                <i className="fa fa-plus-circle pe-2 fs-4" /> Add new product
              </button>
            </div>
            {isShowAddProduct && (
              <div className="col-12 border-top border-bottom border-secondary my-5 d-flex justify-content-between align-items-center">
                <div className="col-3 form-group">
                  <select
                    className="form-control"
                    style={{ fontSize: 16, height: 48 }}
                    onChange={(event) =>
                      handleOnChangeNewProduct(event.target.value, "productId")
                    }
                    value={newProduct.productId}
                  >
                    <option defaultValue>Choose Product</option>
                    {productList?.length > 0 &&
                      productList.map((product, index1) => {
                        console.log("productList", index1);
                        return (
                          <option value={+product?.productId} key={index1}>
                            {product?.productName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3 form-group">
                  <input
                    className="form-control"
                    type="text"
                    value={newProduct.productQuantity}
                    onChange={(event) =>
                      handleOnChangeNewProduct(
                        event.target.value,
                        "productQuantity"
                      )
                    }
                  />
                </div>
                <div className="col-3 form-group">
                  <span className="form-control d-flex justify-content-between align-items-center p-0">
                    <DatePicker
                      id="datepicker"
                      className="border-0 m-0"
                      selected={newProduct.dateExpiry}
                      onChange={(date) =>
                        handleOnChangeNewProduct(date, "dateExpiry")
                      }
                    />
                    <label for="datepicker">
                      {" "}
                      <i className="fa fa-solid fa-calendar px-2" />
                    </label>
                  </span>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => setIsShowAddProduct(false)}
                >
                  <i className="fa fa-solid fa-rotate-left" />
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddNewProduct()}
                >
                  <i className="fa fa-plus-circle" />
                </button>
              </div>
            )}
            <div className="col-12">
              {productBatchEdit?.listProducts?.length > 0 &&
                productBatchEdit.listProducts.map((item, index) => {
                  return (
                    <div className="d-flex justify-content-between align-items-center my-3">
                      <span>{index + 1}. </span>
                      <select
                        className="col-3 "
                        style={{ fontSize: 16, height: 48 }}
                        onChange={(event) =>
                          handleOnChangeInput(
                            event.target.value,
                            "productId",
                            index
                          )
                        }
                        value={item.productId}
                      >
                        <option defaultValue>Choose Product</option>
                        {productList?.length > 0 &&
                          productList.map((product, index1) => {
                            console.log("productList", index1);
                            return (
                              <option value={+product?.productId} key={index1}>
                                {product?.productName}
                              </option>
                            );
                          })}
                      </select>
                      <div className="col-3 form-group">
                        <input
                          className="form-control"
                          type="text"
                          value={item.productQuantity}
                          onChange={(event) =>
                            handleOnChangeInput(
                              event.target.value,
                              "productQuantity",
                              index
                            )
                          }
                        />
                      </div>
                      <div className="col-3 form-group">
                        <span className="form-control d-flex justify-content-between align-items-center p-0">
                          <DatePicker
                            id="datepicker"
                            className="border-0 m-0"
                            selected={new Date(item.dateExpiry)}
                            onChange={(date) =>
                              handleOnChangeInput(
                                new Date(date),
                                "dateExpiry",
                                index
                              )
                            }
                          />
                          <label for="datepicker">
                            {" "}
                            <i className="fa fa-solid fa-calendar px-2" />
                          </label>
                        </span>
                      </div>
                      {/* <span className="col-5">{item.dateExpiry}</span> */}
                      <button
                        className="btn btn-primary"
                        onClick={() => updateProductBatchProduct(index)}
                      >
                        <i className="fa fa-pencil pe-2 fs-6" />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProductBatchProduct(index)}
                      >
                        <i className="fa fa-trash-o pe-2 fs-6" />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          {/* <Button variant="warning" onClick={() => handleConfirmProduct()}>
            {action === "CREATE" ? "Create user" : "Save"}
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProductBatch;

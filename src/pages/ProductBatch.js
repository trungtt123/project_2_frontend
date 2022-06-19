import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProductBatches } from "../Redux/productBatchSlice";
import { fetchAllProducts } from "../Redux/productSlice";
import "./DashBoard.css";
import _ from "lodash";
import ModalDelete from "../components/ModalDelete";
import ModalProductBatch from "../components/ModalProductBatch";
import productBatchService from "../Services/API/productBatchService";
import ModalNewBatch from "../components/ModalNewBatch";
const ProductBatchPage = () => {
  const dispatch = useDispatch();
  const { productBatchList } = useSelector((state) => state.productBatch);
  const { productList } = useSelector((state) => state.product);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalNewBatch, setIsShowModalNewBatch] = useState(false);
  const [isShowModalProductBatch, setIsShowModalProductBatch] = useState(false);
  // const [checkList, setCheckList] = useState([]);
  const productBatchData = useRef({});
  useEffect(() => {
    dispatch(getListProductBatches());
    dispatch(fetchAllProducts());
  }, []);
  const handleDeleteProductBatch = async ({
    productBatchId,
    productBatchName,
  }) => {
    productBatchData.current = { productBatchId, productBatchName };
    setIsShowModalDelete(true);
  };
  const handleDetailProductBatch = (item) => {
    productBatchData.current = _.cloneDeep(item);
    setIsShowModalProductBatch(true);
    dispatch(getListProductBatches());
  };
  const handleCreateProductBatch = () => {
    setIsShowModalProductBatch(true);
  };
  const handleClose = async () => {
    setIsShowModalProductBatch(false);
    setIsShowModalDelete(false);
    setIsShowModalNewBatch(false);
    dispatch(getListProductBatches());
  };
  const confirmDeleteProductBatch = async () => {
    console.log("Delete", productBatchData.current.productBatchId);
    await productBatchService.deleteProductBatch(
      productBatchData.current.productBatchId
    );
    setIsShowModalDelete(false);
  };
  const handleChecked = async (isChecked, userId) => {};
  console.log("update", productBatchList);
  return (
    <>
      <div className="container manage-user-container">
        <div className="user-header d-flex justify-content-between mt-4 mb-5">
          <div className="title d-flex align-items-center ">
            <h1>Manage Product Batch</h1>
          </div>
          <div className="actions d-flex gap-3 p-2">
            <button
              className="btn btn-success d-flex align-content-center"
              onClick={() => dispatch(getListProductBatches())}
            >
              <i className="fa fa-refresh pe-2 fs-4" />
              Refresh
            </button>
            <button
              className="btn btn-primary d-flex align-content-center"
              onClick={() => setIsShowModalNewBatch(true)}
            >
              <i className="fa fa-plus-circle pe-2 fs-4" /> Add new
              product-batch
            </button>
          </div>
        </div>
        <div className="user-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">ID</th>
                <th scope="col">ProductBatchName</th>
                <th scope="col">input Info Id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productBatchList?.length > 0 ? (
                <>
                  {productBatchList.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <td>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                              defaultChecked="false"
                              onChange={(e) =>
                                handleChecked(e.target.value, item?.userId)
                              }
                            />
                          </div>
                        </td>
                        <td>{item?.productBatchId}</td>
                        <td>{item?.productBatchName}</td>
                        <td
                          style={{ padding: "0" }}
                          className="flex align-items-center"
                        >
                          {item?.inputInfoId}
                        </td>
                        <td className="">
                          <button
                            className="btn btn-warning mx-2"
                            onClick={() => handleDetailProductBatch(item)}
                          >
                            <i className="fa fa-pencil pe-2 fs-6" />
                            Detail
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteProductBatch(item)}
                          >
                            <i className="fa fa-trash-o pe-2 fs-6" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td>Not found users</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        deleteName={productBatchData.current.productBatchName}
        handleClose={handleClose}
        confirmDelete={confirmDeleteProductBatch}
      />
      <ModalProductBatch
        show={isShowModalProductBatch}
        handleClose={handleClose}
        productBatchId={productBatchData.current.productBatchId}
      />
      <ModalNewBatch show={isShowModalNewBatch} handleClose={handleClose} />
    </>
  );
};
export default ProductBatchPage;

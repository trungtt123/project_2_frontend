import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProductTypes } from "../Redux/productTypeSlice";
import { fetchAllProducts } from "../Redux/productSlice";
import "./DashBoard.css";
import _ from "lodash";
import ModalDelete from "../components/ModalDelete";
import ModalProductType from "../components/ModalProductType";
import productTypeService from "../Services/API/productTypeService";
import ModalNewType from "../components/ModalNewType";
const ProductTypePage = () => {
  const dispatch = useDispatch();
  const { productTypeList } = useSelector((state) => state.productTypes);
  const { productList } = useSelector((state) => state.product);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalNewType, setIsShowModalNewType] = useState(false);
  const [isShowModalProductType, setIsShowModalProductType] = useState(false);
  // const [checkList, setCheckList] = useState([]);
  const productTypeData = useRef({});
  useEffect(() => {
    dispatch(getListProductTypes());
    //dispatch(fetchAllProducts());
  }, []);
  const handleDeleteProductType = async ({
    productTypeId,
    productTypeName,
  }) => {
    productTypeData.current = { productTypeId, productTypeName };
    //setIsShowModalDelete(true)
    if (
      window.confirm(
        `Bạn có chắc chắn xóa loại sản phẩm ${productTypeName}`
      ) == false
    ) {
      return;
    };
    await productTypeService.deleteProductType(productTypeId);
    dispatch(getListProductTypes());
  };
  const handleDetailProductType = (item) => {
    productTypeData.current = _.cloneDeep(item);
    setIsShowModalProductType(true);
    dispatch(getListProductTypes());
  };
  const handleEditProductType = (item) => {
    productTypeData.current = _.cloneDeep(item);
    setIsShowModalProductType(true);
    // setAction("EDIT");
  };
  const handleCreateProductType = () => {
    setIsShowModalProductType(true);
  };
  const handleClose = async () => {
    setIsShowModalProductType(false);
    setIsShowModalDelete(false);
    setIsShowModalNewType(false);
    dispatch(getListProductTypes());
  };
  const confirmDeleteProductType = async () => {
    console.log("Delete", productTypeData.current.productTypeId);
    await productTypeService.deleteProductType(
      productTypeData.current.productTypeId
    );
    setIsShowModalDelete(false);
  };
  const handleChecked = async (isChecked, userId) => {};
  console.log("update", productTypeList);
  return (
    <>
      <div className="container manage-user-container">
        <div className="user-header d-flex justify-content-between mt-4 mb-5">
          <div className="title d-flex align-items-center ">
            <h1>Trang quản lý loại sản phẩm</h1>
          </div>
          <div className="actions d-flex gap-3 p-2">
            {/* <button
              className="btn btn-success d-flex align-content-center"
              onClick={() => dispatch(getListProductTypes())}
            >
              <i className="fa fa-refresh pe-2 fs-4" />
              Tải lại trang
            </button> */}
            <button
              className="btn btn-primary d-flex align-content-center"
              onClick={() => setIsShowModalNewType(true)}
            >
              <i className="fa fa-plus-circle pe-2 fs-4" /> Thêm loại sản phẩm
            </button>
          </div>
        </div>
        <div className="user-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {/* <th scope="col">Chọn</th> */}
                <th scope="col">ID</th>
                <th scope="col">Tên loại sản phẩm</th>

                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {productTypeList?.length > 0 ? (
                <>
                  {productTypeList.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        {/* <td>
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customCheck1"
                              defaultChecked="false"
                              onChange={(e) =>
                                handleChecked(e.target.value, item?.userId)
                              }
                            />
                          </div>
                        </td> */}
                        <td>{item?.productTypeId}</td>
                        <td>{item?.productTypeName}</td>

                        <td className="">
                          <button
                            className="btn btn-warning mx-2"
                            onClick={() => handleEditProductType(item)}
                          >
                            <i className="fa fa-pencil pe-2 fs-6" />
                            Chỉnh sửa
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteProductType(item)}
                          >
                            <i className="fa fa-trash-o pe-2 fs-6" />
                            Xóa
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
        deleteName={productTypeData.current.productTypeName}
        handleClose={handleClose}
        confirmDelete={confirmDeleteProductType}
      />
      <ModalProductType
        action="EDIT"
        show={isShowModalProductType}
        handleClose={handleClose}
        dataModalproductType={productTypeData.current}
      />
      <ModalNewType show={isShowModalNewType} handleClose={handleClose} />
    </>
  );
};
export default ProductTypePage;

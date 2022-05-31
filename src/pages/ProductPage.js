import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../Redux/productSlice";
import { fetchRoleList } from "../Redux/privilegeSlice";
import "./DashBoard.css";
import _ from "lodash";
import ModalDelete from "../components/ModalDelete";
import ModalProduct from "../components/ModalProduct";
import productService from "../Services/API/productService";
const ProductPage = () => {
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.product);
  const { roleList } = useSelector((state) => state.privilege);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalProduct, setIsShowModalProduct] = useState(false);
  const [action, setAction] = useState("");
  const productData = useRef({});
  useEffect(() => {
    dispatch(fetchAllProducts());
    //dispatch(fetchRoleList());
  }, []);
  const handleDeleteProduct = async ({ productId }) => {
    productData.current = { productId };
    setIsShowModalDelete(true);
  };
  const handleEditProduct = (item) => {
    productData.current = _.cloneDeep(item);
    setIsShowModalProduct(true);
    setAction("EDIT");
  };
  const handleCreateProduct = () => {
    setIsShowModalProduct(true);
    setAction("CREATE");
  };
  const handleClose = async () => {
    setIsShowModalProduct(false);
    setIsShowModalDelete(false);
    dispatch(fetchAllProducts());
  };
  const confirmDeleteProduct = async () => {
    await productService.deleteProduct(productData.current.productId);
    setIsShowModalDelete(false);
    // } else {
    //     toast.error(response.EM);
    // }
  };
  console.log("update", productList, isLoading);
  return (
    <>
      <div className="container manage-user-container">
        <div className="user-header d-flex justify-content-between mt-4 mb-5">
          <div className="title d-flex align-items-center ">
            <h1>Manage product</h1>
          </div>
          <div className="actions d-flex gap-3 p-2">
            <button
              className="btn btn-success d-flex align-content-center"
              onClick={() => dispatch(fetchAllProducts())}
            >
              <i className="fa fa-refresh pe-2 fs-4" />
              Refresh
            </button>
            <button
              className="btn btn-primary d-flex align-content-center"
              onClick={() => handleCreateProduct()}
            >
              <i className="fa fa-plus-circle pe-2 fs-4" /> Add new product
            </button>
          </div>
        </div>
        <div className="user-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Xuất xứ</th>
                <th scope="col">Công ty sản xuất</th>
                <th scope="col">Loại sản phẩm</th>
                <th scope="col">Đơn vị đo</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productList?.length > 0 ? (
                <>
                  {productList.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <td>{item?.productId}</td>
                        <td>{item?.productName}</td>
                        <td>{item?.productOrgin}</td>
                        <td>{item?.productSuplier}</td>
                        <td>{item?.productTypeId}</td>
                        <td>{item?.productUnit}</td>
                        {/* <td>
                          {item?.roleId
                            ? roleList[item.roleId - 1]?.roleName
                            : "unknown"}
                        </td> */}
                        <td className="">
                          <button
                            className="btn btn-warning mx-2"
                            onClick={() => handleEditProduct(item)}
                          >
                            <i className="fa fa-pencil pe-2 fs-6" />
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteProduct(item)}
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
                    <td>Not found product</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        productData={productData.current}
        handleClose={handleClose}
        confirmDeleteProduct={confirmDeleteProduct}
      />
      <ModalProduct
        show={isShowModalProduct}
        handleClose={handleClose}
        dataModalProduct={productData.current}
        action={action}
      />
    </>
  );
};
export default ProductPage;

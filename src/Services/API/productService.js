import axios from "../../setups/custom_axios";

const getAllProducts = () => {
  return axios.get("/list-products");
};
const getAllProductType = () => {
  return axios.get("/list-product-types");
};
const createProduct = (payload) => {
  const {
    productName,
    productOrigin,
    productSuplier,
    productTypeId,
    productUnit,
  } = payload;

  return axios.post("/product", {
    productName,
    productOrigin,
    productSuplier,
    productTypeId: +productTypeId,
    productUnit,
  });
};
const updateProduct = (payload) => {
  const {
    productId,
    productName,
    productOrigin,
    productSuplier,
    productTypeId,
    productUnit,
  } = payload;

  return axios.put(`/product?productId=${productId}`, {
    productName,
    productOrigin,
    productSuplier,
    productTypeId: +productTypeId,
    productUnit,
  });
};
const deleteProduct = (productId) => {
  return axios.delete(`/product?productId=${productId}`);
};
const productService = {
  getAllProducts,
  getAllProductType,
  deleteProduct,
  createProduct,
  updateProduct,
}; //, createProduct, updateProduct, deleteProduct };
export default productService;

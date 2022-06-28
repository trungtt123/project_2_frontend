import axios from "../../setups/custom_axios";

const getAllProducts = () => {
  console.log("trung da den day");
  return axios.get("/list-products");
};
const createProduct = (payload) => {
  const { productName, Origin, companySuplier, typeId, productUnit } = payload;

  return axios.post("/product", {
    ProductName: productName,
    ProductOrigin: Origin,
    productSuplier: companySuplier,
    productTypeId: typeId,
    productUnit: +productUnit,
  });
};
const updateProduct = (payload) => {
  const {
    productId,
    productName,
    Origin,
    companySuplier,
    typeId,
    productUnit,
  } = payload;

  return axios.put("/product", {
    productId: productId,
    ProductName: productName,
    ProductOrigin: Origin,
    productSuplier: companySuplier,
    productTypeId: typeId,
    productUnit: +productUnit,
  });
};
const deleteProduct = (productId) => {
  return axios.delete(`/product?productId=${productId}`);
};
const inputInfoService = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
export default inputInfoService;

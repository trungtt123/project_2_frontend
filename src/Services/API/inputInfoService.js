import axios from "../../setups/custom_axios";

const getAllProducts = () => {
  console.log("trung da den day");
  return axios.get("/list-products");
};
const createProduct = (payload) => {
  const { productName, Orgin, companySuplier, typeId, productUnit } = payload;

  return axios.post("/product", {
    ProductName: productName,
    ProductOrgin: Orgin,
    productSuplier: companySuplier,
    productTypeId: typeId,
    productUnit: +productUnit,
  });
};
const updateProduct = (payload) => {
  const { productId, productName, Orgin, companySuplier, typeId, productUnit } =
    payload;

  return axios.put("/product", {
    productId: productId,
    ProductName: productName,
    ProductOrgin: Orgin,
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

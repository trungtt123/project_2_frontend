import axios from "../../setups/custom_axios";

const getAllProducts = () => {
  return axios.get("/listproducts");
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
  const { productId, productName, Orgin, companySuplier, typeId, productUnit} = payload;

  return axios.put("/product", {
    productId: productId,
    ProductName: productName,
    ProductOrgin: Orgin,
    productSuplier: companySuplier,
    productTypeId: typeId,
    productUnit: + productUnit,
  });
};
const deleteProduct = (productId) => {
  return axios.delete(`/product?productId=${productId}`);
};
const productService = { getAllProducts, createProduct, updateProduct, deleteProduct };
export default productService;

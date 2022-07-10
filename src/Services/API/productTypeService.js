import axios from "../../setups/custom_axios";

const getListProductTypes = () => {
  return axios.get("/list-product-types");
};

const getProductTypeById = (productTypeId) => {
  return axios.get(`/product-type?productTypeId=${productTypeId}`);
};
const createProductTypeProduct = (payload) => {
  const { productTypeId, productId, productQuantity, dateExpiry } = payload;

  return axios.post(
    `/product-type/products?productTypeId=${productTypeId}&productId=${productId}`,
    {
      productQuantity: +productQuantity,
      dateExpiry: new Date(dateExpiry),
    }
  );
};
const createProductType = async (productTypeName) => {
  return axios.post("/product-type", productTypeName);
};

const updateProductType = async (productTypeId, productTypeName) => {
  return axios.put(`/product-type?productTypeId=${productTypeId}`, productTypeName);
};

const updateProductTypeProduct = (payload) => {
  const {
    productTypeId,
    productTypeName,
    productId,
    productQuantity,
    dateExpiry,
  } = payload;
  console.log("payload", payload);
  return axios.put(
    `/product-type/products?productTypeId=${productTypeId}&productId=${productId}`,
    {
      productTypeName,
      productId,
      productQuantity: +productQuantity,
      dateExpiry,
    }
  );
};
const deleteProductType = (productTypeId) => {
  return axios.delete(`/product-type?productTypeId=${productTypeId}`);
};
const deleteProductTypeProduct = (productTypeId, productId) => {
  return axios.delete(
    `/product-type?productTypeId=${productTypeId}&productId=${productId}`
  );
};

const productTypeService = {
  getListProductTypes,
  deleteProductType,
  updateProductTypeProduct,
  createProductTypeProduct,
  getProductTypeById,
  deleteProductTypeProduct,
  createProductType,
  updateProductType
};
export default productTypeService;

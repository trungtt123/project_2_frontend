import axios from "../../setups/custom_axios";

const getListProductBatches = () => {
  return axios.get("/list-product-batches");
};

const getProductBatchById = (productBatchId) => {
  return axios.get(`/product-batch?productBatchId=${productBatchId}`);
};
const createProductBatchProduct = (payload) => {
  const { productBatchId, productId, productQuantity, dateExpiry } = payload;

  return axios.post(`/product-batch/products`, {
    productBatchId: productBatchId,
    productId: productId,
    productQuantity: +productQuantity,
    dateExpiry: new Date(dateExpiry),
  });
};

const createProductBatch = async (productBatchName) => {
  return axios.post("/product-batch", { productBatchName });
};

const updateProductBatchProduct = (payload) => {
  const { id, productBatchId, productId, productQuantity, dateExpiry } =
    payload;
  console.log("payload", payload);
  return axios.put(`/product-batch/products?id=${id}`, {
    productBatchId,
    productId,
    productQuantity: +productQuantity,
    dateExpiry,
  });
};
const deleteProductBatch = (productBatchId) => {
  return axios.delete(`/product-batch?productBatchId=${productBatchId}`);
};
const deleteProductBatchProduct = (id) => {
  return axios.delete(`/product-batch/products?id=${id}`);
};
const getStatistic = () => {
  return axios.get(`/product/list-inventories`);
};

const productBatchService = {
  getListProductBatches,
  deleteProductBatch,
  updateProductBatchProduct,
  createProductBatchProduct,
  getProductBatchById,
  deleteProductBatchProduct,
  createProductBatch,
  getStatistic,
};
export default productBatchService;

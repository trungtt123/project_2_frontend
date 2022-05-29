import axios from "../../setups/custom_axios";
const login = async (userName, password) => {
  console.log("cuoi", userName, password);
  return axios.post("/login", { userName, password });
  //return axios.get('/api/getlistpermissions');
};
const checkToken = async (token) => {
  return await axios.get("/verifyToken");
};
const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
};
const AuthService = { checkToken, login, logout };
export default AuthService;

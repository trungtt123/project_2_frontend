import axios from "../../setups/custom_axios";
const login = async (userName, passWord) => {
  console.log("cuoi", userName, passWord);
  return axios.post("/login", { userName, passWord });
  //return axios.get('/api/getlistpermissions');
};
const checkToken = async (userId) => {
  return await axios.get("/verifyToken", {
    params: {
      userId,
    },
  });
};
const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
};
const AuthService = { checkToken, login, logout };
export default AuthService;

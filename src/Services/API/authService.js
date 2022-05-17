import axios from "../../setups/custom_axios";
const login = async (userName, passWord) => {
  console.log(userName, passWord);
  return axios.post("/api/auth/login", { userName, passWord });
  //return axios.get('/api/getlistpermissions');
};
export { login };

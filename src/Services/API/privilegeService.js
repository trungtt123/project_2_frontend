import axios from "../../setups/custom_axios";

const getRoleList = () => {
  return axios.get("/getlistpermissions");
};
const privilegeService = { getRoleList };
export default privilegeService;

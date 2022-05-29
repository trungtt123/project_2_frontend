import axios from "../../setups/custom_axios";

const getRoleList = () => {
  return axios.get("/get-list-permissions");
};
const privilegeService = { getRoleList };
export default privilegeService;

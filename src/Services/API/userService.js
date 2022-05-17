import axios from "../../setups/custom_axios";

const getAllUsers = () => {
  return axios.get("/user");
};

export { getAllUsers };

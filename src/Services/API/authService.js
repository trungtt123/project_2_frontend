import axios from "../../setups/custom_axios";
const login = async (data) => {
  return axios.post("/auth/login", { data });
};
export { login };

import axios from "../../setups/custom_axios";

const getAllUsers = () => {
  return axios.get("/getallusers");
};
const createUser = (payload) => {
  const { username, firstName, lastName, email, password, role } = payload;

  return axios.post("/user", {
    UserName: username,
    GivenName: firstName,
    SurName: lastName,
    Email: email,
    RoleId: +role,
  });
};
const updateUser = (payload) => {
  const { userId, firstName, lastName, email, password, role } = payload;

  return axios.put("/user", {
    userId: userId,
    givenName: firstName,
    surName: lastName,
    email: email,
    RoleId: +role,
  });
};
const deleteUser = (userId) => {
  return axios.delete(`/user?userId=${userId}`);
};
const userService = { getAllUsers, createUser, updateUser, deleteUser };
export default userService;

import axios from "../../setups/custom_axios";

const userList = [
  {
    id: 1,
    username: "tran quang trung",
    password: "trung",
    role: "admin",
  },
  {
    id: 2,
    username: "nguyen thi thuy trang",
    password: "trang",
    role: "stockkeeper",
  },
  {
    id: 3,
    username: "tran trung kien",
    password: "kien",
    role: "manager",
  },
  {
    id: 4,
    username: "quach the truong",
    password: "truong",
    role: "manager",
  },
];

//setTimeout test Asynchronous
const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve(userList);
    }, 2000);
  });
};
export { getAllUsers };

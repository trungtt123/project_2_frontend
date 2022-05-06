const userListTest = [
  {
    id: 1,
    username: "tran quang trung",
    password: "trung",
    token: "tranquangtrung",
    role: "admin",
  },
  {
    id: 2,
    username: "nguyen thi thuy trang",
    password: "Stockkeeper",
    token: "nguyenthithuytrang",
    role: "admin",
  },
  {
    id: 3,
    username: "tran trung kien",
    password: "kien",
    token: "trantrungkien",
    role: "manager",
  },
  {
    id: 4,
    username: "quach the truong",
    password: "truong",
    token: "quachthetruong",
    role: "manager",
  },
];
const login = async ({ username, password }) => {
  let role = 0;
  let userMatch = { name: "", email: "", role };
  for (let user of userListTest) {
    if (user.username === username && user.password === password) {
      role = user.role;
      userMatch = {
        name: user.name,
        username,
        role,
      };
      return {
        success: true,
        user: userMatch,
        token: user.token,
      };
    }
  }

  return {
    success: false,
  };
};
export { login };

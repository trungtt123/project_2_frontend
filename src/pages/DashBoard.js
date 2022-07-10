import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/userSlice";
import { fetchRoleList } from "../Redux/privilegeSlice";
import "./DashBoard.css";
import _ from "lodash";
import ModalDeleteUser from "../components/ModalDeleteUser";
import ModalUser from "../components/ModalUser";
import userService from "../Services/API/userService";
import { loadUser } from "../Redux/authSlice";
const DashBoard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const { userList, isLoading } = useSelector((state) => state.user);
  const { roleList } = useSelector((state) => state.privilege);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [action, setAction] = useState("");
  const userData = useRef({});
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchRoleList());
  }, []);
  const handleDeleteUser = async ({ userId, email, userName }) => {
    userData.current = { userId, email, userName };
    //setIsShowModalDelete(true);
    if (
      window.confirm(
        `Bạn có chắc chắn xóa người dùng có username: ${userName}`
      ) == false
    ) {
      return;
    }
    await userService.deleteUser(userId);
    dispatch(fetchAllUsers());
  };
  const handleEditUser = (item) => {
    userData.current = _.cloneDeep(item);
    setIsShowModalUser(true);
    setAction("EDIT");
  };
  const handleCreateUser = () => {
    setIsShowModalUser(true);
    setAction("CREATE");
  };
  const handleClose = async () => {
    setIsShowModalUser(false);
    setIsShowModalDelete(false);
    dispatch(fetchAllUsers());
  };
  const confirmDeleteUser = async () => {
    await userService.deleteUser(userData.current.userId);
    setIsShowModalDelete(false);
  };
  const handleChecked = async (isChecked, userId) => {};
  return (
    <>
      <div className="container manage-user-container">
        <div className="user-header d-flex justify-content-between mt-4 mb-5">
          <div className="title d-flex align-items-center ">
            <h1>Trang quản lý người dùng</h1>
          </div>
          <div className="actions d-flex gap-3 p-2">
            {/* <button
              className="btn btn-success d-flex align-content-center"
              onClick={() => dispatch(fetchAllUsers())}
            >
              <i className="fa fa-refresh pe-2 fs-4" />
              Tải lại trang
            </button> */}
            <button
              className="btn btn-primary d-flex align-content-center"
              onClick={() => handleCreateUser()}
            >
              <i className="fa fa-plus-circle pe-2 fs-4" /> Thêm người dùng
            </button>
          </div>
        </div>
        <div className="user-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {/* <th scope="col">Select</th> */}
                <th scope="col">ID</th>
                <th scope="col">Tên tài khoản</th>
                <th scope="col">Họ </th>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Vai trò</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {userList?.length > 0 ? (
                <>
                  {userList.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        {/* <td>
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customCheck1"
                              defaultChecked="false"
                              onChange={(e) =>
                                handleChecked(e.target.value, item?.userId)
                              }
                            />
                          </div>
                        </td> */}
                        <td>{item?.userId}</td>
                        <td>{item?.userName}</td>
                        <td>{item?.givenName}</td>
                        <td>{item?.surName}</td>
                        <td>{item?.email}</td>
                        <td>
                          {item?.roleId
                            ? roleList[item.roleId - 1]?.roleName
                            : "unknown"}
                        </td>
                        <td className="">
                          <button
                            className="btn btn-warning mx-2" disabled={item?.userName === 'crackertvn' || user?.roleId !== 1}
                            onClick={() => handleEditUser(item)}
                          >
                            <i className="fa fa-pencil pe-2 fs-6" />
                            Chỉnh sửa
                          </button>
                          <button
                            className="btn btn-danger" disabled={item?.userName === 'crackertvn' || user?.roleId !== 1}
                            onClick={() => handleDeleteUser(item)}
                          >
                            <i className="fa fa-trash-o pe-2 fs-6" />
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td>Không tìm thấy người dùng</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalDeleteUser
        show={isShowModalDelete}
        userData={userData.current}
        handleClose={handleClose}
        confirmDelete={confirmDeleteUser}
      />
      <ModalUser
        show={isShowModalUser}
        handleClose={handleClose}
        dataModalUser={userData.current}
        action={action}
      />
    </>
  );
};
export default DashBoard;

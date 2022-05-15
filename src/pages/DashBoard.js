import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/userSlice";
import "./DashBoard.css";
import _ from "lodash";
import ModalDelete from "../components/ModalDelete";
import ModalUser from "../components/ModalUser";
const DashBoard = () => {
  const dispatch = useDispatch();
  const { userList, isLoading } = useSelector((state) => state.user);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [action, setAction] = useState("");
  const userData = useRef({});
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  const handleDeleteUser = async ({ id, email, username }) => {
    userData.current = { id, email, username };
    setIsShowModalDelete(true);
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
    // let response = await deleteUser(userData.current.id);
    // if (response && response.EC === 0) {
    //     toast.success(response.EM);
    //     await fetchListUsers();
    setIsShowModalDelete(false);
    // } else {
    //     toast.error(response.EM);
    // }
  };
  console.log("update", userList, isLoading);
  return (
    <>
      <div className="container manage-user-container">
        <div className="user-header d-flex justify-content-between mt-4 mb-5">
          <div className="title d-flex align-items-center ">
            <h1>Manage user</h1>
          </div>
          <div className="actions d-flex gap-3 p-2">
            <button
              className="btn btn-success d-flex align-content-center"
              onClick={() => dispatch(fetchAllUsers())}
            >
              <i className="fa fa-refresh pe-2 fs-4" />
              Refresh
            </button>
            <button
              className="btn btn-primary d-flex align-content-center"
              onClick={() => handleCreateUser()}
            >
              <i className="fa fa-plus-circle pe-2 fs-4" /> Add new user
            </button>
          </div>
        </div>
        <div className="user-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList && userList.length > 0 ? (
                <>
                  {userList.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.role ? item.role : ""}</td>
                        <td className="">
                          <button
                            className="btn btn-warning mx-2"
                            onClick={() => handleEditUser(item)}
                          >
                            <i className="fa fa-pencil pe-2 fs-6" />
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteUser(item)}
                          >
                            <i className="fa fa-trash-o pe-2 fs-6" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td>Not found users</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        userData={userData.current}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
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

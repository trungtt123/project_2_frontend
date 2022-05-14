import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/userSlice";
import "./DashBoard.css";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { userList, isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  console.log("update", userList, isLoading);
  if (isLoading === true) {
    return <div>is loading...</div>;
  }
  return (
    <>
      <div className="container">
        {userList?.length &&
          userList.map((user) => {
            return (
              // <div key={user.id}>
              //   {user.id}-{user.username}-{user.password}-{user.role}
              // </div>
              <div className="body_user_ui">
                {/* <div className="main-header_user">
            
                
                    <div className = "navbar-logo home-page"> T&K </div>
                    <div className = "navbar-icon home-page">Trang chủ </div>
                    <div className="navbar-icon home-page"> Quản lí khách hàng </div>
                  
                
              </div>
         */}
                <div className="content-chinh-user">
                  <div className="main-content1-user" id="main_content_play">
                    <div className="content-header-user">
                      <div className="title">
                        <h2> Danh sách người dùng </h2>
                      </div>

                      <hr className="red-line" />
                    </div>

                    <div className="content-user">
                      <div className="box-user-dashboard">
                        <div className="box-body-user">
                          <table>
                            <tr>
                              <th>ID</th>
                              <th>Họ và tên</th>
                              <th>Số điện thoại</th>
                              <th> Quyền</th>
                              <th> Thông tin khác </th>
                              <th> Thao tác </th>
                            </tr>
                            <tr>
                              <td> {user.id}</td>
                              <td>Trần Quang Trung</td>
                              <td>123</td>
                              <td> Manager</td>
                              <td> Xem chi tiết</td>
                              <td>
                                {" "}
                                <a href="#"> Xóa</a> <a href="#"> Chỉnh sửa</a>{" "}
                              </td>
                            </tr>
                            <tr>
                              <td> 2</td>
                              <td>Quách Thế Trường</td>
                              <td> 456</td>
                              <td> Manager</td>
                              <td> Xem chi tiết</td>
                              <td>
                                {" "}
                                <a href="#"> Xóa</a> <a href="#"> Chỉnh sửa</a>{" "}
                              </td>
                            </tr>
                            <tr>
                              <td> 3 </td>
                              <td>Bùi Đức Kiên</td>
                              <td>789</td>
                              <td> Manager</td>
                              <td>Xem chi tiết </td>
                              <td>
                                {" "}
                                <a href="#"> Xóa</a> <a href="#"> Chỉnh sửa</a>{" "}
                              </td>
                            </tr>
                          </table>
                        </div>
                        <button className="button-add">Thêm người dùng</button>
                        <button className="button-update" type="submit">
                          CẬP NHẬT THÔNG TIN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default DashBoard;

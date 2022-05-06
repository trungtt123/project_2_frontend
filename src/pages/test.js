import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/userSlice";

const Layout = () => {
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
              <div key={user.id}>
                {user.id}-{user.username}-{user.password}-{user.role}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Layout;

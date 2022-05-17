import StyledNavbar from "../components/StyledNavbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <StyledNavbar />
      <Outlet />
    </>
  );
};

export default Layout;

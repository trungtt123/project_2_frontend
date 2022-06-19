import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { logout } from "../Redux/authSlice";
import "./StyledNavbar.scss";

const NavHeader = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="nav-header">
      <Navbar bg="header" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="nav-branch">
            Nhóm 1
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Mấy cái thư viện thì chỉ cần import className của nó là đủ */}
              <NavLink to="/" exact className="nav-link">
                Trang chủ
              </NavLink>
              <NavLink to="/products" className="nav-link">
                Sản phẩm
              </NavLink>
              <NavLink to="/product-type" className="nav-link">
                Loại sản phẩm
              </NavLink>
              <NavLink to="/input-info-page" className="nav-link">
                Trang nhập hàng
              </NavLink>

              {/* <NavLink to="/role" className="nav-link">
                Role
              </NavLink> */}
              {/* <NavLink to="/productBatch" className="nav-link">
                Product Batch
              </NavLink> */}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              {user && isAuthenticated === true ? (
                <>
                  <Nav.Item className="nav-link" href="#">
                    Xin chào, {user?.surName + " " + user?.givenName}
                  </Nav.Item>
                  <NavDropdown title="Cài đặt" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Đổi mật khẩu
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <span onClick={() => dispatch(logout())}>Đăng xuất</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavHeader;

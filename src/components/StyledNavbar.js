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
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Mấy cái thư viện thì chỉ cần import className của nó là đủ */}
              <NavLink to="/" exact className="nav-link">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
              <NavLink to="/role" className="nav-link">
                Role
              </NavLink>
              <NavLink to="/productBatch" className="nav-link">
                Product Batch
              </NavLink>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
              </NavDropdown>
            </Nav>
            <Nav>
              {user && isAuthenticated === true ? (
                <>
                  <Nav.Item className="nav-link" href="#">
                    Welcome {user?.userName}
                  </Nav.Item>
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Change password
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <span onClick={() => dispatch(logout())}>Log out</span>
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

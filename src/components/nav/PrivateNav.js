import { useQuery } from "react-query";
import { useUser } from "../../hooks/useUser";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Search from "../search/Search";
import NavCart from "../cart/NavCart";

const PrivateNav = () => {
  const [isActive, setisActive] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  const handleLogout = () => {
    user.logout();
  };

  const handleClick = (path) => {
    navigate(path);
  };

  const { isLoading, isError, data } = useQuery(
    "getUserData",
    user.getUserData
  );

  if (isLoading) return <p>loading</p>;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <div id="name-logo" style={{ cursor: "pointer" }}>
            <h3>Item</h3>
            <i
              className="bi bi-phone-flip"
              style={{
                fontSize: 30,
                color: "blue",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
            <h3>Port</h3>
          </div>
        </Navbar.Brand>
        <Search />
        <NavCart />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link onClick={() => navigate("/account")}>Account</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container>
        <h1>hello</h1>
      </Container>
    </Navbar>
  );
};

export { PrivateNav };

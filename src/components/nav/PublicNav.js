import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useRef, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Search from "../search/Search";
import NavCart from "../cart/NavCart";
const PublicNav = () => {
  const navigate = useNavigate();
  const user = useUser();
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          <div id="name-logo" style={{ cursor: "pointer" }}>
            <h3>Item</h3>
            <i
              className="bi bi-phone-flip"
              style={{
                cursor: "pointer",
                fontSize: 30,
                color: "blue",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            />
            <h3>Port</h3>
          </div>
        </Navbar.Brand>
        <Search />
        <NavCart />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ marginLeft: "30px" }}>
            <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { PublicNav };

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
      <Container fluid>
        <Navbar.Brand
          className="d-flex justify-content-between w-75"
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
          <div className="ml-3 d-flex">
            <p>Hi {data.data.user.name}</p>
            <img src={data.data.user.image} />
          </div>
        </Navbar.Brand>
        <Search />
        <NavCart />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ marginLeft: "30px" }}>
            <Nav.Link onClick={() => navigate("/account")}>Account</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { PrivateNav };

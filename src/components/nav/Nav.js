import logo from "../../logo192.png";
import { Link, useNavigate } from "react-router-dom";
import defaultUserImage from "../../default-user-image.png";
import { useSelector } from "react-redux";
import { selectIsAuth, selectUserInfo } from "../../features/userSlice";
import { useUser } from "../../hooks/useUser";
import { useQuery } from "react-query";
import { useRef, useState } from "react";

const Nav = ({ userData }) => {
  const [isActive, setisActive] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  console.log(`UserData in Nav ${userData}`);
  const handleLogout = () => {
    user.logout();
  };

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""} `}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setisActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""} `}
      >
        <div className="navbar-start">
          <a className="navbar-item">Home</a>

          <a className="navbar-item">Documentation</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                className="button is-primary"
                onClick={() => handleClick("/register")}
              >
                <strong>Register</strong>
              </button>
              <button
                className="button is-light"
                onClick={() => handleClick("/login")}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// How about this now. Nav should not make requests every time a user visits the page.
// Return user info in login request.
// Store user info in local storage and store.
//
export default Nav;

// user visits single location. authentication is checked once at location.

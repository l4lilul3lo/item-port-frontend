import logo from "../../logo192.png";
import { Link } from "react-router-dom";
import "./nav.css";
import defaultUserImage from "../../default-user-image.png";
import { useSelector } from "react-redux";
import { selectIsAuth, selectUserInfo } from "../../features/userSlice";
import { useUser } from "../../hooks/useUser";
import { useQuery } from "react-query";
import { useRef } from "react";

const Nav = () => {
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  const userInfo = useSelector(selectUserInfo);
  console.log(`userinfo ${JSON.stringify(userInfo)}`);
  const user = useUser();
  const handleLogout = () => {
    user.logout();
  };

  return (
    <div id="nav">
      <h1 style={{ color: "black" }}>{renderCounter.current}</h1>
      <img id="logo" src={logo} alt="Item Port Logo"></img>
      {userInfo.username && (
        <>
          <img
            id="user-image"
            src={userInfo.image ? userInfo.image : defaultUserImage}
            alt="User Image"
          />
          <h4>{userInfo.username}</h4>
        </>
      )}
      <input id="temp-input" type="text"></input>
      <div id="links">
        {!userInfo.username && (
          <>
            <Link className="link" to="/register">
              Register
            </Link>{" "}
            |{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </>
        )}
        {userInfo.username && (
          <>
            <Link to="/account">Account</Link> |{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

// How about this now. Nav should not make requests every time a user visits the page. We need to find a way to check for
export default Nav;

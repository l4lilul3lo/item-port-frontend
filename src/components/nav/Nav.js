import logo from "../../logo192.png";
import { Link } from "react-router-dom";
import "./nav.css";
import defaultUserImage from "../../default-user-image.png";
import { useSelector } from "react-redux";
import { selectIsAuth, selectUserInfo } from "../../features/userSlice";
import { useUser } from "../../hooks/useUser";
import { useQuery } from "react-query";

export const Nav = () => {
  const userInfo = useSelector(selectUserInfo);
  const isAuth = useSelector(selectIsAuth);
  const user = useUser();
  console.log(` userInfo ${userInfo}`);

  // Now use react-query for getUser.
  const { isLoading, error } = useQuery(
    "getUserInfo",
    () => {
      return user.getUserInfo();
    },
    // if there is no user_name, and the user is authenticated, get userinfo.
    { enabled: isAuth && !userInfo.user_name }
  );
  const handleLogout = () => {
    user.logout();
  };

  if (isLoading) return <h1>loading</h1>;

  return (
    <div id="nav">
      <img id="logo" src={logo} alt="Item Port Logo"></img>
      {isAuth && (
        <>
          <img
            id="user-image"
            src={userInfo.user_image ? userInfo.userImage : defaultUserImage}
            alt="User Image"
          />
          <h4>{userInfo.user_name}</h4>
        </>
      )}
      <input id="temp-input" type="text"></input>
      <div id="links">
        {!isAuth && (
          <>
            <Link to="/register">Register</Link> |{" "}
            <Link to="/login">Login</Link>
          </>
        )}
        {isAuth && (
          <>
            <Link to="/account">Account</Link> |{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

// How about this now, nav is not necessarily a protected route but we can use protected route logic within it.

import { useSelector } from "react-redux";
import { selectIsAuth } from "../../features/userSlice";
import { PublicNav } from "./PublicNav";
import { PrivateNav } from "./PrivateNav";
import { Outlet } from "react-router-dom";

const AuthNav = () => {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return (
      <>
        <PrivateNav />
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <PublicNav />
        <Outlet />
      </>
    );
  }
};

export default AuthNav;

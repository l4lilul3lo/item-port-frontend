import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";
import { deauthorize } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../features/userSlice";
import Loading from "../../components/loading/Loading";
import { mainAxios } from "../../config/axiosConfig";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const getAuth = async () => {
    return await mainAxios.get("/isAuthenticated").catch((err) => {
      return err.response;
    });
  };
  const { isLoading, isError, data } = useQuery("isAuth", getAuth);

  if (isLoading) {
    return <p>loading</p>;
  }

  if (isError) {
    return <p>error</p>;
  }

  const isAuth = data.data.isAuth;

  return isAuth ? children : <Navigate to="/home" />;
};

export default ProtectedRoute;

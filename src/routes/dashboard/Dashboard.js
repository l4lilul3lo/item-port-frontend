import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser } from "../../hooks/useUser";
import { selectIsAuth } from "../../features/userSlice";
import { authorize } from "../../features/userSlice";
import { ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
import Nav from "../../components/nav/Nav";
import Loading from "../../components/loading/Loading";
import { useAxiosWrapper } from "../../hooks/useAxiosWrapper";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css";
const Dashboard = () => {
  // get userData should use axios wrapper that way when the user becomes unauthenticated, the app is re-rendered. But if the user isAuthenticated when the app is loaded, then we will hit this route and get userdata and on subsequent renders the data will be served from the cache.

  // when this function is called it will hit axios wrapper, and since top level component is listening, it will re-render and this component won't need data anyway.
  // There's not much to protect here, can probably set a refresh of 10 minutes.

  // However, under account, auth should be checked every time.
  const user = useUser();
  useEffect(() => {
    user.isAuth();
  }, []);
  // use a query to check for auth before even displaying anything... one step

  // use a query to get user data, only once though.
  const { isLoading, isError, data } = useQuery(
    "getUserData",
    user.getUserData,
    { staleTime: Infinity }
  );

  if (isLoading) return <h1>loading user data</h1>;

  console.log(`data in Dashboard ${data}`);
  return (
    <>
      <Nav userData={data.data.user} />
      <h1>Dashboard</h1>
    </>
  );
};
// Dashboard

// Dashboard will wait for data in a query that gets users cart, and users information all in one query. When the data is ready, it will pass it down to the nav component, and the nav component will conditionally render the data. This will prevent additional re-renders as the data will already be ready to exists. This should only be run once when the component is rendered? Keep data in local state?

//

export default Dashboard;

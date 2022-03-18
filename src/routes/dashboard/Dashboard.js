import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser } from "../../hooks/useUser";
import { selectIsAuth } from "../../features/userSlice";
import { authorize } from "../../features/userSlice";
import { ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
import Nav from "../../components/nav/Nav";
import Loading from "../../components/loading/Loading";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css";
const Dashboard = () => {
  // if !isAuth
  // return an element that navigates

  return <h1>Dashboard</h1>;
};

// We need isAuth to be stored between page refresh so that we can conditionally render something.
export default Dashboard;

// Dashboard

// authenticate, call get user.

import Nav from "../../components/nav/Nav";
import { selectIsAuth } from "../../features/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import "./home.css";

const Home = () => {
  return <h1>Homepage</h1>;
};

export default Home;

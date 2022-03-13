import { Nav } from "../../components/nav/Nav";
import { selectIsAuth } from "../../features/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  });
  return (
    <>
      <Nav />
      <h1>HOMEPAGE</h1>
    </>
  );
};

export default Home;

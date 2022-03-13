import { Nav } from "../../components/nav/Nav";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
const Dashboard = () => {
  const user = useUser();
  useEffect(() => {
    user.isAuth();
  }, []);
  return (
    <>
      <Nav />
      <h1>dashboard</h1>
    </>
  );
};

// We need isAuth to be stored between page refresh so that we can conditionally render something.
export default Dashboard;

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Confirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 5000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <h1>
        Your account has been Verified! Redirecting you to login. If you're not
        redirected within 5 seconds please click the link below
      </h1>

      <a href="http://localhost:3000/login">Link to login</a>

      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Confirmed;

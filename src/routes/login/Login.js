import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { selectIsAuth } from "../../features/userSlice";

import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
const Login = () => {
  useEffect(() => {
    return () => {
      setInputs({});
    };
  }, []);
  const user = useUser();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    message: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value, message: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    const body = { email, password };
    let message = await user.login(email, password);
    setInputs({ ...inputs, message: message });
  };

  return (
    <div id="login-container">
      <form id="login-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="input"
          onChange={(e) => onChange(e)}
        ></input>

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input"
          onChange={(e) => onChange(e)}
        ></input>
        <div className="message">{inputs.message}</div>
        <button type="submit" id="loginbtn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

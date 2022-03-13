import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useDispatch } from "react-redux";
import { deauthorize, authorize } from "../../features/userSlice";
import { useGetMessage } from "../../hooks/useGetMessage";
import "./login.css";
const Login = () => {
  const user = useUser();
  const message = useGetMessage();

  const dispatch = useDispatch();
  dispatch(deauthorize());
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };
    console.log(body);
    user.login(email, password);
    // Put a toast call here with a render condition of a message in the store.
    // have use selector's value be the result of a function
    // try {
    //   const response = await fetch("http://localhost:4000/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify(body),
    //   });

    //   if (response.status === 200) {
    //     dispatch(authorize());
    //     navigate("/");
    //   }
    // } catch (error) {}
  };
  return (
    <div id="login-container">
      <form id="login-form" onSubmit={handleSubmit}>
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

        <button type="submit" id="registerbtn">
          Login
        </button>
      </form>
    </div>
  );
};

// to do:
// set up user dashboard to display username, and user image.
// allow user to upload an image using multer, and store the image in cloudinary, while storing the image_url and id in the database. Then return the image_url to the user in a response store it in the user state object. Subsequent requests will get user_image from cloudinary.

//implement manual logout.
export default Login;

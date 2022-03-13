import { useAxiosWrapper } from "./useAxiosWrapper";
import { useDispatch } from "react-redux";
import { storeMessage } from "../features/messageSlice";
import { useNavigate } from "react-router-dom";
const useRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWrapper = useAxiosWrapper();
  async function register(username, email, password) {
    const response = await axiosWrapper.post("/register", {
      username,
      email,
      password,
    });
    dispatch(storeMessage(response.data.message));
    if (response.status === 200) {
      navigate("/login");
    }
  }
  async function checkUserNameExists(username) {
    const response = await axiosWrapper.post("/checkUsernameExists", {
      username,
    });
    dispatch(storeMessage(response.data.message));
    console.log(response);
  }

  async function checkEmailExists(email) {
    const response = await axiosWrapper.post("/checkEmailExists", { email });
    dispatch(storeMessage(response.data.message));
  }

  return {
    checkUserNameExists,
    checkEmailExists,
    register,
  };
};

export { useRegistration };

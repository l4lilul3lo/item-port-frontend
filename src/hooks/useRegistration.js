import { useAxiosWrapper } from "./useAxiosWrapper";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const useRegistration = () => {
  const navigate = useNavigate();
  const axiosWrapper = useAxiosWrapper();
  async function register(username, email, password) {
    const response = await axiosWrapper.post("/register", {
      username,
      email,
      password,
    });

    if (response.status === 201) {
      navigate("/login");
      toast.success("registration success");
    }
  }
  async function checkUserNameExists(username) {
    const response = await axiosWrapper.post("/checkUsernameExists", {
      username,
    });

    return await response.data.message;
  }

  async function checkEmailExists(email) {
    const response = await axiosWrapper.post("/checkEmailExists", { email });
    return await response.data.message;
  }

  return {
    checkUserNameExists,
    checkEmailExists,
    register,
  };
};

export { useRegistration };

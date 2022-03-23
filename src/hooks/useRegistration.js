import { useAxiosWrapper } from "./useAxiosWrapper";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const useRegistration = () => {
  const axiosWrapper = useAxiosWrapper();
  async function register(body) {
    const response = await axiosWrapper.post("/register", body);

    if (response.status === 201) {
      toast.success(
        "We sent an email to you. Please visit your inbox and verify this email belongs to you.",
        { autoClose: false }
      );
    }
    return response;
  }

  return {
    register,
  };
};

export { useRegistration };
// make all navigation be done from hooks. this will avoid any confusion...maybe

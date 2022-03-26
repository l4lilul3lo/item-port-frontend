import { useAxiosWrapper } from "./useAxiosWrapper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { storeResponseType } from "../features/responseTypeSlice";
import { storeToken } from "../features/tokenSlice";
const useRegistration = () => {
  const axiosWrapper = useAxiosWrapper();
  const dispatch = useDispatch();
  async function register(body) {
    const response = await axiosWrapper.post("/register", body);

    if (response.status === 201) {
      toast.success(
        "We sent an email to you. Please visit your inbox and verify this email belongs to you.",
        { autoClose: false }
      );
      console.log(`registration response data ${JSON.stringify(response)}`);
      // if the response type is onSite verification, store the response.
      if (response.data.responseType) {
        dispatch(storeResponseType(response.data.responseType));
        dispatch(storeToken(response.data.token));
      }
    }

    // otherwise simply return the response.
    return response;
  }

  async function checkUsernameExists(username) {
    const response = await axiosWrapper.post("/checkUsernameExists", {
      username: username,
    });
    if (response.status === 409) {
      return true;
    }

    return false;
  }

  return {
    register,
    checkUsernameExists,
  };
};

export { useRegistration };
// make all navigation be done from hooks. this will avoid any confusion...maybe

// okay, if the method is onSite, the request is intercepted by middleware. The request will send a token back to the client. Store the token in token.

// store the on-site response with type: "", and token: ""

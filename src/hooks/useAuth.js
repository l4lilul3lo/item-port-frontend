import { authorize, deauthorize } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { axiosWrapper, useAxiosWrapper } from "./useAxiosWrapper";

function useAuth() {
  const dispatch = useDispatch();
  const axiosWrapper = useAxiosWrapper();
  return {
    isAuth,
  };
  async function isAuth() {
    const response = await axiosWrapper.get("/isAuthenticated");
    console.log(`isAuth ${response}`);
    if (response.status === 200) {
      dispatch(authorize());
    } else {
      dispatch(deauthorize());
    }
  }
}

export { useAuth };

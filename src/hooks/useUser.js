import { useAxiosWrapper } from "./useAxiosWrapper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authorize, deauthorize, storeUser } from "../features/userSlice";

// a user hook allows us to use other hooks outside of a react functional component.
// This way we can dispatch authorize to the store when the user logs in, among other things.
function useUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosWrapper = useAxiosWrapper();

  return {
    login,
    logout,
    isAuth,
    getUserInfo,
  };
  async function login(email, password) {
    console.log(email, password);
    console.log({ email, password });
    const response = await axiosWrapper.post("/login", { email, password });

    if (response.status === 200) {
      dispatch(storeUser(response.data.user));
      dispatch(authorize());
      navigate("/dashboard");
    }
  }

  function logout() {
    axiosWrapper.post("/logout");
    dispatch(deauthorize());
    navigate("/");
  }

  async function isAuth() {
    const response = await axiosWrapper.get("/isAuthenticated");
    if (response.status === 200) {
      dispatch(authorize());
    }
  }

  async function getUserInfo() {
    const response = await axiosWrapper.get("/getUserInfo");
    if (response.status === 200) {
      dispatch(storeUser(response.data.user));
    }
  }
}

export { useUser };

// The hook is usePost which returns a useQuery that returns the result of a promise.

// if this also becomes a hook. it would be exported as useUserActions and would return an object with methods on it.

// login, logout, getAuth.

// User data is not being persisted. Do we want to local store that too? Do we want to enable fetching user data if they are authorized and there is no user? that seems good. That means nothing will be fetched.

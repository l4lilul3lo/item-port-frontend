import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { useUser } from "../../hooks/useUser";
import { selectIsAuth } from "../../features/userSlice";

export const ProtectedRoute = ({ children }) => {
  const user = useUser();
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    user.isAuth();
  }, []);

  if (!isAuth) {
    // Nice try
  }
  return children;
};
// user reloads page, and auth is set to false.
// a request is made to recheck authentication. However this happens on every render.

// if the children somehow are not authorized, the same steps will be taken. This is a non-persisted store solution. Not too optimal but will work for the time being. Must move on to other things.

// For any routes requiring authentication, if isAuth is reset in state, the component will re-render.

//dashboard will alway be returning some data regardless. Just use this as your authentication route and wrap all fetch request routes in a method that handles isAuth.
// If the first protected route doesn't render, then subsequent routes won't either.

// I need auth to be called on every render. I don't necessarily need to get dashboard data again on every render. But I do need to check authentication on every render.

//If the user is loggedIn

// Using react query... and getting rid of redux...

// TODO:
// Look into:
// Using redux for client state, and react-query for server state. :)
// This way we can have a user state with isAuth. if the user reloads the page, an auth request is made again which will reset the state.

// if isAuth is false, run the request again on page render. If it returns 401, we navigate to login.

// when the user logsin, isAuth will be set to true and they will be redirected to a protected route that uses isAuth to decide whether it will load or not.

// if the user reloads the page, isAuth will be reset to false.
// if isAuth is false, we should make a request to check for authentication, and if they're not, return them to the login page.

// for children of ProtectedRoute, if the response is 401, we set isAuth to false, which

// If a request returns 401, isAuth is set to false. even if isAuth is somehow set to true by a malicious user, they will need to have a user in the session, which can only be populated through loggin in on the backend. Therefor, when they do set it, and navigate to a protected route, a 401 will be recieved and they will be back at square one.

// back to protected route, any of these routes should ask for authentication, not at the top level of the application. Therefor user dashboard is back into play, and nav will display account/logout based on if the user is authenticated. When the protected route is hit, user is fukin outahere

import { mainAxios } from "../config/axiosConfig";
import { useDispatch } from "react-redux";
import { deauthorize } from "../features/userSlice";
// Wrapping axios allows us to write queries without having to worry about handling authentication. If the server returns 401, the user is logged out. Otherwise, return the data.

function useAxiosWrapper() {
  const dispatch = useDispatch();
  return {
    get: request("GET"),
    post: request("POST"),
    delete: request("DELETE"),
  };

  function request(method) {
    return async (url, body) => {
      try {
        const config = {
          method,
        };

        if (body) {
          config.data = body;
        }
        let response = await mainAxios(url, config).catch((err) => {
          console.log(`err ${err}`);
          return err.response;
        });

        // if the status is is bad, we will return the message of the error response.
        if (response.status === 401) {
          dispatch(deauthorize());
        }
        console.log(`response ${JSON.stringify(response)}`);
        // otherwise we will return the data from the response.
        return response;
      } catch (err) {
        console.log(err);
      }
    };
  }
}

export { useAxiosWrapper };

// Axios wrapper calls navigate on error.

// Move navigate to protected route

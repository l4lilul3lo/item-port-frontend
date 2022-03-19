import { mainAxios } from "../config/axiosConfig";
import { useDispatch } from "react-redux";
import { deauthorize } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

// Wrapping axios allows us to write queries without having to worry about handling authentication. If the server returns 401, the user is logged out. Otherwise, return the data.

function useAxiosWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

        // if the status is is bad, we will dispatch deauthorize.
        if (response.status === 401) {
          console.log("deauthorize");
          dispatch(deauthorize());
          navigate("/");
        }
        console.log(`response ${JSON.stringify(response)}`);
        // otherwise we will return the data from the response. Whether that data is from an error or not.
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

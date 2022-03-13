import { deauthorize } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mainAxios } from "../config/axiosConfig";

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
        console.log(`data ${JSON.stringify(body)}`);
        console.log(`url ${url}`);
        if (body) {
          config.data = body;
        }
        let response = await mainAxios(url, config).catch((err) => {
          if (err.response.status === 401) {
            dispatch(deauthorize());
            navigate("/login");
          }
        });

        return response;
      } catch (err) {
        console.log(err.status);
      }
    };
  }
}

export { useAxiosWrapper };

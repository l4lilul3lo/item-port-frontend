import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeResponseType } from "../../features/responseTypeSlice";
import { selectToken } from "../../features/tokenSlice";
import axios from "axios";
const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  console.log(token);
  const handleVerifyClick = async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/verify/${token}/?verifyMethod=on-site`
      );

      navigate("/verificationStatus");
      dispatch(storeResponseType(response.data.responseType));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Hello</h1>
      <h4>Verify your email by clicking on the link below!</h4>
      <h4>This link expires in 15 minutes</h4>
      <button onClick={() => handleVerifyClick(token)}>Verify email</button>
    </>
  );
};

export default Verification;

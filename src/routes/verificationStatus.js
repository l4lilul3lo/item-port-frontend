import { useSelector } from "react-redux";
import { selectResponseType } from "../features/responseTypeSlice";
import Confirmed from "../components/verification/Confirmed";
import Expired from "../components/verification/Expired";
import AlreadyVerified from "../components/verification/AlreadyVerified";

// select store state and display appropriate html.
const VerificationStatus = () => {
  const responseType = useSelector(selectResponseType);

  if (responseType === "confirmed") {
    return <Confirmed />;
  }

  if (responseType === "expired") {
    return <Expired />;
  }

  if (responseType === "alreadyVerified") {
    return <AlreadyVerified />;
  }

  return <h1>Something went wrong</h1>;
};

export default VerificationStatus;

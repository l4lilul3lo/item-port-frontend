import { useSelector } from "react-redux";

import { selectResponseType } from "../features/responseTypeSlice";

import Verification from "../components/verification/Verification";
import Reminder from "../components/verification/Reminder";

const Email = () => {
  const responseType = useSelector(selectResponseType);

  console.log(`responseType in email ${responseType}`);
  if (responseType === "verification") {
    return <Verification />;
  }

  if (responseType === "reminder") {
    return <Reminder />;
  }

  return <h1>Something went wrong</h1>;
};

export default Email;

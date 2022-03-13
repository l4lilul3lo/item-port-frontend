import { useSelector } from "react-redux";
import { selectMessage } from "../features/messageSlice";

const useGetMessage = () => {
  const message = useSelector(selectMessage);
  return message;
};

export { useGetMessage };

import { AxiosError } from "axios";
import toast from "react-hot-toast";

const errorHandler = (err: any) => {
  if (err instanceof AxiosError) {
    return toast.error(err.response?.data?.message);
  }
  return toast.error("Error ocurred !");
};

export { errorHandler };

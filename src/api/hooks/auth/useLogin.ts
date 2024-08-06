import getApiRoute from "@/config/getApiRoutes";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "../../useCreateApi";

interface ILoginResponse {
  access_token: string;
  tokenType: string;
  user: IUser;
  expires_at: Date;
}

interface IUser {
  name: string;
  email: string;
  mobileNo: string;
  gender: string;
  roles: string[];
  permissions: string[];
}

interface ILoginData {
  mobile_no: string;
  password: string;
}

const adminLogin = async (
  data: ILoginData,
  api: AxiosInstance
): Promise<ILoginResponse> => {
  const route = getApiRoute("login")();
  const result = await api.post(route, data);
  return result.data;
};

const useLogin = () => {
  const api = useCreateApi();
  const mutation = useMutation({
    mutationFn: (data: ILoginData) => adminLogin(data, api),
  });
  return mutation;
};

export default useLogin;

import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const createAdmin = async (data: any, api: AxiosInstance) => {
  const route = "/admin/register";
  const result = await api.post(route, {
    name: data.name,
    email: data.email,
    password: data.password,
    mobile_no: data.mobile_no,
    password_confirmation: data.password_confirmation,
    gender: data.gender,
    client_id: "1",
    role_ids: data.roles,
  });
  return result.data;
};

const useCreateAdmin = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => createAdmin(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        queryKey: ["admin_users"],
      });
    },
  });
  return mutation;
};

export default useCreateAdmin;

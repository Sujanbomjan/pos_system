import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getRoles = async (data: any, api: AxiosInstance) => {
  const route = "/roles";
  const result = await api.post(route, {
    name: data.name,
    permissions: data.permissions,
  });
  return result.data;
};

const useAddRoles = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => getRoles(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        queryKey: ["role_permission"],
      });
    },
  });
  return mutation;
};

export default useAddRoles;

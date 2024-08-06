import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const updateRole = async (data: any, api: AxiosInstance, id: string) => {
  const route = `/roles/${id}`;
  const result = await api.put(route, {
    name: data.name,
    permissions: data.permissions,
  });
  return result.data;
};

const useUpdateRoleById = (id: string) => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => updateRole(data, api, id),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        queryKey: ["role_permission"],
      });
    },
  });
  return mutation;
};

export default useUpdateRoleById;

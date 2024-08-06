import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const updateAdmin = async (data: any, api: AxiosInstance) => {
  const route = "/assign-role";
  const result = await api.post(route, {
    user_id: data.user_id,
    role_ids: data.roles,
  });
  return result.data;
};

const useUpdateAdmin = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => updateAdmin(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        queryKey: ["admin_users"],
      });
    },
  });
  return mutation;
};

export default useUpdateAdmin;

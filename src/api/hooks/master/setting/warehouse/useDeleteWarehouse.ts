import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  id: string;
}

const deleteWarehouse = async (
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("deleteWarehouse")(data.id);

  const result = await api.delete(route);
  return result.data;
};

const useDeleteWarehouse = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deleteWarehouse(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["warehouse"] });
    },
  });
  return mutation;
};

export default useDeleteWarehouse;

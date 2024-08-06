import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  id: string;
}

const deleteWarehouseProduct = async (
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("deleteWarehouseProduct")(data.id);

  const result = await api.delete(route);
  return result.data;
};

const useDeleteWarehouseProduct = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deleteWarehouseProduct(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["warehouse"] });
    },
  });
  return mutation;
};

export default useDeleteWarehouseProduct;

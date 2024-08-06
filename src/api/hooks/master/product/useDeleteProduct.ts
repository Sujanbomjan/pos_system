import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  id: string;
}

const deleteBrand = async (data: IPostData, api: AxiosInstance) => {
  const route = getApiRoute("deleteProduct")(data.id);

  const result = await api.delete(route);
  return result.data;
};

const useDeleteProduct = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deleteBrand(data, api),
    onSuccess: () => {
      client.invalidateQueries({
        predicate: (query) => {
          return ["products"].includes(query.queryKey[0] as string);
        },
      });
    },
  });
  return mutation;
};

export default useDeleteProduct;

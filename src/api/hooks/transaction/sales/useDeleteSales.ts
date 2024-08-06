import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  id: string;
}

const deleteSales = async (data: IPostData, api: AxiosInstance) => {
  const route = getApiRoute("deleteSales")(data.id);

  const result = await api.delete(route);
  return result.data;
};

const useDeleteSales = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deleteSales(data, api),
    onSuccess: () => {
      client.invalidateQueries({
        predicate: (query) => {
          return ["sales", "sales-all"].includes(query.queryKey[0] as string);
        },
      });
    },
  });
  return mutation;
};

export default useDeleteSales;

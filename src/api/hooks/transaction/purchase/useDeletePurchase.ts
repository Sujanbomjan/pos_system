import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  id: string;
}

const deletePurchase = async (data: IPostData, api: AxiosInstance) => {
  const route = getApiRoute("deletePurchase")(data.id);

  const result = await api.delete(route);
  return result.data;
};

const useDeletePurchase = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deletePurchase(data, api),
    onSuccess: () => {
      client.invalidateQueries({
        predicate: (query) => {
          return ["purchase", "purchase-all"].includes(
            query.queryKey[0] as string
          );
        },
      });
    },
  });
  return mutation;
};

export default useDeletePurchase;

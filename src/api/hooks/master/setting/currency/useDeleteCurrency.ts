import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  id: string;
}

const deleteCurrency = async (data: IPostData, api: AxiosInstance) => {
  const route = getApiRoute("deleteCurrency")(data.id);

  const result = await api.delete(route);
  return result.data;
};

const useDeleteCurrency = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deleteCurrency(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["currency"] });
    },
  });
  return mutation;
};

export default useDeleteCurrency;

import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  code: string;
  name: string;
  auto_update: string;
  rate: number;
  symbol: string;
}

const editCurrency = async (
  currencyId: string,
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("editCurrency")(currencyId);

  const result = await api.put(route, data);
  return result.data;
};

const useEditCurrency = (currencyId: string) => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => editCurrency(currencyId, data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["brands"] });
    },
  });
  return mutation;
};

export default useEditCurrency;

import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  code: string;
  name: string;
  rate: string;
  auto_update: string;
  symbol: string;
}

const addCurrency = async (data: IPostData, api: AxiosInstance) => {
  const route = "/sma-currencies";

  const result = await api.post(route, {
    ...data,
    // auto_update: data.auto_update === "true" ? true : false,
  });
  return result.data;
};

const useAddCurrency = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => addCurrency(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["currency"] });
    },
  });
  return mutation;
};

export default useAddCurrency;

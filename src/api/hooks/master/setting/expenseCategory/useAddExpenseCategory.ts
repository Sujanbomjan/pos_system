import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "@/api/useCreateApi";
export interface IPostData {
  code: string;
  name: string;
}

const addExpenseCategory = async (data: IPostData, api: AxiosInstance) => {
  const route = "/sma-expense-categories";

  const result = await api.post(route, data);
  return result.data;
};

const useAddExpenseCategory = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => addExpenseCategory(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["expensecategory"] });
    },
  });
  return mutation;
};

export default useAddExpenseCategory;

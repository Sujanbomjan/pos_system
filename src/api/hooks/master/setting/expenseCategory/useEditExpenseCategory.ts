import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  code: string;
  name: string;
}

const editCurrency = async (
  expenseId: string,
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("editExpenseCategory")(expenseId);

  const result = await api.put(route, data);
  return result.data;
};

const useEditExpenseCategory = (expenseId: string) => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => editCurrency(expenseId, data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["expensecategory"] });
    },
  });
  return mutation;
};

export default useEditExpenseCategory;

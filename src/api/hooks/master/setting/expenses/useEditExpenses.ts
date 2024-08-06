import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  created_by: string;
  note: string;
  category_id: string;
  warehouse_id: string;
  amount: string;
  reference: string;
}

const editExpenses = async (
  expensesId: string,
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("editExpenses")(expensesId);

  const result = await api.put(route, data);
  return result.data;
};

const useEditExpenses = (expensesId: string) => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => editExpenses(expensesId, data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
  return mutation;
};

export default useEditExpenses;

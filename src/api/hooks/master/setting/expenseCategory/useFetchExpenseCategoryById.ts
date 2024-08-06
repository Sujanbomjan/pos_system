import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { SingleExpenseCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getExpenseCategory = async (
  api: AxiosInstance,
  expenseId: string
): Promise<SingleExpenseCategory> => {
  const route = getApiRoute("getExpenseCategoryById")(expenseId);
  const result = await api.get(route);
  return result.data;
};

const useFetchExpenseCategoryById = (expenseId: string) => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["expensecategory", expenseId],
    queryFn: () => getExpenseCategory(api, expenseId),
    enabled: !!expenseId,
  });
  return result;
};

export default useFetchExpenseCategoryById;

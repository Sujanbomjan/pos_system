import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { SingleExpenseCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getExpensesById = async (
  api: AxiosInstance,
  expensesId: string
): Promise<SingleExpenseCategory> => {
  const route = getApiRoute("getExpensesById")(expensesId);
  const result = await api.get(route);
  return result.data;
};

const useFetchExpensesById = (expensesId: string) => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["expensecategory", expensesId],
    queryFn: () => getExpensesById(api, expensesId),
    enabled: !!expensesId,
  });
  return result;
};

export default useFetchExpensesById;

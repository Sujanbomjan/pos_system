import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  id: string;
}

const deleteExpenseCategory = async (
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("deleteExpenseCategory")(data.id);

  const result = await api.delete(route);
  return result.data;
};

const useDeleteExpenseCategory = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deleteExpenseCategory(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["currency"] });
    },
  });
  return mutation;
};

export default useDeleteExpenseCategory;

import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  id: string;
}

const deleteExpenses = async (
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("deleteExpenses")(data.id);

  const result = await api.delete(route);
  return result.data;
};

const useDeleteExpenses = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deleteExpenses(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
  return mutation;
};

export default useDeleteExpenses;

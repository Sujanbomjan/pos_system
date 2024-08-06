import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "@/api/useCreateApi";

export interface IPostData {
  created_by: string;
  note: string;
  category_id: string;
  warehouse_id: string;
  attachment: any[];
  amount: string;
  reference: string;
}

const addExpenses = async (data: IPostData, api: AxiosInstance) => {
  const route = "/sma-expenses";

  const formData = new FormData();

  formData.append("created_by", data.created_by);
  formData.append("category_id", data.category_id);
  formData.append("warehouse_id", data.warehouse_id);
  formData.append("note", data.note);
  formData.append("amount", data.amount);
  formData.append("reference", data.reference);
  formData.append("attachment", data.attachment[0]);

  const result = await api.post(route, formData);
  return result.data;
};

const useAddExpenses = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => addExpenses(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
  return mutation;
};

export default useAddExpenses;

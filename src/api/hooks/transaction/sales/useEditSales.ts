import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const editSales = async (data: any, api: AxiosInstance) => {
  const { sales_id, ...salesData } = data;
  const route = `/sma-sales/update-status/${sales_id}`;

  const result = await api.post(route, {
    id: sales_id,
    note: salesData.note,
    sale_status: salesData.sale_status,
  });

  return result.data;
};

const useEditSales = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => editSales(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        predicate: (query) => {
          return ["sales", "sales-all"].includes(query.queryKey[0] as string);
        },
      });
    },
  });
  return mutation;
};

export default useEditSales;

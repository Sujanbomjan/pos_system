import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const addProduct = async (data: any, api: AxiosInstance) => {
  const { purchase_id, ...purchaseData } = data;
  const route = `/sma-transfers/update-status/${purchase_id}`;

  const result = await api.post(route, {
    id: purchase_id,
    note: purchaseData.note,
    status: purchaseData.status,
  });

  return result.data;
};

const useEditUpdateStatus = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => addProduct(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        predicate: (query) => {
          return ["transfer"].includes(query.queryKey[0] as string);
        },
      });
    },
  });
  return mutation;
};

export default useEditUpdateStatus;

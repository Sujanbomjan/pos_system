import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const editTransfer = async (data: any, api: AxiosInstance) => {
  const { purchase_id, selectedProducts, purchaseData } = data;
  const route = `/sma-transfers/update/${purchase_id}`;
  const result = await api.post(route, {
    from_warehouse_id: purchaseData.from_warehouse_id,
    to_warehouse_id: purchaseData.to_warehouse_id,
    note: purchaseData.note ?? "",
    status: purchaseData.status,
    shipping: purchaseData.shipping ?? 0,
    attachment: purchaseData.attachment ?? "",
    items: selectedProducts.map((product: any) => ({
      id: product.id,
      product_id: product.product_id,
      unit_price: product.net_unit_cost ?? 0,
      quantity: product.quantity,
      product_unit_id: product.product_unit_id,
    })),
  });

  return result.data; 
};

const useEditTransfer = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => editTransfer(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        predicate: (query) => {
          return ["purchase", "purchase-all"].includes(
            query.queryKey[0] as string
          );
        },
      });
    },
  });
  return mutation;
};

export default useEditTransfer;

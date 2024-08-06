import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { parse } from "cookie";

const addTransfer = async (data: any, api: AxiosInstance, userId: string) => {
  const route = "/sma-transfers";

  const { data: purchaseData, selectedProducts } = data;

  const result = await api.post(route, {
    from_warehouse_id: purchaseData.from_warehouse_id,
    to_warehouse_id: purchaseData.to_warehouse_id,
    transfer_no: purchaseData.transfer_no,
    note: purchaseData.note || "",
    created_by: "",
    shipping: purchaseData.shipping || 0,
    warehouse_id: purchaseData.warehouse_id,
    status: purchaseData.status,
    attachment: purchaseData.attachment[0] || "",
    items: selectedProducts.map((product: any) => ({
      product_id: product.id,
      option_id: product.option_id,
      expiry: product.expiry,
      quantity: product.quantity,
      product_unit_id: product.unit.id,
    })),
  });

  return result.data;
};

const useAddTransfer = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      const cookies = parse(document.cookie || "");
      const userId = cookies.id;

      return addTransfer(data, api, userId);
    },
    onSuccess: () => {
      client.invalidateQueries({
        predicate: (query) => {
          return ["transfer", "transfer-all"].includes(
            query.queryKey[0] as string
          );
        },
      });
    },
  });

  return mutation;
};

export default useAddTransfer;

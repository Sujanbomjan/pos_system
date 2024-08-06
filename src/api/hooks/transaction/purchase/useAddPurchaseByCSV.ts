import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const addProduct = async (data: any, api: AxiosInstance) => {
  const route = "/sma-purchases";

  const { data: purchaseData, tableOptions, purchase_id } = data;
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;

  const formData = new FormData();
  formData.append("id", purchase_id);
  formData.append("supplier_id", purchaseData.supplier_id);
  formData.append("warehouse_id", purchaseData.warehouse_id);
  formData.append("note", purchaseData.note ?? null);
  formData.append("status", purchaseData.status);
  formData.append("order_discount", purchaseData.order_discount ?? 0);
  formData.append("order_tax_id", purchaseData.order_tax_id ?? "");
  formData.append("shipping", purchaseData.shipping ?? 0);
  formData.append("purchase_item_import", purchaseData.purchase_item_import[0]);
  formData.append("attachment", purchaseData.attachment ?? null);

  const result = await api.post(route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};

const useAddPurchase = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => addProduct(data, api),
    onSuccess: () => {
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

export default useAddPurchase;

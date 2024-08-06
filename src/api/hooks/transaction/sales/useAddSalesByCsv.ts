import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
const addSales = async (data: any, api: AxiosInstance) => {
  const route = "/sma-sales";

  const { data: purchaseData, selectedProducts } = data;
  const formData = new FormData();

  formData.append("reference_no", purchaseData.reference_no ?? "");
  formData.append("biller_id", purchaseData.biller_id);
  formData.append("warehouse_id", purchaseData.warehouse_id);
  formData.append("customer_id", purchaseData.customer_id);
  formData.append("order_tax", purchaseData.order_tax ?? "");
  formData.append("sale_item_import", purchaseData.sale_item_import[0]);
  formData.append("order_discount", purchaseData.order_discount ?? 0);
  formData.append("shipping", purchaseData.shipping ?? 0);
  formData.append("attachment", purchaseData.attachment ?? "");
  formData.append("sale_status", purchaseData.sale_status);
  formData.append("payment_term", purchaseData.payment_term ?? 0);
  formData.append("payment_status", purchaseData.payment_status);
  formData.append("tax_rate", purchaseData.tax_rate);
  formData.append("note", purchaseData.note ?? "");
  formData.append("staff_note", purchaseData.staff_note ?? "");

  const result = await api.post(route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};

const useAddSalesByCsv = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => addSales(data, api),
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

export default useAddSalesByCsv;

import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const addSales = async (data: any, api: AxiosInstance) => {
  const route = "/sma-sales";

  const { data: purchaseData, selectedProducts } = data;
  const result = await api.post(route, {
    date: purchaseData.date,
    reference_no: purchaseData.reference_no,
    biller_id: purchaseData.biller_id,
    warehouse_id: purchaseData.warehouse_id,
    customer_id: purchaseData.customer_id,
    order_tax_id: purchaseData.order_tax,
    order_discount: purchaseData.order_discount,
    shipping: purchaseData.shipping,
    attachment: purchaseData.attachment[0],
    sale_status: purchaseData.sale_status,
    payment_term: purchaseData.payment_term,
    payment_status: purchaseData.payment_status,
    tax_rate: purchaseData.tax_rate,
    note: purchaseData.note,
    staff_note: purchaseData.staff_note,
    items: selectedProducts.map((product: any) => ({
      product_id: product.id,
      net_unit_price: product.price,
      item_discount: product.item_discount,
      // tax_rate_id: purchaseData.order_tax,
      unit_price: product.price,
      quantity: product.quantity,
      warehouse_id: purchaseData.warehouse_id,
      date: purchaseData.date,
      status: purchaseData.status,
      unit_quantity: product.quantity,
      product_unit_id: product.unit,
    })),
  });

  return result.data;
};

const useAddSales = () => {
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

export default useAddSales;

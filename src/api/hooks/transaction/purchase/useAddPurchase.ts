import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const addProduct = async (data: any, api: AxiosInstance) => {
  const route = "/sma-purchases";

  const { data: purchaseData, selectedProducts, purchase_id } = data;

  const result = await api.post(route, {
    id: purchase_id,
    reference_no: purchaseData.reference_no,
    warehouse_id: purchaseData.warehouse_id,
    status: purchaseData.status,
    date: purchaseData.date,
    attachment: purchaseData.attachment[0],
    supplier_id: purchaseData.supplier_id,
    order_tax_id: purchaseData.order_tax,
    // order_tax: purchaseData.order_tax,
    order_discount: purchaseData.order_discount,
    shipping: purchaseData.shipping,
    payment_term: purchaseData.payment_term,
    note: purchaseData.note,
    purchase_item: selectedProducts.map((product: any) => ({
      product_id: product.id,
      net_unit_price: product.cost,
      net_unit_cost: product.cost,
      item_discount: product.item_discount,
      // tax_rate_id: purchaseData.order_tax,
      unit_price: product.cost,
      quantity: product.quantity,
      warehouse_id: purchaseData.warehouse_id,
      date: purchaseData.date,
      status: purchaseData.status,
      unit_quantity: product.quantity,
      product_unit_id: product.unit.id,
    })),
  });

  return result.data;
};

const useAddPurchase = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => addProduct(data, api),
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

export default useAddPurchase;

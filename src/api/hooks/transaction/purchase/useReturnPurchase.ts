import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const addProduct = async (data: any, api: AxiosInstance) => {
  const { purchaseData, selectedProducts, purchase_id } = data;

  const payload = {
    purchase_id,
    customer_id: purchaseData.customer_id,
    biller_id: purchaseData.biller_id,
    reference_no: purchaseData.reference_no,
    warehouse_id: purchaseData.warehouse_id,
    note: purchaseData.note,
    staff_note: purchaseData.staff_note,
    product_discount: purchaseData.product_discount,
    order_discount_id: purchaseData.order_discount_id,
    order_discount: purchaseData.order_discount,
    product_tax: purchaseData.product_tax,
    order_tax: purchaseData.order_tax,
    paid: purchaseData.paid,
    surcharge: purchaseData.surcharge,
    attachment: purchaseData.attachment,
    hash: purchaseData.hash,
    cgst: purchaseData.cgst,
    sgst: purchaseData.sgst,
    igst: purchaseData.igst,
    shipping: purchaseData.shipping,
    purchase_items: selectedProducts.map((product: any) => ({
      product_id: product.product_id,
      option_id: product.option_id,
      // net_unit_price: product.net_unit_cost ?? 0,
      unit_price: product.net_unit_cost ?? 0,
      quantity: product.received_quantity,
      warehouse_id: product.warehouse_id,
      item_tax: product.item_tax,
      tax_rate_id: product.tax_rate_id,
      tax: product.tax,
      discount: product.discount,
      item_discount: product.item_discount,
      serial_no: product.serial_no,
      // real_unit_price: product.real_unit_cost ?? 0,
      product_unit_id: product.product_unit_id,
      unit_quantity: product.unit_quantity,
      comment: product.comment,
      gst: product.gst,
      cgst: product.cgst,
      sgst: product.sgst,
      igst: product.igst,
    })),
  };

  const route = `/sma-purchase-returns/${purchase_id}`;

  const result = await api.post(route, payload);
  return result.data;
};

const useReturnPurchase = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  return useMutation({
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
};

export default useReturnPurchase;

import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const addReturnSales = async (data: any, api: AxiosInstance) => {
  const { salesData, selectedProducts, sales_id } = data;

  const payload = {
    // sales_id,
    customer_id: salesData.customer_id,
    biller_id: salesData.biller_id,
    reference_no: salesData.reference_no,
    warehouse_id: salesData.warehouse_id,
    note: salesData.note,
    staff_note: salesData.staff_note,
    product_discount: salesData.product_discount,
    order_discount_id: salesData.order_discount_id,
    order_discount: salesData.order_discount,
    order_tax: salesData.order_tax ?? 0,
    product_tax: salesData.product_tax,
    paid: salesData.paid,
    surcharge: salesData.surcharge,
    attachment: salesData.attachment,
    hash: salesData.hash,
    cgst: salesData.cgst,
    sgst: salesData.sgst,
    igst: salesData.igst,
    shipping: salesData.shipping,
    created_by: salesData.created_by,
    items: selectedProducts.map((product: any) => ({
      product_id: product.product_id,
      option_id: product.option_id,
      // net_unit_price: product.net_unit_price ?? 0,
      unit_price: product.net_unit_price ?? 0,
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

  const route = `/sales-returns/${sales_id}`;

  const result = await api.post(route, payload);
  return result.data;
};

const useReturnSales = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data) => addReturnSales(data, api),
    onSuccess: () => {
      client.invalidateQueries({
        predicate: (query) => {
          return ["sales"].includes(query.queryKey[0] as string);
        },
      });
    },
  });
};

export default useReturnSales;

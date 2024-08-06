import useFetchCompanies from "@/api/hooks/master/company/useFetchCompany";
import useFetchProduct from "@/api/hooks/master/product/useFetchProduct";
import useFetchTax from "@/api/hooks/master/setting/taxes/useFectchTaxes";
import useFetchAllWarehouse from "@/api/hooks/master/setting/warehouse/useFetchAllWarehouse";
import { useAppDispatch } from "@/lib/hooks";
import { setProduct } from "@/lib/purchase/purchaseSlice";
import { IFormData } from "@/types/form";

const usePurchaseReturnData = () => {
  const { data: warehouseData } = useFetchAllWarehouse();

  const { data: companiesData } = useFetchCompanies("1000");

  const { data: productData } = useFetchProduct({ productLimit: "1000" });

  const dispatch = useAppDispatch();
  dispatch(setProduct(productData));

  const companiesOption = companiesData?.data[0].data.map(({ name, id }) => ({
    label: name,
    value: id.toString(),
  }));

  const warehouseOptions = warehouseData?.data[0].data.map(({ name, id }) => ({
    label: name,
    value: id.toString(),
  }));

  const productOptions = productData?.data[0].data.map((product) => ({
    label: product.name,
    value: product.id.toString(),
  }));

  const { data: taxData } = useFetchTax();

  const taxes = taxData?.data.map(({ id, type, title, value }) => ({
    label: `${title} (${type === "FLAT" ? `Rs ${value}` : `${value}%`})`,
    value: id.toString(),
  }));

  const status = [
    { label: "Received", value: "received" },
    { label: "Pending", value: "pending" },
    { label: "Ordered", value: "ordered" },
  ];

  const columns = [
    { name: "Date", uid: "date", isSortable: true },
    { name: "Reference Number", uid: "reference_no", isSortable: true },
    {
      name: "Supplier",
      uid: "supplier",
      isSortable: true,
      type: "object",
      objectField: "name",
    },
    { name: "Purchase Status", uid: "status", isSortable: true },
    { name: "Total", uid: "total", isSortable: true },
    { name: "Paid", uid: "paid", isSortable: true },
    { name: "Grand Total", uid: "grand_total", isSortable: true },
    { name: "Balance", uid: "balance", isSortable: true },
    { name: "Payment Status", uid: "payment_status", isSortable: true },
    { name: "Actions", uid: "actions" },
  ];

  const formData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "row",
          title: "",
          children: [
            {
              type: "date",
              name: "date",
              placeholder: "Enter Date",
              label: "Date",
            },
            {
              type: "text",
              name: "reference_no",
              placeholder: "Enter Reference Number",
              label: "Reference Number",
              optional: true,
            },
            {
              type: "text",
              name: "order_discount",
              placeholder: "Enter Discount",
              label: "Order Discount",
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "text",
              name: "surcharge",
              placeholder: "Enter Surcharge",
              label: "Return Surcharge",
            },
            {
              type: "fileInput",
              name: "attachment",
              placeholder: "Enter Attachments",
              label: "Attachments",
              optional: true,
            },
            {
              type: "async-select",
              name: "biller_id",
              placeholder: "Select Biller",
              label: "Biller",
              dropdownItem: companiesOption,
            },
          ],
        },
      ],
    },
  ];
  const noteFormData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "row",
          title: "",
          children: [
            {
              type: "textarea",
              name: "note",
              placeholder: "Enter Note",
              label: "Note",
              optional: true,
            },
          ],
        },
      ],
    },
  ];

  return {
    formData,
    columns,
    noteFormData,
  };
};

export default usePurchaseReturnData;

import useFetchCompanies from "@/api/hooks/master/company/useFetchCompany";
import useFetchProduct from "@/api/hooks/master/product/useFetchProduct";
import useFetchTax from "@/api/hooks/master/setting/taxes/useFectchTaxes";
import useFetchAllWarehouse from "@/api/hooks/master/setting/warehouse/useFetchAllWarehouse";
import { useAppDispatch } from "@/lib/hooks";
import { setProduct, setTax } from "@/lib/purchase/purchaseSlice";
import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

const usePurchaseData = () => {
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

  const { data: taxData } = useFetchTax();
  dispatch(setTax(taxData));

  const taxes = taxData?.data.map(({ id, type, title, value }) => ({
    label: `${title} (${type === "FLAT" ? `Rs ${value}` : `${value}%`})`,
    value: id.toString(),
  }));

  const productOptions = productData?.data[0].data?.map((product: any) => ({
    label: product?.name,
    value: product?.id.toString(),
  }));

  const status = [
    { label: "Completed", value: "Completed" },
    { label: "Received", value: "Received" },
    { label: "Pending", value: "Pending" },
  ];

  const columns: IColumns[] = [
    { name: "Reference Number", uid: "reference_no", isSortable: true },
    {
      name: "Supplier",
      uid: "supplier",
      isSortable: true,
      type: "object",
      objectField: "name",
    },
    {
      name: "Warehouse",
      uid: "warehouse",
      isSortable: false,
      type: "object",
      objectField: "name",
    },
    {
      name: "Purchase Status",
      uid: "status",
      isSortable: true,
      type: "boolean",
    },
    {
      name: "Payment Status",
      uid: "payment_status",
      isSortable: true,
      type: "boolean",
    },
    { name: "Purchase Total", uid: "grand_total", isSortable: true },
    { name: "Return Amount", uid: "return_purchase_total", type: "boolean" },
  ];

  const editFormData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "async-select",
          name: "status",
          placeholder: "Select Sale Status",
          label: "Status",
          dropdownItem: status,
        },
        {
          type: "textarea",
          name: "note",
          placeholder: "Enter Note",
          label: "Note",
          optional: true,
        },
      ],
    },
  ];

  const formData: IFormData[] = [
    {
      title: "Purchase Information",
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
              type: "async-select",
              name: "supplier_id",
              placeholder: "Enter Supplier",
              label: "Supplier",
              dropdownItem: companiesOption,
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              name: "status",
              placeholder: "Enter Status",
              label: "Status",
              dropdownItem: status,
            },
            {
              type: "fileInputType",
              name: "attachment",
              placeholder: "Enter Attachment",
              label: "Attachment",
              optional: true,
              folder: "Purchase",
            },
          ],
        },

        {
          type: "async-select",
          name: "warehouse_id",
          placeholder: "Enter Warehouse",
          label: "Warehouse",
          dropdownItem: warehouseOptions,
        },
        {
          type: "multi-select",
          name: "product",
          placeholder: "Enter Product",
          label: "Product",
          dropdownItem: productOptions,
        },
      ],
    },
  ];
  const secondFormData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              name: "order_tax",
              placeholder: "Enter Order Tax",
              label: "Order Tax",
              dropdownItem: taxes || [],
              optional: true,
            },
            {
              type: "text",
              name: "order_discount",
              placeholder: "Enter Discount Amount",
              label: "Discount Amount",
              optional: true,
            },
            {
              type: "text",
              name: "shipping",
              placeholder: "Enter Shipping",
              label: "Shipping",
              optional: true,
            },
          ],
        },
        {
          type: "text",
          name: "payment_term",
          placeholder: "Enter Payment Term",
          label: "Payment Term",
          optional: true,
        },
        {
          type: "textarea",
          name: "note",
          placeholder: "Enter Note",
          label: "Note",
          optional: true,
        },
      ],
    },
  ];
  const formDataByCsv: IFormData[] = [
    {
      title: "Purchase Information",
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
              type: "async-select",
              name: "warehouse_id",
              placeholder: "Enter Warehouse",
              label: "Warehouse",
              dropdownItem: warehouseOptions,
            },
          ],
        },
        {
          type: "row",
          title: "",
          className: "w-[66%]",
          children: [
            {
              type: "async-select",
              name: "status",
              placeholder: "Enter Status",
              label: "Status",
              dropdownItem: status,
            },
            {
              type: "async-select",
              name: "supplier_id",
              placeholder: "Enter Supplier Company Name",
              label: "Supplier",
              dropdownItem: companiesOption,
            },
          ],
        },
      ],
    },
  ];
  const DataByCSV: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "row",
          title: "",
          className: "w-[50%]",
          children: [
            {
              type: "fileInput",
              name: "purchase_item_import",
              placeholder: "Import CSV File",
              label: "CSV File",
            },
          ],
        },
        {
          type: "row",
          title: "",
          className: "w-[50%]",
          children: [
            {
              type: "fileInputType",
              name: "attachment",
              placeholder: "Import Attachment",
              label: "Attachment",
              optional: true,
              folder: "Purchase",
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "checkbox",
              name: "moreOptions",
              placeholder: "Enter Checkbox",
              label: "More Options",
            },
          ],
        },
      ],
    },
  ];
  const moreOptionsData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              name: "order_tax",
              placeholder: "Enter Order Tax",
              label: "Order Tax",
              dropdownItem: taxes || [],
              optional: true,
            },
            {
              type: "text",
              name: "order_discount",
              placeholder: "Enter Discount Amount",
              label: "Discount Amount",
              optional: true,
            },
            {
              type: "text",
              name: "shipping",
              placeholder: "Enter Shipping",
              label: "Shipping",
              optional: true,
            },
          ],
        },
      ],
    },
  ];
  const quillEditorData: IFormData[] = [
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
    secondFormData,
    columns,
    formDataByCsv,
    DataByCSV,
    moreOptionsData,
    quillEditorData,
    editFormData,
  };
};

export default usePurchaseData;

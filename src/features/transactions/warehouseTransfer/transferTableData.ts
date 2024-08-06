import useFetchCompanies from "@/api/hooks/master/company/useFetchCompany";
import useFetchProduct from "@/api/hooks/master/product/useFetchProduct";
import useFetchTax from "@/api/hooks/master/setting/taxes/useFectchTaxes";
import useFetchAllWarehouse from "@/api/hooks/master/setting/warehouse/useFetchAllWarehouse";
import { useMutationFetchWarehouseProducts } from "@/api/hooks/master/setting/warehouseProduct/useFectchWarehouseProduct";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setProduct, setTax } from "@/lib/purchase/purchaseSlice";
import { RootState } from "@/lib/store";
import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";
import { useEffect, useState } from "react";

const useTrasnferData = () => {
  const warehouse_name = useAppSelector(
    (state: RootState) => state.transfer.from_warehouse_id
  );
  const { data: warehouseData } = useFetchAllWarehouse();

  const { data: companiesData } = useFetchCompanies("1000");

  const mutation = useMutationFetchWarehouseProducts({
    productLimit: "1000",
    warehouse_id: warehouse_name ?? null,
  });

  const [productData, setProductData] = useState<any>([]);

  useEffect(() => {
    if (warehouse_name) {
      const data: any = {
        productLimit: "1000",
        warehouse_id: warehouse_name ?? null,
      };
      mutation.mutate(data, {
        onSuccess: (data) => {
          setProductData(data.data[0].data);
        },
      });
    } else {
      setProductData([]);
    }
  }, [warehouse_name]);

  const dispatch = useAppDispatch();
  dispatch(setProduct(mutation.data));

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

  const productOptions = productData?.map((product: any) => ({
    label: product?.product?.name,
    value: product?.product?.id.toString(),
  }));

  const status = [
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Pending", value: "pending" },
  ];

  const columns: IColumns[] = [
    { name: "Reference Number", uid: "transfer_no", isSortable: true },
    {
      name: "From Warehouse",
      uid: "from_warehouse_name",
    },
    {
      name: "To Warehouse",
      uid: "to_warehouse_name",
    },
    {
      name: "Total",
      uid: "total",
      isSortable: true,
    },
    {
      name: "Grand Total",
      uid: "grand_total",
      isSortable: true,
    },
    {
      name: "Status",
      uid: "status",
      isSortable: true,
      type: "boolean",
    },
    { name: "Actions", uid: "actions" },
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
              name: "transfer_no",
              placeholder: "Enter Reference Number",
              label: "Reference Number",
              optional: true,
            },
            {
              type: "async-select",
              name: "from_warehouse_id",
              placeholder: "Enter Warehouse",
              label: "From Warehouse",
              dropdownItem: warehouseOptions,
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
              type: "number",
              name: "shipping",
              placeholder: "Enter Shipping",
              label: "Shipping",
              optional: true,
            },
            {
              type: "fileInputType",
              name: "attachment",
              placeholder: "Enter Attachment",
              label: "Attachment",
              optional: true,
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              name: "to_warehouse_id",
              placeholder: "Select Warehouse",
              label: "To Warehouse",
              dropdownItem: warehouseOptions,
            },
          ],
        },
        {
          type: "multi-select",
          name: "transfer_items",
          placeholder: "Enter Product",
          label: "Product",
          dropdownItem: productOptions,
        },
      ],
    },
  ];
  const editTransferForm: IFormData[] = [
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
              name: "transfer_no",
              placeholder: "Enter Reference Number",
              label: "Reference Number",
              optional: true,
            },
            {
              type: "async-select",
              name: "from_warehouse_id",
              placeholder: "Enter Warehouse",
              label: "From Warehouse",
              dropdownItem: warehouseOptions,
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
              type: "number",
              name: "shipping",
              placeholder: "Enter Shipping",
              label: "Shipping",
              optional: true,
            },
            {
              type: "fileInputType",
              name: "attachment",
              placeholder: "Enter Attachment",
              label: "Attachment",
              optional: true,
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              name: "to_warehouse_id",
              placeholder: "Select Warehouse",
              label: "To Warehouse",
              dropdownItem: warehouseOptions,
            },
          ],
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
              placeholder: "Enter Discount (5/5%)",
              label: "Discount (5/5%)",
              optional: true,
            },
            {
              type: "number",
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
    editTransferForm,
    formDataByCsv,
    DataByCSV,
    moreOptionsData,
    quillEditorData,
    editFormData,
  };
};

export default useTrasnferData;

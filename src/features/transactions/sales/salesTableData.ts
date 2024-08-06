import useFetchCompanies from "@/api/hooks/master/company/useFetchCompany";
import useFetchTax from "@/api/hooks/master/setting/taxes/useFectchTaxes";
import useFetchAllWarehouse from "@/api/hooks/master/setting/warehouse/useFetchAllWarehouse";
import { useMutationFetchWarehouseProducts } from "@/api/hooks/master/setting/warehouseProduct/useFectchWarehouseProduct";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setProduct, setTax } from "@/lib/sales/salesSlice";
import { RootState } from "@/lib/store";
import { IFormData } from "@/types/form";
import { useEffect, useState } from "react";

const useSalesData = () => {
  const warehouse_name = useAppSelector(
    (state: RootState) => state.sales.warehouse_id
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
    { label: "Completed", value: "Completed" },
    { label: "Received", value: "Received" },
    { label: "Pending", value: "Pending" },
  ];

  const columns = [
    { name: "Reference Number", uid: "reference_no", isSortable: true },
    {
      name: "Biller",
      uid: "biller",
      isSortable: true,
      type: "object",
      objectField: "name",
    },
    {
      name: "Customer",
      uid: "customer",
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
      name: "Sale Status",
      uid: "sale_status",
      isSortable: true,
      type: "boolean",
    },
    {
      name: "Payment Status",
      uid: "payment_status",
      isSortable: true,
      type: "boolean",
    },
    {
      name: "Sale Total",
      uid: "grand_total",
      isSortable: true,
    },
    { name: "Return Amount", uid: "return_sale_total", type: "boolean" },
  ];

  const editFormData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "async-select",
          name: "sale_status",
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
              name: "reference_no",
              placeholder: "Enter Reference Number",
              label: "Reference Number",
              optional: true,
            },
            {
              type: "async-select",
              name: "biller_id",
              placeholder: "Enter Biller",
              label: "Biller",
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
              name: "warehouse_id",
              placeholder: "Enter Warehouse",
              label: "Warehouse",
              dropdownItem: warehouseOptions,
            },
            {
              type: "async-select",
              name: "customer_id",
              placeholder: "Enter Customer",
              label: "Customer",
              dropdownItem: companiesOption,
            },
          ],
        },
        {
          type: "multi-select",
          name: "product",
          placeholder: "Enter Product Name",
          label: "Product",
          dropdownItem: productOptions,
        },
      ],
    },
  ];

  const orderFormData: IFormData[] = [
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
              label: "Order Tax",
              placeholder: "Enter Order Tax",
              dropdownItem: taxes || [],
              optional: true,
            },
            {
              type: "text",
              name: "order_discount",
              placeholder: "Enter Order Discount",
              label: "Order Discount",
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
          type: "row",
          title: "",
          children: [
            {
              type: "fileInputType",
              name: "attachment",
              placeholder: "Enter Attachment",
              label: "Attachment",
              optional: true,
              folder: "Sales",
            },
            {
              type: "async-select",
              name: "sale_status",
              placeholder: "Enter Sale Status",
              label: "Sale Status",
              dropdownItem: status,
            },
            {
              type: "text",
              name: "payment_term",
              placeholder: "Enter Payment Term",
              label: "Payment Term",
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
              name: "payment_status",
              label: "Payment Status",
              placeholder: "Enter Payment Status",
              dropdownItem: status,
            },
          ],
        },

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
            {
              type: "textarea",
              name: "staff_note",
              placeholder: "Enter Staff Note",
              label: "Staff Note",
              optional: true,
            },
          ],
        },
      ],
    },
  ];
  const formDataCsv: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "row",
          title: "",
          children: [
            {
              type: "date",
              name: "Date",
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
              name: "biller_id",
              placeholder: "Enter Biller",
              label: "Biller",
              dropdownItem: companiesOption,
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
              name: "warehouse_id",
              placeholder: "Enter Warehouse",
              label: "Warehouse",
              dropdownItem: warehouseOptions,
            },
            {
              type: "async-select",
              name: "customer_id",
              placeholder: "Enter Customer",
              label: "Customer",
              dropdownItem: companiesOption,
            },
          ],
        },
      ],
    },
  ];

  const orderFormDataCsv: IFormData[] = [
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
              name: "sale_item_import",
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
              type: "async-select",
              name: "order_tax",
              placeholder: "Select Order Tax",
              label: "Order Tax",
              dropdownItem: taxes || [],
              optional: true,
            },
            {
              type: "text",
              name: "order_discount",
              placeholder: "Enter Order Discount",
              label: "Order Discount",
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
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              name: "sale_status",
              placeholder: "Enter Sale Status",
              label: "Sale Status",
              dropdownItem: status,
            },
            {
              type: "text",
              name: "payment_term",
              placeholder: "Enter Payment Term",
              label: "Payment Term",
              optional: true,
            },
            {
              type: "async-select",
              name: "payment_status",
              label: "Payment Status",
              placeholder: "Enter Payment Status",
              dropdownItem: status,
            },
          ],
        },
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
            {
              type: "textarea",
              name: "staff_note",
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
    editFormData,
    orderFormData,
    columns,
    formDataCsv,
    orderFormDataCsv,
  };
};

export default useSalesData;

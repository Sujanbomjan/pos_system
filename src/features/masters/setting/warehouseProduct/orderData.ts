import useFetchProduct from "@/api/hooks/master/product/useFetchProduct";
import useFetchWarehouse from "@/api/hooks/master/setting/warehouse/useFectchWarehouse";
import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";
import { useMemo } from "react";
interface DropdownOption {
  label: string;
  value: string;
}

interface DataItem {
  id: number;
  name: string;
}

interface ApiResponse {
  data: {
    data: DataItem[];
  }[];
}
const mapDropdownData = (data: ApiResponse | undefined): DropdownOption[] => {
  return (
    data?.data[0].data.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    })) || [{ label: "", value: "" }]
  );
};
const useWarehouseProductData = () => {
  const { data: warehouseData } = useFetchWarehouse();
  const { data: productData } = useFetchProduct({ productLimit: "1000" });

  const productDropDownObject = useMemo(
    () =>
      productData?.data[0].data.map(({ id, name }) => ({
        label: name,
        value: id.toString(),
      })) || [],
    [productData]
  );
  const warehouseDropDownObject = useMemo(
    () =>
      warehouseData?.data[0].data.map(({ id, name }) => ({
        label: name,
        value: id.toString(),
      })) || [],
    [productData]
  );
  const productDropDown =
    productData?.data[0].data.reduce((acc, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {} as Record<string, string>) || {};

  const warehouseOptions =
    warehouseData?.data[0].data.reduce((acc, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {} as Record<string, string>) || {};

  const warehouseDropdown = mapDropdownData(warehouseData);

  const productOptions = productData?.data[0].data.map((product) => ({
    label: product.name,
    value: product.id.toString(),
  }));
  const columns: IColumns[] = [
    // {
    //   name: "Product Image",
    //   uid: "product",
    //   isSortable: true,
    //   type: "object",
    //   objectField: "image",
    // },
    {
      name: "Product Code",
      uid: "product",
      isSortable: true,
      type: "object",
      objectField: "code",
    },
    { name: "Product Name", uid: "product_id" },
    { name: "Warehouse Name", uid: "warehouse_id" },
    { name: "Quantity", uid: "quantity" },
    { name: "Created At", uid: "created_at", isSortable: true, type: "date" },
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
              type: "async-select",
              name: "product_id",
              placeholder: "Select Product Name",
              validation_regex: "",
              label: "Product Name",
              dropdownItem: productOptions,
            },
          ],
        },
        {
          type: "async-select",
          name: "warehouse_id",
          placeholder: "Select Warehouse Name",
          validation_regex: "",
          label: "Warehouse Name",
          dropdownItem: warehouseDropdown,
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "text",
              name: "quantity",
              placeholder: "Enter Quantity",
              validation_regex: "",
              label: "Quantity",
            },
          ],
        },
        {
          type: "text",
          name: "rack",
          placeholder: "Enter Rack",
          validation_regex: "",
          label: "Rack",
          optional: true,
        },
        {
          type: "text",
          name: "avg_cost",
          placeholder: "Enter Average Cost",
          validation_regex: "",
          label: "Average Cost",
        },
      ],
    },
  ];
  return {
    formData,
    columns,
    warehouseOptions,
    productDropDown,
    productDropDownObject,
    warehouseDropDownObject,
  };
};
export default useWarehouseProductData;

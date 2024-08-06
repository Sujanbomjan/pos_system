import useFetchCompanies from "@/api/hooks/master/company/useFetchCompany";
import useFetchBrandAll from "@/api/hooks/master/setting/brands/useFectchBrandAll";
import useFetchCategories from "@/api/hooks/master/setting/categories/useFectchCategories";
import useFetchParentCategories from "@/api/hooks/master/setting/categories/useFetchParentCategory";
import useFetchTax from "@/api/hooks/master/setting/taxes/useFectchTaxes";
import useFetchWarehouse from "@/api/hooks/master/setting/warehouse/useFectchWarehouse";
import useFetchUnit from "@/api/hooks/master/unit/useFetchUnit";
import useFetchBarcode from "@/api/hooks/useFetchBarcode";
import useFetchProductType from "@/api/hooks/useFetchProductType";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

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

const useProductData = () => {
  const { data } = useFetchBrandAll();
  const brandDropdown = mapDropdownData(data);

  // const { data: categoryData } = useFetchCategories("1000");
  // const categoryDropdown = mapDropdownData(categoryData);
  const parentCategoryId = useAppSelector(
    (state: RootState) => state.product.categoryId
  );

  const { data: warehouseData } = useFetchWarehouse();
  const warehouseDropdown = mapDropdownData(warehouseData);

  const { data: unitData } = useFetchUnit("1000");
  const unitDropdown = mapDropdownData(unitData);

  const { data: companyData } = useFetchCompanies("1000");
  const companyDropdown = mapDropdownData(companyData);

  const { data: parentCategory } = useFetchParentCategories();

  const parentDropDown = parentCategory?.data[0].data.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));
  const { data: subCategory } = useFetchParentCategories(
    parentCategoryId || "1"
  );
  const categoryDropdown = mapDropdownData(subCategory);

  const { data: barcode } = useFetchBarcode();
  const barcodeDropdown = barcode?.data.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));

  const { data: productTypeData } = useFetchProductType();
  const productTypeDropdown = productTypeData?.data.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));
  const { data: taxData } = useFetchTax();
  const taxesItem =
    taxData?.data.reduce((acc, { id, type }) => {
      acc[id] = type;
      return acc;
    }, {} as Record<string, string>) || {};

  const taxes = taxData?.data.map(({ id, type, title, value }) => ({
    label: `${title} (${type === "FLAT" ? `Rs ${value}` : `${value}%`})`,
    value: id.toString(),
  }));

  const productColumns: IColumns[] = [
    { name: "Image", uid: "image", type: "image" },
    { name: "Code", uid: "code", isSortable: true },
    { name: "Name", uid: "name", isSortable: true },
    {
      name: "Brand",
      uid: "brand",
      isSortable: true,
      type: "object",
      objectField: "name",
    },
    {
      name: "Category",
      uid: "category",
      isSortable: true,
      type: "object",
      objectField: "name",
    },
    { name: "Quantity", uid: "quantity", isSortable: true },
    { name: "Cost Price", uid: "cost", isSortable: true },
    { name: "Selling Price", uid: "price", isSortable: true },
    { name: "Created At", uid: "created_at", isSortable: true, type: "date" },
    { name: "Actions", uid: "actions" },
  ];

  const buttonForm: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "text",
          name: "",
          label: "",
        },
      ],
    },
  ];

  const productFormData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "title",
          title: "General Information",
          label: "",
          name: "",
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "text",
              name: "name",
              placeholder: "Enter product name",
              validation_regex: "",
              label: "Product Name",
            },
            {
              type: "text",
              name: "code",
              placeholder: "Enter product code",
              validation_regex: "",
              label: "Product Code",
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              name: "type",
              placeholder: "Enter product type",
              validation_regex: "",
              label: "Product Type",
              dropdownItem: productTypeDropdown,
            },
            {
              type: "async-select",
              dropdownItem: unitDropdown,
              name: "unit",
              placeholder: "Enter product unit",
              validation_regex: "",
              label: "Product Unit",
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "number",
              name: "weight",
              placeholder: "Enter product weight",
              validation_regex: "",
              label: "Weight (KG)",
              optional: true,
            },
            {
              type: "text",
              name: "second_name",
              placeholder: "Enter product second name",
              validation_regex: "",
              label: "Secondary Name",
              optional: true,
            },
          ],
        },
        {
          type: "title",
          title: "Pricing and Tax",
          label: "",
          name: "",
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              dropdownItem: barcodeDropdown,
              name: "barcode_symbology_id",
              validation_regex: "",
              label: "Barcode Symbology",
              placeholder: "Enter Barcode Symbology",
            },
            {
              type: "async-select",
              name: "brand",
              dropdownItem: brandDropdown || [],
              validation_regex: "",
              label: "Brand",
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "number",
              name: "alert_quantity",
              placeholder: "Enter alert quantity",
              validation_regex: "",
              label: "Alert Quantity",
            },
            {
              type: "async-select",
              label: "Category",
              dropdownItem: parentDropDown || [],
              name: "category_id",
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              label: "Sub Category",
              dropdownItem: categoryDropdown,
              name: "subcategory_id",
              optional: true,
            },
            {
              type: "number",
              name: "cost",
              label: "Cost Price",
              placeholder: "Enter Cost Price",
            },
          ],
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "number",
              name: "price",
              placeholder: "Enter Selling Price",
              label: "Selling Price",
            },
            {
              type: "async-select",
              name: "tax_rate",
              label: "Tax Rate",
              placeholder: "Enter tax rate",
              dropdownItem: taxes || [],
              optional: true,
            },
          ],
        },
        {
          type: "number",
          name: "promo_price",
          label: "Promo Price",
          placeholder: "Enter Promo Price",
          optional: true,
        },
      ],
    },
  ];

  const supplierFormData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "title",
          title: "Product Details",
          label: "",
          name: "",
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "textarea",
              label: "Product Details",
              name: "product_details",
              placeholder: "Enter Product details",
            },
          ],
        },
        {
          type: "fileInputType",
          name: "file",
          placeholder: "Upload FIle",
          validation_regex: "",
          label: "Upload File",
          optional: true,
          folder: "Product",
        },
        {
          type: "single-image",
          name: "image",
          placeholder: "Enter Image",
          validation_regex: "",
          label: "Product Image",
          folder: "Product",
        },
        {
          type: "file",
          name: "product_photos",
          placeholder: "Enter Product Photo",
          validation_regex: "",
          label: "Other Images",
          optional: true,
          folder: "Product",
        },
        {
          type: "row",
          title: "",
          className: "flex justify-around items-center",
          children: [
            {
              type: "checkbox",
              label: "Tax Method",
              name: "tax_method",
            },
            {
              type: "checkbox",
              name: "track_quantity",
              label: "Track Quantity",
            },
          ],
        },
        {
          type: "row",
          title: "",
          className: "flex justify-around items-center",
          children: [
            {
              type: "checkbox",
              name: "featured",
              label: "Featured",
            },
            {
              type: "checkbox",
              name: "hide_pos",
              label: "Hide in POS Module",
            },
          ],
        },
        {
          type: "row",
          title: "",
          className: "flex justify-around items-start",
          children: [
            {
              type: "checkbox",
              name: "hide",
              label: "Hide in Shop Module",
            },
            {
              type: "checkbox",
              name: "promotion",
              label: "Promotion",
            },
          ],
        },
        {
          label: "",
          name: "",
          type: "title",
          title: "Supplier Details",
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              name: "supplier1",
              label: "Supplier",
              optional: true,
              dropdownItem: companyDropdown,
            },
            {
              type: "number",
              name: "supplier1price",
              label: "Supplier Price",
              placeholder: "Enter Supplier Price",
              optional: true,
            },
            {
              type: "text",
              name: "supplier1_part_no",
              label: "Supplier Part Number",
              placeholder: "Enter Supplier Part Number",
              optional: true,
            },
          ],
        },
        {
          type: "checkbox",
          label: "This Product has multiple variant",
          name: "has_variant",
        },
      ],
    },
  ];

  const editFormData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "title",
          title: "Product Details",
          label: "",
          name: "",
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "textarea",
              label: "Product Details",
              name: "product_details",
              placeholder: "Enter Product details",
            },
          ],
        },
        {
          type: "fileInputType",
          name: "file",
          placeholder: "Upload FIle",
          validation_regex: "",
          label: "Upload File",
          optional: true,
          folder: "Product",
        },
        {
          type: "single-image",
          name: "image",
          placeholder: "Enter Image",
          validation_regex: "",
          label: "Product Image",
          folder: "Product",
        },
        {
          type: "file",
          name: "product_photos",
          placeholder: "Enter Product Photo",
          validation_regex: "",
          label: "Other Images",
          optional: true,
          folder: "Product",
        },
        {
          type: "row",
          title: "",
          className: "flex justify-around items-center",
          children: [
            {
              type: "checkbox",
              label: "Tax Method",
              name: "tax_method",
            },
            {
              type: "checkbox",
              name: "track_quantity",
              label: "Track Quantity",
            },
          ],
        },
        {
          type: "row",
          title: "",
          className: "flex justify-around items-center",
          children: [
            {
              type: "checkbox",
              name: "featured",
              label: "Featured",
            },
            {
              type: "checkbox",
              name: "hide_pos",
              label: "Hide in POS Module",
            },
          ],
        },
        {
          type: "row",
          title: "",
          className: "flex justify-around items-start",
          children: [
            {
              type: "checkbox",
              name: "hide",
              label: "Hide in Shop Module",
            },
            {
              type: "checkbox",
              name: "promotion",
              label: "Promotion",
            },
          ],
        },
        {
          label: "",
          name: "",
          type: "title",
          title: "Supplier Details",
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "async-select",
              name: "supplier1",
              label: "Supplier",
              optional: true,
              dropdownItem: companyDropdown,
            },
            {
              type: "text",
              name: "supplier1price",
              label: "Supplier Price",
              placeholder: "Enter Supplier Price",
              optional: true,
            },
            {
              type: "text",
              name: "supplier1_part_no",
              label: "Supplier Part Number",
              placeholder: "Enter Supplier Part Number",
              optional: true,
            },
          ],
        },
      ],
    },
  ];
  const importFormData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "row",
          title: "",
          children: [
            {
              type: "fileInput",
              name: "file",
              placeholder: "Enter File",
              validation_regex: "",
              label: "File",
            },
          ],
        },
      ],
    },
  ];

  return {
    productColumns,
    editFormData,
    productFormData,
    supplierFormData,
    importFormData,
    buttonForm,
  };
};
export default useProductData;

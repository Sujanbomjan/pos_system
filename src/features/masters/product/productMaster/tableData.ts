import { IFormData } from "@/types/form";

const columns = [
  { name: "Product Code", uid: "productCode" },
  { name: "Product Name", uid: "name" },
  { name: "Mother Pack", uid: "motherPack" },
  { name: "Brand", uid: "brand" },
  { name: "Business Unit", uid: "businessUnit" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const tableData = [
  {
    productCode: "P001",
    productName: "Product A",
    motherPack: "MP001",
    brand: "Brand X",
    businessUnit: "BU1",
    status: "Active",
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp',
  },
  {
    productCode: "P002",
    productName: "Product B",
    motherPack: "MP002",
    brand: "Brand Y",
    businessUnit: "BU2",
    status: "Active",
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp',
  },
  {
    productCode: "P003",
    productName: "Product C",
    motherPack: "MP003",
    brand: "Brand Z",
    businessUnit: "BU3",
    status: "Inactive",
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp',
  }
];

const filterFormData: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "product_code",
            placeholder: "Enter Product Code",
            validation_regex: "",
            label: "Prodcut Code",
          },
          {
            type: "text",
            name: "product_name",
            placeholder: "Enter Product Name",
            validation_regex: "",
            label: "Prodcut Name",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "dropdown",
            name: "mother_pack",
            placeholder: "Select Mother Pack",
            label: "Mother Pack",
            validation_regex: "",
            dropdownItem: [
              {
                label: "1",
                value: "1",
              },
              {
                label: "2",
                value: "2",
              },
              {
                label: "3",
                value: "3",
              },
            ],
          },
          {
            type: "text",
            name: "mother_pack",
            placeholder: "Enter base unit",
            validation_regex: "",
            label: "Base Unit",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "weight",
            placeholder: "Enter Weight",
            validation_regex: "",
            label: "Weight",
          },
          {
            type: "text",
            name: "shelf_life",
            placeholder: "Enter Shelf Life",
            validation_regex: "",
            label: "Shelf Life",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "dropdown",
            name: "status",
            placeholder: "select",
            label: "Status",
            validation_regex: "",
            dropdownItem: [
              {
                label: "1",
                value: "1",
              },
              {
                label: "2",
                value: "2",
              },
              {
                label: "3",
                value: "3",
              },
            ],
          },
          {
            type: "text",
            name: "discount",
            placeholder: "Enter Shelf Life",
            validation_regex: "",
            label: "Discount",
          },
          {
            type: "dropdown",
            name: "is_incentive",
            placeholder: "select",
            label: "Is Incentive",
            validation_regex: "",
            dropdownItem: [
              {
                label: "1",
                value: "1",
              },
              {
                label: "2",
                value: "2",
              },
              {
                label: "3",
                value: "3",
              },
            ],
          },
          {
            type: "dropdown",
            name: "house",
            placeholder: "select",
            label: "House",
            validation_regex: "",
            dropdownItem: [
              {
                label: "1",
                value: "1",
              },
              {
                label: "2",
                value: "2",
              },
              {
                label: "3",
                value: "3",
              },
            ],
          },
        ],
      },
    ],
  },
];

export { columns, filterFormData, tableData };

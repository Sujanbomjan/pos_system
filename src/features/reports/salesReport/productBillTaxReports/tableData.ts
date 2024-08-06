import { IFormData } from "@/types/form";

const columns = [
  { name: "VCHRNO", uid: "vchrno" },
  { name: "Channel Name", uid: "channel_name" },
  { name: "Sub-Channel", uid: "subb_channel" },
  { name: "Retialer Code", uid: "retailer_code" },
  { name: "Retailer name", uid: "retailer_name" },
  { name: "Sales Invoice Date", uid: "date" },
  { name: "Brand Name", uid: "brand_name" },
  { name: "Mother Pack Name", uid: "pack_name" },
  { name: "Product Code", uid: "product_code" },
  { name: "Product name", uid: "name" },
  { name: "Batch", uid: "batch" },
  { name: "MRP", uid: "mrp" },
  { name: "Selling Rate", uid: "selling_rate" },
  { name: "Quantity Billed", uid: "quantity_billed" },
  { name: "Quantity Billed (Case)", uid: "quantity_billed_case" },
];

const tableData = [
  {
    vchrno: "P001",
    channel_name: "Product A",
    subb_channel: "MP001",
    retailer_code: "Brand X",
    retailer_name: "BU1",
    date: "Brand X",
    brand_name: "BU1",
    pack_name: "BU1",
    product_code: "BU1",
    ProductName: "BU1",
    batch: "BU1",
    cerelac_5: "BU1",
    selling_rate: "BU1",
    quantity_billed: "BU1",
    quantity_billed_case: "BU1",
    avatar:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp",
  },
  {
    vchrno: "P001",
    channel_name: "Product A",
    subb_channel: "MP001",
    retailer_code: "Brand X",
    retailer_name: "BU1",
    date: "Brand X",
    brand_name: "BU1",
    pack_name: "BU1",
    product_code: "BU1",
    ProductName: "BU1",
    batch: "BU1",
    cerelac_5: "BU1",
    selling_rate: "BU1",
    quantity_billed: "BU1",
    quantity_billed_case: "BU1",
    avatar:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp",
  },
  {
    vchrno: "P001",
    channel_name: "Product A",
    subb_channel: "MP001",
    retailer_code: "Brand X",
    retailer_name: "BU1",
    date: "Brand X",
    brand_name: "BU1",
    pack_name: "BU1",
    product_code: "BU1",
    ProductName: "BU1",
    batch: "BU1",
    cerelac_5: "BU1",
    selling_rate: "BU1",
    quantity_billed: "BU1",
    quantity_billed_case: "BU1",
    avatar:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp",
  },
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
            type: "date",
            name: "from_date",
            placeholder: "Enter Date",
            validation_regex: "",
            label: "From: (AD)",
          },
          {
            type: "date",
            name: "to_date",
            placeholder: "Enter Date",
            validation_regex: "",
            label: "To Date",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "brand",
            placeholder: "Enter brand",
            label: "Brand",
            validation_regex: "",
          },
          {
            type: "dropdown",
            name: "order_by",
            placeholder: "Select Order By",
            validation_regex: "",
            label: "Order By",
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
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "retailer",
            placeholder: "Enter Retailer",
            validation_regex: "",
            label: "Retailer",
          },
          {
            type: "text",
            name: "channel",
            placeholder: "Enter Channel",
            validation_regex: "",
            label: "Channel",
          },
        ],
      },
    ],
  },
];

export { columns, filterFormData, tableData };

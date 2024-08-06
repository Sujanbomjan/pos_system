import { IFormData } from "@/types/form";
const columns = [
  { name: "SNO.", uid: "sno" },
  { name: "Code", uid: "code" },
  { name: "Description", uid: "desc" },
  { name: "Batch No", uid: "batch_no" },
  { name: "Each", uid: "each" },
  { name: "Rate", uid: "rate" },
  { name: "Amount", uid: "amount" },
  { name: "Discount %", uid: "discount" },
  { name: "Discount Amount", uid: "discount_amt" },
  { name: "F Dis", uid: "d_dis" },
  { name: "MRP", uid: "mrp" },
  { name: "Vat", uid: "vat" },
  { name: "Net Amount", uid: "net_amt" },
  { name: "Remarks", uid: "remarks" },
];
const inventory: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "async-select",
            name: "bill_type",
            placeholder: "Enter  Bill Type",
            validation_regex: "",
            label: "Bill Type",
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
            type: "async-select",
            name: "from_goDown",
            placeholder: "Enter from godown",
            validation_regex: "",
            label: "From Godown",
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
            type: "async-select",
            name: "to_godown",
            placeholder: "Enter To godown",
            validation_regex: "",
            label: "To Godown",
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
            name: "voucher_no",
            placeholder: "Enter Voucher Number",
            validation_regex: "",
            label: "Voucher Number",
          },
          {
            type: "date",
            name: "tm_date",
            placeholder: "Enter tm date",
            label: "Tm Date",
            validation_regex: "",
          },
          {
            type: "text",
            name: "remrarks",
            placeholder: "Enter Remakrs",
            validation_regex: "",
            label: "Remarks",
          },
        ],
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
            type: "text",
            name: "code",
            placeholder: "Enter Code",
            validation_regex: "",
            label: "Code",
          },
          {
            type: "text",
            name: "batch_no",
            placeholder: "Enter batch No",
            validation_regex: "",
            label: "Batch No",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "each",
            placeholder: "Enter Each",
            validation_regex: "",
            label: "Each",
          },
          {
            type: "text",
            name: "rate",
            placeholder: "Enter Rate",
            validation_regex: "",
            label: "Rate",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "amount",
            placeholder: "Enter Amount",
            validation_regex: "",
            label: "Amount",
          },
          {
            type: "text",
            name: "mrp",
            placeholder: "Enter Mrp",
            validation_regex: "",
            label: "MRP",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "vat",
            placeholder: "Enter your VAT",
            label: "VAT",
            validation_regex: "",
          },
          {
            type: "text",
            name: "net_amt",
            placeholder: "Enter Net Amount",
            validation_regex: "",
            label: "Net Amount",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "desc",
            placeholder: "Enter your VAT",
            label: "Description",
            validation_regex: "",
          },
          {
            type: "textarea",
            name: "remarks",
            placeholder: "Enter Net Amount",
            validation_regex: "",
            label: "Remarks",
          },
        ],
      },
    ],
  },
];

export { columns, inventory, formData };

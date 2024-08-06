import { IFormData, IFormItem } from "@/types/form";
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
const selfBIll: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "customer",
            placeholder: "Enter  Customer",
            validation_regex: "",
            label: "Customer",
          },
          {
            type: "text",
            name: "bill_no",
            placeholder: "Enter Invoice Number",
            validation_regex: "",
            label: "BIll Number",
          },
          {
            type: "text",
            name: "address",
            placeholder: "Enter Address",
            validation_regex: "",
            label: "Address",
          },
          {
            type: "text",
            name: "tm_date",
            placeholder: "Enter Tm Date",
            validation_regex: "",
            label: "Address",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "pan_no",
            placeholder: "Enter your pan no",
            label: "Pan Number",
            validation_regex: "",
          },
          {
            type: "date",
            name: "due_date",
            placeholder: "Enter Due Date",
            validation_regex: "",
            label: "Due Date",
          },
          {
            type: "text",
            name: "warehouse",
            placeholder: "Enter Warehouse",
            validation_regex: "",
            label: "Warehouse",
          },
          {
            type: "async-select",
            name: "payment_type",
            placeholder: "Enter ",
            validation_regex: "",
            label: "Payment Type",
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
            name: "unit",
            placeholder: "Enter Unit",
            validation_regex: "",
            label: "Unit",
          },
        ],
      },
    ],
  },
];
const salesCreate: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "customer",
            placeholder: "Enter  Customer",
            validation_regex: "",
            label: "Customer",
          },
          {
            type: "text",
            name: "bill_no",
            placeholder: "Enter Invoice Number",
            validation_regex: "",
            label: "BIll Number",
          },
          {
            type: "text",
            name: "address",
            placeholder: "Enter Address",
            validation_regex: "",
            label: "Address",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "tm_date",
            placeholder: "Enter Tm Date",
            validation_regex: "",
            label: "Address",
          },
          {
            type: "text",
            name: "pan_no",
            placeholder: "Enter your pan no",
            label: "Pan Number",
            validation_regex: "",
          },
          {
            type: "date",
            name: "due_date",
            placeholder: "Enter Due Date",
            validation_regex: "",
            label: "Due Date",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "salesman",
            placeholder: "Enter salesman",
            validation_regex: "",
            label: "Sales Man",
          },
          {
            type: "async-select",
            name: "payment_type",
            placeholder: "Enter ",
            validation_regex: "",
            label: "Payment Type",
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
            name: "unit",
            placeholder: "Enter Unit",
            validation_regex: "",
            label: "Unit",
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

export { columns, formData, selfBIll, salesCreate };

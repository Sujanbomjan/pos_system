import { IFormData } from "@/types/form";
const columns = [
  { name: "SNO.", uid: "sno" },
  { name: "Code", uid: "code" },
  { name: "Description", uid: "desc" },
  { name: "Batch No", uid: "batch_no" },
  { name: "Each", uid: "each" },
  { name: "Rate", uid: "rate" },
  { name: "Amount", uid: "amount" },
  { name: "MRP", uid: "mrp" },
  { name: "Vat", uid: "vat" },
  { name: "Net Amount", uid: "net_amt" },
  { name: "Remarks", uid: "remarks" },
];
const purchaseInvoice: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "supplier",
            placeholder: "Enter Supplier",
            validation_regex: "",
            label: "Supplier",
          },
          {
            type: "text",
            name: "inv_no",
            placeholder: "Enter Invoice Number",
            validation_regex: "",
            label: "Invoice Number",
          },
          {
            type: "text",
            name: "pi_no",
            placeholder: "Enter PI_NO",
            validation_regex: "",
            label: "PI NO",
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
            name: "pan_no",
            placeholder: "Enter your pan no",
            label: "Pan No",
            validation_regex: "",
          },
          {
            type: "text",
            name: "vehicle_no",
            placeholder: "Enter Vehicle No",
            validation_regex: "",
            label: "Vehicle No",
          },
          {
            type: "date",
            name: "received_date",
            placeholder: "Enter Received Date",
            validation_regex: "",
            label: "Received Date",
          },
          {
            type: "date",
            name: "inv_date",
            placeholder: "Enter Invoice Date",
            validation_regex: "",
            label: "Invoice Date",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "godown",
            placeholder: "Enter your godown",
            validation_regex: "",
            label: "Godown",
          },
          {
            type: "dropdown",
            name: "unit",
            placeholder: "Select Unit",
            validation_regex: "",
            label: "Unit",
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
            name: "bill_format",
            placeholder: "Select Bill Format",
            validation_regex: "",
            label: "Bill Format",
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
            name: "remarks",
            placeholder: "Enter Remarks",
            validation_regex: "",
            label: "Remarks",
          },
        ],
      },
    ],
  },
];
const purchaseReturn: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "kjadshflksajdhfalksjdfhaslkjdfhaslkjdfhasdlkfjh",
            placeholder: "Enter Supplier",
            validation_regex: "",
            label: "Supplier",
          },
          {
            type: "dropdown",
            name: "return_type",
            placeholder: "Enter Return Type",
            validation_regex: "",
            label: "Return Type",
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
            name: "return_no",
            placeholder: "Enter Return Number",
            validation_regex: "",
            label: "Return No",
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
            name: "ref_bill_no",
            placeholder: "Enter Ref Bill No",
            validation_regex: "",
            label: "Ref Bill No",
          },
          {
            type: "date",
            name: "date",
            placeholder: "Enter Date",
            validation_regex: "",
            label: "Date",
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
            label: "Pan No",
            validation_regex: "",
          },
          {
            type: "dropdown",
            name: "return_mode",
            placeholder: "Select Return Mode",
            validation_regex: "",
            label: "Return Mode",
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
            name: "inv_no",
            placeholder: "Enter Invoice Number",
            validation_regex: "",
            label: "Invoice Number",
          },
          {
            type: "text",
            name: "remarks",
            placeholder: "Enter your remarks",
            validation_regex: "",
            label: "Remarks",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "dropdown",
            name: "unit",
            placeholder: "Select Unit",
            validation_regex: "",
            label: "Unit",
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
            name: "ref_ti_Bill_no",
            placeholder: "Enter Ref TI Bill No.",
            validation_regex: "",
            label: "Ref TI Bill No",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "ac_bl",
            placeholder: "Enter A/C B/L",
            validation_regex: "",
            label: " A/C B/L",
          },
          {
            type: "dropdown",
            name: "bill_format",
            placeholder: "Select Bill Format",
            validation_regex: "",
            label: "Bill Format",
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

export { columns, formData, purchaseInvoice, purchaseReturn };

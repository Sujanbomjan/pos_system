import { IFormData } from "@/types/form";

const columns = [
  {
    name: "Invoice/Pragyapan Patro No",
    columns: [
      { name: "Date", uid: "date" },
      { name: "Miti", uid: "miti" },
      { name: "Invoice No", uid: "invoice_no" },
      { name: "PP No", uid: "pp_no" },
      { name: "Supplier Name", uid: "supplier_name" },
      { name: "Supplier Pan", uid: "supplier_pan" },
    ],
  },
  {
    name: "Total Purchase",
    columns: [
      { name: "Supplier Pan", uid: "supplier_plan" },
      { name: "Amount", uid: "amt_1" },
    ],
  },
  {
    name: "Non Taxable",
    columns: [{ name: "Purchase/Import", uid: "purchaseImport" }],
  },
  {
    name: "Taxable Purchase",
    columns: [
      { name: "Amount", uid: "amt_2" },
      { name: "Vat", uid: "vat_1" },
    ],
  },
  {
    name: "Import Purchase",
    columns: [
      { name: "Amount", uid: "amt_3" },
      { name: "Vat", uid: "vat_2" },
    ],
  },
];

const tableData = [
  {
    date: "P001",
    miti: "Product A",
    invoice_no: "MP001",
    pp_no: "Brand X",
    supplier_name: "BU1",
    supplier_pan: "BU1",
    supplier_plan: "BU1",
    amt_1: "P001",
    purchaseImport: "Product A",
    amt_2: "MP001",
    vat_1: "Brand X",
    amt_3: "BU1",
    vat_2: "BU1",
    flg: "BU1",
  },

  {
    date: "P001",
    miti: "Product A",
    invoice_no: "MP001",
    pp_no: "Brand X",
    supplier_name: "BU1",
    supplier_pan: "BU1",
    supplier_plan: "BU1",
    amt_1: "P001",
    purchaseImport: "Product A",
    amt_2: "MP001",
    vat_1: "Brand X",
    amt_3: "BU1",
    vat_2: "BU1",
    flg: "BU1",
  },
  {
    date: "P001",
    miti: "Product A",
    invoice_no: "MP001",
    pp_no: "Brand X",
    supplier_name: "BU1",
    supplier_pan: "BU1",
    supplier_plan: "BU1",
    amt_1: "P001",
    purchaseImport: "Product A",
    amt_2: "MP001",
    vat_1: "Brand X",
    amt_3: "BU1",
    vat_2: "BU1",
    flg: "BU1",
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
            type: "dropdown",
            name: "division_selection",
            placeholder: "Select Division Selection",
            validation_regex: "",
            label: "Division Selection",
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
            name: "fiscal_year",
            placeholder: "Select fiscal year",
            validation_regex: "",
            label: "Fiscal Year Selection",
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
        type: "checkbox",
        name: "bill_wise_summary",
        placeholder: "Select Bill wise Summary report",
        validation_regex: "",
        label: "Show Bill Wise Summary Report",
      },
    ],
  },
];

export { columns, filterFormData, tableData };

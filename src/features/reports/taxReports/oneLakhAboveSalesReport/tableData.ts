import { IFormData } from "@/types/form";

const columns = [
  { name: "PARTY", uid: "party" },
  { name: "VAT NO", uid: "vat_no" },
  { name: "Sales Amount", uid: "sales_amt" },
  { name: "Non Taxable", uid: "non_taxable" },
  { name: "Export Sales", uid: "export_sales" },
  { name: "Vat Amount", uid: "vat_amt" },
  { name: "Taxable Import", uid: "taxable_import" },
  { name: "Vat Amount", uid: "vat_amount" },
  { name: "FLG", uid: "flg" },
];

const tableData = [
  {
    party: "P001",
    vat_no: "Product A",
    sales_amt: "MP001",
    non_taxable: "Brand X",
    export_sales: "BU1",
    vat_amt: "BU1",
    flg: "BU1",
  },
  {
    party: "P001",
    vat_no: "Product A",
    sales_amt: "MP001",
    non_taxable: "Brand X",
    export_sales: "BU1",
    vat_amt: "BU1",
    flg: "BU1",
  },
  {
    party: "P001",
    vat_no: "Product A",
    sales_amt: "MP001",
    non_taxable: "Brand X",
    export_sales: "BU1",
    vat_amt: "BU1",
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
    ],
  },
];

export { columns, filterFormData, tableData };

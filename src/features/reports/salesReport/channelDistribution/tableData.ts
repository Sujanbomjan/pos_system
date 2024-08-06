import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

const columns: IColumns[] = [
  { mainHeading: "Invoice", subHeading: "Invoice", name: "DATE", uid: "DATE" },
  { mainHeading: "Invoice", subHeading: "Invoice", name: "MITI", uid: "MITI" },
  {
    mainHeading: "Invoice",
    subHeading: "Invoice",
    name: "INVOICE NO",
    uid: "invoice_no",
  },
  {
    mainHeading: "Invoice",
    subHeading: "Invoice",
    name: "BUYER NAME",
    uid: "buyer_name",
  },
  {
    mainHeading: "Invoice",
    subHeading: "Invoice",
    name: "BUYER PAN",
    uid: "buyer_pan",
  },
  {
    mainHeading: "TOTAL SALES/IMPORT",
    subHeading: "TOTAL SALES/IMPORT",
    name: "VALUE",
    uid: "VALUE",
  },
  {
    mainHeading: "Non taxable Sales",
    subHeading: "Non taxable Sales",
    name: "VALUE",
    uid: "VALUE_2",
  },
  {
    mainHeading: "TAXABLE SALES",
    subHeading: "TAXABLE SALES",
    name: "VALUE",
    uid: "VALUE_3",
  },
  {
    mainHeading: "TAXABLE SALES",
    subHeading: "TAXABLE SALES",
    name: "VAT",
    uid: "VAT",
  },
  {
    mainHeading: "EXPORT SALES",
    subHeading: "EXPORT SALES",
    name: "VALUE",
    uid: "VALUE_4",
  },
  {
    mainHeading: "EXPORT SALES",
    subHeading: "EXPORT SALES",
    name: "COUNTRY",
    uid: "COUNTRY",
  },
  {
    mainHeading: "EXPORT SALES",
    subHeading: "EXPORT SALES",
    name: "EXPORT PP",
    uid: "export_pp",
  },
];

const tableData = [
  {
    DATE: "2024-01-01",
    MITI: "Miti 001",
    invoice_no: "INV001",
    buyer_name: "John Doe",
    buyer_pan: "PAN001",
    VALUE: 1000,
    VALUE_2: 500,
    VALUE_3: 200,
    VAT: 100,
    VALUE_4: 1600,
    COUNTRY: "Country A",
    export_pp: "PP001",
  },
  {
    DATE: "2024-01-02",
    MITI: "Miti 002",
    invoice_no: "INV002",
    buyer_name: "Jane Smith",
    buyer_pan: "PAN002",
    VALUE: 2000,
    VALUE_2: 1000,
    VALUE_3: 400,
    VAT: 200,
    VALUE_4: 3200,
    COUNTRY: "Country B",
    export_pp: "PP002",
  },
  {
    DATE: "2024-01-03",
    MITI: "Miti 003",
    invoice_no: "INV003",
    buyer_name: "Alice Johnson",
    buyer_pan: "PAN003",
    VALUE: 1500,
    VALUE_2: 750,
    VALUE_3: 300,
    VAT: 150,
    VALUE_4: 2500,
    COUNTRY: "Country C",
    export_pp: "PP003",
  },
  {
    DATE: "2024-01-04",
    MITI: "Miti 004",
    invoice_no: "INV004",
    buyer_name: "Bob Brown",
    buyer_pan: "PAN004",
    VALUE: 1800,
    VALUE_2: 900,
    VALUE_3: 360,
    VAT: 180,
    VALUE_4: 3060,
    COUNTRY: "Country D",
    export_pp: "PP004",
  },
  {
    DATE: "2024-01-05",
    MITI: "Miti 005",
    invoice_no: "INV005",
    buyer_name: "Charlie Davis",
    buyer_pan: "PAN005",
    VALUE: 2200,
    VALUE_2: 1100,
    VALUE_3: 440,
    VAT: 220,
    VALUE_4: 3760,
    COUNTRY: "Country E",
    export_pp: "PP005",
  },
  {
    DATE: "2024-01-06",
    MITI: "Miti 006",
    invoice_no: "INV006",
    buyer_name: "David Evans",
    buyer_pan: "PAN006",
    VALUE: 1700,
    VALUE_2: 850,
    VALUE_3: 340,
    VAT: 170,
    VALUE_4: 3060,
    COUNTRY: "Country F",
    export_pp: "PP006",
  },
  {
    DATE: "2024-01-07",
    MITI: "Miti 007",
    invoice_no: "INV007",
    buyer_name: "Eva Green",
    buyer_pan: "PAN007",
    VALUE: 2100,
    VALUE_2: 1050,
    VALUE_3: 420,
    VAT: 210,
    VALUE_4: 3570,
    COUNTRY: "Country G",
    export_pp: "PP007",
  },
  {
    DATE: "2024-01-08",
    MITI: "Miti 008",
    invoice_no: "INV008",
    buyer_name: "Frank Harris",
    buyer_pan: "PAN008",
    VALUE: 2400,
    VALUE_2: 1200,
    VALUE_3: 480,
    VAT: 240,
    VALUE_4: 4080,
    COUNTRY: "Country H",
    export_pp: "PP008",
  },
  {
    DATE: "2024-01-09",
    MITI: "Miti 009",
    invoice_no: "INV009",
    buyer_name: "Grace Ivers",
    buyer_pan: "PAN009",
    VALUE: 2000,
    VALUE_2: 1000,
    VALUE_3: 400,
    VAT: 200,
    VALUE_4: 3400,
    COUNTRY: "Country I",
    export_pp: "PP009",
  },
  {
    DATE: "2024-01-10",
    MITI: "Miti 010",
    invoice_no: "INV010",
    buyer_name: "Henry Johnson",
    buyer_pan: "PAN010",
    VALUE: 2600,
    VALUE_2: 1300,
    VALUE_3: 520,
    VAT: 260,
    VALUE_4: 4380,
    COUNTRY: "Country J",
    export_pp: "PP010",
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
            optional: true,
          },
          {
            type: "date",
            name: "to_date",
            placeholder: "Enter Date",
            validation_regex: "",
            label: "To Date",
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
            name: "division_selection",
            placeholder: "Select  Division Selection",
            label: "Division Selection",
            validation_regex: "",
            optional: true,
            dropdownItem: [
              {
                label: "1",
                value: "1",
              },
              {
                label: "1",
                value: "1",
              },
              {
                label: "1",
                value: "1",
              },
            ],
          },
          {
            type: "date",
            name: "fiscal_year",
            placeholder: "Enter Fiscal Year Selection",
            validation_regex: "",
            label: "Fiscal Year Selection",
            optional: true,
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "checkbox",
            name: "tax_invoice",
            placeholder: "Enter Show Tax Sales Invoice",
            validation_regex: "",
            label: "Show Tax Sales Invoice",
            optional: true,
          },
          {
            type: "checkbox",
            name: "sales_invoice",
            placeholder: "Enter Show Abbreviated Sales Invoice",
            validation_regex: "",
            label: "Show Abbreviated Sales Invoice",
            optional: true,
          },
          {
            type: "checkbox",
            name: "credit_note",
            placeholder: "Enter Show Sales Return (Credit Note)",
            validation_regex: "",
            label: "Show Sales Return (Credit Note)",
            optional: true,
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "checkbox",
            name: "summary",
            placeholder: "Enter Summary Report",
            validation_regex: "",
            label: "Summary Report",
            optional: true,
          },
          {
            type: "checkbox",
            name: "details",
            placeholder: "Enter Detail Report",
            validation_regex: "",
            label: "Detail Report",
            optional: true,
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "checkbox",
            name: "total-report",
            placeholder: "Select Show Sub Total In Report",
            validation_regex: "",
            label: "Show Sub Total In Report",
            optional: true,
          },
          {
            type: "checkbox",
            name: "total-report",
            placeholder: "Select Show Bill Wise  Summary Report",
            validation_regex: "",
            label: "Show Bill Wise  Summary Report",
            optional: true,
          },
        ],
      },
    ],
  },
];

export { columns, filterFormData, tableData };
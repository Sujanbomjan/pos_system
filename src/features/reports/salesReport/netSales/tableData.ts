import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

const columns: IColumns[] = [
  {
    mainHeading: "INVOICE/PRAGYAPAN PATRA NO",
    subHeading: "Date",
    name: "Date",
    uid: "date",
  },
  {
    mainHeading: "INVOICE/PRAGYAPAN PATRA NO",
    name: "Miti",
    uid: "miti",
  },
  {
    mainHeading: "INVOICE/PRAGYAPAN PATRA NO",
    name: "pp_no",
    uid: "pp_no",
  },
  {
    mainHeading: "INVOICE/PRAGYAPAN PATRA NO",
    name: "supplier_name",
    uid: "supplier_name",
  },
  {
    mainHeading: "INVOICE/PRAGYAPAN PATRA NO",
    name: "supplier pan",
    uid: "supplier_pan",
  },
  {
    mainHeading: "Total Purchase",
    name: "amount",
    uid: "total_purchase",
    type: "object",
    objectField: "amount",
  },
  {
    mainHeading: "Non Taxable",
    name: "purchase/import",
    uid: "non_taxable",
    type: "object",
    objectField: "purchase_import",
  },
  {
    mainHeading: "Taxable Purchase",
    name: "amount",
    uid: "taxable_purchase",
    type: "object",
    objectField: "amount",
  },
  {
    mainHeading: "Taxable Purchase",
    name: "vat",
    uid: "taxable_purchase",
    type: "object",
    objectField: "vat",
  },
  {
    mainHeading: "Import Purchase",
    name: "amount",
    type: "object",
    uid: "import_purchase",
    objectField: "amount",
  },
  {
    mainHeading: "Import Purchase",
    name: "vat",
    type: "object",
    uid: "import_purchase",
    objectField: "vat",
  },
];

const tableData = [
  {
    date: "2024-07-25",
    miti: "2081-05-10",
    pp_no: "PP123456",
    supplier_name: "ABC Suppliers Pvt. Ltd.",
    supplier_pan: "1234567890",
    total_purchase: {
      amount: "100000",
    },
    non_taxable: {
      purchase_import: "50000",
    },
    taxable_purchase: {
      amount: "40000",
      vat: "8000",
    },
    import_purchase: {
      amount: "20000",
      vat: "4000",
    },
  },
  {
    date: "2024-07-26",
    miti: "2081-05-11",
    pp_no: "PP123457",
    supplier_name: "XYZ Traders Ltd.",
    supplier_pan: "2345678901",
    total_purchase: {
      amount: "150000",
    },
    non_taxable: {
      purchase_import: "60000",
    },
    taxable_purchase: {
      amount: "50000",
      vat: "10000",
    },
    import_purchase: {
      amount: "30000",
      vat: "6000",
    },
  },
  {
    date: "2024-07-27",
    miti: "2081-05-12",
    pp_no: "PP123458",
    supplier_name: "LMN Enterprises",
    supplier_pan: "3456789012",
    total_purchase: {
      amount: "120000",
    },
    non_taxable: {
      purchase_import: "70000",
    },
    taxable_purchase: {
      amount: "40000",
      vat: "8000",
    },
    import_purchase: {
      amount: "20000",
      vat: "4000",
    },
  },
  {
    date: "2024-07-28",
    miti: "2081-05-13",
    pp_no: "PP123459",
    supplier_name: "OPQ Inc.",
    supplier_pan: "4567890123",
    total_purchase: {
      amount: "130000",
    },
    non_taxable: {
      purchase_import: "80000",
    },
    taxable_purchase: {
      amount: "30000",
      vat: "6000",
    },
    import_purchase: {
      amount: "30000",
      vat: "6000",
    },
  },
  {
    date: "2024-07-29",
    miti: "2081-05-14",
    pp_no: "PP123460",
    supplier_name: "RST Co.",
    supplier_pan: "5678901234",
    total_purchase: {
      amount: "110000",
    },
    non_taxable: {
      purchase_import: "40000",
    },
    taxable_purchase: {
      amount: "50000",
      vat: "10000",
    },
    import_purchase: {
      amount: "20000",
      vat: "4000",
    },
  },
  {
    date: "2024-07-30",
    miti: "2081-05-15",
    pp_no: "PP123461",
    supplier_name: "UVW Ltd.",
    supplier_pan: "6789012345",
    total_purchase: {
      amount: "140000",
    },
    non_taxable: {
      purchase_import: "60000",
    },
    taxable_purchase: {
      amount: "50000",
      vat: "10000",
    },
    import_purchase: {
      amount: "30000",
      vat: "6000",
    },
  },
  {
    date: "2024-07-31",
    miti: "2081-05-16",
    pp_no: "PP123462",
    supplier_name: "XYZ Ltd.",
    supplier_pan: "7890123456",
    total_purchase: {
      amount: "125000",
    },
    non_taxable: {
      purchase_import: "50000",
    },
    taxable_purchase: {
      amount: "40000",
      vat: "8000",
    },
    import_purchase: {
      amount: "35000",
      vat: "7000",
    },
  },
  {
    date: "2024-08-01",
    miti: "2081-05-17",
    pp_no: "PP123463",
    supplier_name: "PQR Ltd.",
    supplier_pan: "8901234567",
    total_purchase: {
      amount: "115000",
    },
    non_taxable: {
      purchase_import: "60000",
    },
    taxable_purchase: {
      amount: "40000",
      vat: "8000",
    },
    import_purchase: {
      amount: "15000",
      vat: "3000",
    },
  },
  {
    date: "2024-08-02",
    miti: "2081-05-18",
    pp_no: "PP123464",
    supplier_name: "ABC Traders",
    supplier_pan: "9012345678",
    total_purchase: {
      amount: "105000",
    },
    non_taxable: {
      purchase_import: "40000",
    },
    taxable_purchase: {
      amount: "45000",
      vat: "9000",
    },
    import_purchase: {
      amount: "20000",
      vat: "4000",
    },
  },
  {
    date: "2024-08-03",
    miti: "2081-05-19",
    pp_no: "PP123465",
    supplier_name: "DEF Pvt. Ltd.",
    supplier_pan: "0123456789",
    total_purchase: {
      amount: "100000",
    },
    non_taxable: {
      purchase_import: "70000",
    },
    taxable_purchase: {
      amount: "20000",
      vat: "4000",
    },
    import_purchase: {
      amount: "20000",
      vat: "4000",
    },
  },
  {
    date: "2024-08-04",
    miti: "2081-05-20",
    pp_no: "PP123466",
    supplier_name: "GHI Ltd.",
    supplier_pan: "1234567809",
    total_purchase: {
      amount: "135000",
    },
    non_taxable: {
      purchase_import: "50000",
    },
    taxable_purchase: {
      amount: "50000",
      vat: "10000",
    },
    import_purchase: {
      amount: "30000",
      vat: "6000",
    },
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
        type: "dropdown",
        name: "division_selection",
        placeholder: "Select Division Select",
        validation_regex: "",
        label: "Division Select",
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
        optional: true,
      },
      {
        type: "dropdown",
        name: "fiscal_year",
        placeholder: "Select Fiscal Year Selection",
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
        optional: true,
      },
      {
        type: "checkbox",
        name: "trading_purchase",
        label: "Trading Purchase Transaction",
      },
      {
        type: "checkbox",
        name: "capital_purchase",
        label: "Capital Purchase Transaction",
      },
      {
        type: "checkbox",
        name: "purchase_return",
        label: "Purchase Return (Debit Note) Transaction",
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "checkbox",
            name: "sub_total",
            label: "Show Sub Total In Report",
          },
          {
            type: "checkbox",
            name: "bill_wise_report",
            label: "Show Bill Wise Summary Report",
          },
        ],
      },
    ],
  },
];

export { columns, filterFormData, tableData };

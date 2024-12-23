import { IFormData } from "@/types/form";

const columns = [
  { name: "Fiscal_year", uid: "fiscal_year" },
  { name: "Bill No", uid: "bill_no" },
  { name: "Customer name", uid: "customer_name" },
  { name: "Customer Pan", uid: "customer_pan" },
  { name: "Bill Date", uid: "bill_date" },
  { name: "Amount", uid: "amt" },
  { name: "Discount", uid: "discount" },
  { name: "Taxable Amount", uid: "taxAmt" },
  { name: "Is Printed", uid: "is_printed" },
  { name: "Is Active", uid: "is_active" },
  { name: "Printed Time", uid: "printed_time" },
  { name: "Print Nos", uid: "print_nos" },
  { name: "Etered By", uid: "etered_by" },
  { name: "Printed By", uid: "printed_by" },
  { name: "EDate", uid: "edate" },
  { name: "Stamp", uid: "stamp" },
  { name: "Sync With Ird", uid: "sink_with_ird" },
  { name: "Is Real Time", uid: "real_time" },
  { name: "Payment method", uid: "payment_method" },
  { name: "Vat Refund", uid: "vat_refund" },
  { name: "Transaction Id", uid: "transaction_id" },
];

const tableData = [
  {
    fiscal_year: "P001",
    bill_no: "Product A",
    customer_name: "MP001",
    customer_pan: "Brand X",
    bill_date: "BU1",
    amt: "BU1",
    discount: "BU1",
    is_printed: "BU1",
    taxAmt: "BU1",
    is_active: "BU1",
    printed_time: "BU1",
    print_nos: "BU1",
    edate: "BU1",
    stamp: "BU1",
    sink_with_ird: "BU1",
    real_time: "BU1",
    payment_method: "BU1",
    transaction_id: "BU1",
    vat_refund: "BU1",
    printed_by: "BU1",
    etered_by: "BU1",
  },
  {
    fiscal_year: "P001",
    bill_no: "Product A",
    customer_name: "MP001",
    customer_pan: "Brand X",
    bill_date: "BU1",
    amt: "BU1",
    discount: "BU1",
    is_printed: "BU1",
    taxAmt: "BU1",
    is_active: "BU1",
    printed_time: "BU1",
    print_nos: "BU1",
    edate: "BU1",
    stamp: "BU1",
    sink_with_ird: "BU1",
    real_time: "BU1",
    payment_method: "BU1",
    transaction_id: "BU1",
    vat_refund: "BU1",
    printed_by: "BU1",
    etered_by: "BU1",
  },
  {
    fiscal_year: "P001",
    bill_no: "Product A",
    customer_name: "MP001",
    customer_pan: "Brand X",
    bill_date: "BU1",
    amt: "BU1",
    discount: "BU1",
    is_printed: "BU1",
    taxAmt: "BU1",
    is_active: "BU1",
    printed_time: "BU1",
    print_nos: "BU1",
    edate: "BU1",
    stamp: "BU1",
    sink_with_ird: "BU1",
    real_time: "BU1",
    payment_method: "BU1",
    transaction_id: "BU1",
    vat_refund: "BU1",
    printed_by: "BU1",
    etered_by: "BU1",
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
    ],
  },
];

export { columns, filterFormData, tableData };

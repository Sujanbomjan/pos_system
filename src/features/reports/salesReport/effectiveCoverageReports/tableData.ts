import { IFormData } from "@/types/form";

const columns = [
  { name: "Salesman Code", uid: "salesman_code" },
  { name: "Salesman Name", uid: "salesman_name" },
  { name: "Route Code", uid: "route_code" },
  { name: "Route Name", uid: "route_name" },
  { name: "Active Retailers", uid: "active_retailers" },
  { name: "Total Retailers Billed", uid: "retailer_billed" },
  { name: "Billed Percentage", uid: "billed_percentage" },
  { name: "New Outlets Created", uid: "outelets" },
  { name: "Planned Calls", uid: "plannned_called" },
  { name: "Effective Calls", uid: "effective_calls" },
  { name: "Productivity %", uid: "productivity" },
  { name: "Lines Sold MP Level", uid: "sold_mp" },
  { name: "Lines Sold (All SKU)", uid: "lines_sold" },
  { name: "Lines Sold (Incentive)", uid: "incentive" },
  { name: "SKU per Call (ASKU)", uid: "per_sku" },
];

const tableData = [
  {
    salesman_code: "P001",
    salesman_name: "Product A",
    route_code: "MP001",
    route_name: "Brand X",
    active_retailers: "BU1",
    retailer_billed: "Brand X",
    billed_percentage: "BU1",
    outelets: "BU1",
    plannned_called: "BU1",
    effective_calls: "BU1",
    productivity: "BU1",
    sold_mp: "BU1",
    lines_sold: "BU1",
    incentive: "BU1",
    per_sku: "per_sku",
  },
  {
    salesman_code: "P001",
    salesman_name: "Product A",
    route_code: "MP001",
    route_name: "Brand X",
    active_retailers: "BU1",
    retailer_billed: "Brand X",
    billed_percentage: "BU1",
    outelets: "BU1",
    plannned_called: "BU1",
    effective_calls: "BU1",
    productivity: "BU1",
    sold_mp: "BU1",
    lines_sold: "BU1",
    incentive: "BU1",
    per_sku: "per_sku",
  },
  {
    salesman_code: "P001",
    salesman_name: "Product A",
    route_code: "MP001",
    route_name: "Brand X",
    active_retailers: "BU1",
    retailer_billed: "Brand X",
    billed_percentage: "BU1",
    outelets: "BU1",
    plannned_called: "BU1",
    effective_calls: "BU1",
    productivity: "BU1",
    sold_mp: "BU1",
    lines_sold: "BU1",
    incentive: "BU1",
    per_sku: "per_sku",
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
            name: "salesman",
            placeholder: "Enter  salesman",
            label: "Sales Man",
            validation_regex: "",
          },
          {
            type: "text",
            name: "route",
            placeholder: "Enter Route",
            validation_regex: "",
            label: "Route",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "sales_offer",
            placeholder: "Enter Sales Offer",
            validation_regex: "",
            label: "Salse Offer",
          },
          {
            type: "text",
            name: "distributor",
            placeholder: "Enter Distributer",
            validation_regex: "",
            label: "Distributer",
          },
        ],
      },
    ],
  },
];

export { columns, filterFormData, tableData };

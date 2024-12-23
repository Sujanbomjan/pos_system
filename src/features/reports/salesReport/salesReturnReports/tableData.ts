import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

const columns: IColumns[] = [
  { name: "Channel", uid: "Channel" },
  { name: "Sub Channel", uid: "Subchannel" },
  { name: "Retailer Code", uid: "RetailerCode" },
  { name: "Retailer Name", uid: "RetailerName" },
  { name: "Retailer Address", uid: "RetailerAddress" },
  { name: "Sales Invoice", uid: "SalesInvoice" },
  { name: "Invoice Date", uid: "InvoiceDate" },
  { name: "Return Type", uid: "Return Type" },
  { name: "Product Code", uid: "ProductCode" },
  { name: "Product Name", uid: "Product Name" },
  { name: "Brand Name", uid: "BrandName" },
  { name: "Batch", uid: "BATCH" },
  { name: "MRP", uid: "MRP", type: "float" },
  { name: "Rate", uid: "RATE", type: "float" },
  { name: "Quantity (CASE)", uid: "QUANTITY(CASE)" },
  { name: "Quantity (EACH)", uid: "QUANTITY(EACH)" },
  { name: "Gross Amount", uid: "Gross Amount", type: "float" },
  { name: "Scheme Discount", uid: "SchemeDiscount", type: "float" },
  { name: "Distributor Discount", uid: "DistributorDiscount", type: "float" },
  { name: "Cash Discount", uid: "CashDiscount" },
  { name: "Tax Amount", uid: "TaxAmount", type: "float" },
  { name: "Net Amount", uid: "NETAMOUNT", type: "float" },
];

const tableData = [
  {
    Channel: "Chemists",
    Subchannel: "Chemists",
    RetailerCode: "NT0560033",
    RetailerName: "Narayanthan Pharmacy",
    RetailerAddress: "Budhanilkantha",
    SalesInvoice: "CN5-AJI-79/80",
    InvoiceDate: "2023-04-21T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12497669,
    "Product Name": "CERL STA3 Whe Ri Mxd Frt24x300g N3 NV NP",
    BrandName: "IN NSB : Cerelac 3",
    BATCH: "30660451DA",
    MRP: 509.99958,
    RATE: 410.297332,
    "QUANTITY(CASE)": 0,
    "QUANTITY(EACH)": 3,
    "Gross Amount": 1230.891996,
    SchemeDiscount: 0,
    DistributorDiscount: 12.30891996,
    CashDiscount: null,
    TaxAmount: 158.4157998852,
    NETAMOUNT: 1376.99887593,
  },
  {
    Channel: "Chemists",
    Subchannel: "Chemists",
    RetailerCode: "NT0560033",
    RetailerName: "Narayanthan Pharmacy",
    RetailerAddress: "Budhanilkantha",
    SalesInvoice: "CN5-AJI-79/80",
    InvoiceDate: "2023-04-21T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12516433,
    "Product Name": "LACTOGEN 2 BIB 24x400g INLE059 N1 NP",
    BrandName: "IN NSB : Lactogen 2",
    BATCH: "30610453M1",
    MRP: 778.99958,
    RATE: 626.709238,
    "QUANTITY(CASE)": 0,
    "QUANTITY(EACH)": 12,
    "Gross Amount": 7520.510856,
    SchemeDiscount: 0,
    DistributorDiscount: 75.20510856,
    CashDiscount: null,
    TaxAmount: 967.8897471672,
    NETAMOUNT: 8413.19549461,
  },
  {
    Channel: "Chemists",
    Subchannel: "Chemists",
    RetailerCode: "NT0560033",
    RetailerName: "Narayanthan Pharmacy",
    RetailerAddress: "Budhanilkantha",
    SalesInvoice: "CN5-AJI-79/80",
    InvoiceDate: "2023-04-21T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12534889,
    "Product Name": "CERL STA1 WheAppPoshanBIB24x300gN2 NV NP",
    BrandName: "IN NSB : Cerelac 1",
    BATCH: "30690453A7",
    MRP: 445.99958,
    RATE: 358.808997,
    "QUANTITY(CASE)": 0,
    "QUANTITY(EACH)": 3,
    "Gross Amount": 1076.426991,
    SchemeDiscount: 0,
    DistributorDiscount: 10.76426991,
    CashDiscount: null,
    TaxAmount: 138.5361537417,
    NETAMOUNT: 1204.19887483,
  },
  {
    Channel: "Chemists",
    Subchannel: "Chemists",
    RetailerCode: "NT0560033",
    RetailerName: "Narayanthan Pharmacy",
    RetailerAddress: "Budhanilkantha",
    SalesInvoice: "CN5-AJI-79/80",
    InvoiceDate: "2023-04-21T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12534908,
    "Product Name": "CERL STA2 WheAppChryPoshan24x300gN2NV NP",
    BrandName: "IN NSB : Cerelac 2",
    BATCH: "30390453A7",
    MRP: 461.99958,
    RATE: 371.681081,
    "QUANTITY(CASE)": 0,
    "QUANTITY(EACH)": 3,
    "Gross Amount": 1115.043243,
    SchemeDiscount: 0,
    DistributorDiscount: 11.15043243,
    CashDiscount: null,
    TaxAmount: 143.5060653741,
    NETAMOUNT: 1247.39887594,
  },
  {
    Channel: "Chemists",
    Subchannel: "Chemists",
    RetailerCode: "NT0560033",
    RetailerName: "Narayanthan Pharmacy",
    RetailerAddress: "Budhanilkantha",
    SalesInvoice: "CN5-AJI-79/80",
    InvoiceDate: "2023-04-21T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12534941,
    "Product Name": "CERELAC STA4 MU&FrtPoshan24x300gN2 NV NP",
    BrandName: "IN NSB : Cerelac 4",
    BATCH: "30320451DB",
    MRP: 527.99958,
    RATE: 424.778426,
    "QUANTITY(CASE)": 0,
    "QUANTITY(EACH)": 3,
    "Gross Amount": 1274.335278,
    SchemeDiscount: 0,
    DistributorDiscount: 12.74335278,
    CashDiscount: null,
    TaxAmount: 164.0069502786,
    NETAMOUNT: 1425.5988755,
  },
  {
    Channel: "Chemists",
    Subchannel: "Chemists",
    RetailerCode: "NT0560206",
    RetailerName: "Yuliana Pharmacy",
    RetailerAddress: "Chundevi",
    SalesInvoice: "CN3-AJI-80/81",
    InvoiceDate: "2023-10-02T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12516446,
    "Product Name": "LACTOGEN 4 FU IF BIB 24x400g INJE091 NP",
    BrandName: "IN NSB : Lactogen 4",
    BATCH: "32460453K1",
    MRP: 815.99958,
    RATE: 656.475932,
    "QUANTITY(CASE)": 2,
    "QUANTITY(EACH)": 0,
    "Gross Amount": 31510.844736,
    SchemeDiscount: 0,
    DistributorDiscount: 0,
    CashDiscount: null,
    TaxAmount: 4096.40981568,
    NETAMOUNT: 35607.25455168,
  },
  {
    Channel: "Chemists",
    Subchannel: "Chemists",
    RetailerCode: "NT0560206",
    RetailerName: "Yuliana Pharmacy",
    RetailerAddress: "Chundevi",
    SalesInvoice: "CN3-AJI-80/81",
    InvoiceDate: "2023-10-02T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12571042,
    "Product Name": "LACTOGEN 2 FUF BIB 24x400g INLE059-1 NP",
    BrandName: "IN NSB : Lactogen 2",
    BATCH: "32170453L2",
    MRP: 815.99958,
    RATE: 656.475932,
    "QUANTITY(CASE)": 3,
    "QUANTITY(EACH)": 0,
    "Gross Amount": 47266.267104,
    SchemeDiscount: 0,
    DistributorDiscount: 0,
    CashDiscount: null,
    TaxAmount: 6144.61472352,
    NETAMOUNT: 53410.88182752,
  },
  {
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560202",
    RetailerName: "Amrit Kirana Store",
    RetailerAddress: "Chandol",
    SalesInvoice: "CN1-AJI-80/81",
    InvoiceDate: "2023-10-02T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12425804,
    "Product Name": "EVERYDAY DW 20x800g N2 NP",
    BrandName: "IN SSD : EveryDay DW",
    BATCH: "321904519B",
    MRP: 976,
    RATE: 785.197104,
    "QUANTITY(CASE)": 2,
    "QUANTITY(EACH)": 0,
    "Gross Amount": 31407.88416,
    SchemeDiscount: 0,
    DistributorDiscount: 0,
    CashDiscount: null,
    TaxAmount: 4083.0249408,
    NETAMOUNT: 35490.9091008,
  },
  {
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560255",
    RetailerName: "Krishna Store (A)",
    RetailerAddress: "Baluwatar",
    SalesInvoice: "CN4-AJI-79/80",
    InvoiceDate: "2023-04-16T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12549379,
    "Product Name": "NESCAFE Classic Dawn Jar 30x48g N1 IN",
    BrandName: "IN C&B : Nescafe Classic Large Packs",
    BATCH: "30350452CA",
    MRP: 272.99967,
    RATE: 219.629659,
    "QUANTITY(CASE)": 1,
    "QUANTITY(EACH)": 18,
    "Gross Amount": 10542.223632,
    SchemeDiscount: 0,
    DistributorDiscount: 0,
    CashDiscount: null,
    TaxAmount: 1370.48907216,
    NETAMOUNT: 11912.71270416,
  },
  {
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560282",
    RetailerName: "Presha Store&Suppliers",
    RetailerAddress: "Chondeal",
    SalesInvoice: "CN2-AJI-80/81",
    InvoiceDate: "2023-10-02T00:00:00.000",
    "Return Type": "sellable",
    ProductCode: 12425813,
    "Product Name": "NESTLE EVERYDAY DW 32x400g N1 NP",
    BrandName: "IN SSD : EveryDay DW",
    BATCH: "322204518B",
    MRP: 493,
    RATE: 396.621078,
    "QUANTITY(CASE)": 3,
    "QUANTITY(EACH)": 0,
    "Gross Amount": 38075.623488,
    SchemeDiscount: 0,
    DistributorDiscount: 0,
    CashDiscount: null,
    TaxAmount: 4949.83105344,
    NETAMOUNT: 43025.45454144,
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
            type: "text",
            name: "product",
            placeholder: "Enter product",
            label: "Product",
            validation_regex: "",
            optional: true,
          },
          {
            type: "text",
            name: "retailer",
            placeholder: "Enter retailer",
            validation_regex: "",
            label: "Retailer",
            optional: true,
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
            placeholder: "Enter Brand",
            validation_regex: "",
            label: "Brand",
            optional: true,
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
            optional: true,
          },
        ],
      },
    ],
  },
];

export { columns, filterFormData, tableData };

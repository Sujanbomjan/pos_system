import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

const columns: IColumns[] = [
  { name: "Salesman", uid: "Salesman" },
  { name: "Channel", uid: "Channel" },
  { name: "Sub Channel", uid: "Subchannel" },
  { name: "Retailer Code", uid: "RetailerCode" },
  { name: "Retailer Name", uid: "RetailerName" },
  { name: "Retailer Address", uid: "RetailerAddress" },
  { name: "Sales Invoice", uid: "SalesInvoice" },
  { name: "Invoice Date", uid: "InvoiceDate" },
  { name: "Product Code", uid: "ProductCode" },
  { name: "Product Name", uid: "ProductName" },
  { name: "Brand Name ", uid: "BrandName" },
  { name: "Batch", uid: "BATCH" },
  { name: "MRP", uid: "MRP", type: "float" },
  { name: "Rate", uid: "RATE", type: "float" },
  { name: "Quantity", uid: "Quantity" },
  { name: "Quantity (Case)", uid: "Quantity(Case)" },
  { name: "Quantity (Each)", uid: "Quantity(Each)" },
  { name: "Amount", uid: "Amount", type: "float" },
  { name: "Scheme Discount", uid: "SchemeDiscount", type: "float" },
  { name: "Distributor Discount", uid: "DistributorDiscount" },
  { name: "Cash Discount", uid: "CashDiscount" },
  { name: "Tax Amount", uid: "TaxAmount", type: "float" },
  { name: "Net Amount", uid: "NetAmount" },
];

const tableData = [
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560313",
    RetailerName: "Daju Bhai Store",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI1-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12521442",
    ProductName: "NESCAFE RTD Hazelnut  30x180ml NP",
    BrandName: "IN SSD : Nescafe RTD Cold Coffee",
    BATCH: "30681530MA",
    MRP: "89.99952",
    RATE: "72.405086",
    Quantity: "30",
    "Quantity(Case)": "1",
    "Quantity(Each)": "0",
    Amount: "2172.15258",
    SchemeDiscount: "1086.07629",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "141.1899177",
    NetAmount: "1227.27",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560313",
    RetailerName: "Daju Bhai Store",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI1-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12536078",
    ProductName: "NESCAFE Classic Stick 96(96x1.1g) IN",
    BrandName: "IN C&B : Nescafe Classic Small Packs",
    BATCH: "304204528A",
    MRP: "3.99992",
    RATE: "3.217958",
    Quantity: "480",
    "Quantity(Case)": "0",
    "Quantity(Each)": "480",
    Amount: "1544.61984",
    SchemeDiscount: "0",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "200.8005792",
    NetAmount: "1745.42",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560202",
    RetailerName: "Amrit Kirana Store",
    RetailerAddress: "Chandol",
    SalesInvoice: "TI2-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12425813",
    ProductName: "NESTLE EVERYDAY DW 32x400g N1 NP",
    BrandName: "IN SSD : EveryDay DW",
    BATCH: "312604519D",
    MRP: "493",
    RATE: "396.621078",
    Quantity: "4",
    "Quantity(Case)": "0",
    "Quantity(Each)": "4",
    Amount: "1586.484312",
    SchemeDiscount: "12",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "204.6829606",
    NetAmount: "1779.17",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560285",
    RetailerName: "Raju Pasal ",
    RetailerAddress: "Chandol",
    SalesInvoice: "TI3-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12444599",
    ProductName: "NESCAFE CLASSIC Sachet 96x50g NP",
    BrandName: "IN C&B : Nescafe Classic Large Packs",
    BATCH: "31350452JB",
    MRP: "265",
    RATE: "213.193886",
    Quantity: "12",
    "Quantity(Case)": "0",
    "Quantity(Each)": "12",
    Amount: "2558.326632",
    SchemeDiscount: "193.1536607",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "307.4724863",
    NetAmount: "2672.65",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560285",
    RetailerName: "Raju Pasal ",
    RetailerAddress: "Chandol",
    SalesInvoice: "TI3-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12536078",
    ProductName: "NESCAFE Classic Stick 96(96x1.1g) IN",
    BrandName: "IN C&B : Nescafe Classic Small Packs",
    BATCH: "304204528A",
    MRP: "3.99992",
    RATE: "3.217958",
    Quantity: "288",
    "Quantity(Case)": "0",
    "Quantity(Each)": "288",
    Amount: "926.771904",
    SchemeDiscount: "0",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "120.4803475",
    NetAmount: "1047.25",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Chemists",
    Subchannel: "Chemists",
    RetailerCode: "NT0560206",
    RetailerName: "Yuliana Pharmacy",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI4-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12497669",
    ProductName: "CERL STA3 Whe Ri Mxd Frt24x300g N3 NV NP",
    BrandName: "IN NSB : Cerelac 3",
    BATCH: "31280451DB",
    MRP: "509.99958",
    RATE: "410.297332",
    Quantity: "2",
    "Quantity(Case)": "0",
    "Quantity(Each)": "2",
    Amount: "820.594664",
    SchemeDiscount: "0",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "106.6773063",
    NetAmount: "927.27",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Paan Plus",
    Subchannel: "Paan Plus",
    RetailerCode: "NT0560204",
    RetailerName: "Pangmalee Store & Liquor Shop",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI5-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12447638",
    ProductName: "NESTLE BAR ONE Ctln 24(30x12g) N1 IN",
    BrandName: "IN C&C : Barone",
    BATCH: "31120454E1",
    MRP: "10",
    RATE: "7.76277",
    Quantity: "30",
    "Quantity(Case)": "0",
    "Quantity(Each)": "30",
    Amount: "232.8831",
    SchemeDiscount: "4.657662",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "29.66930694",
    NetAmount: "257.89",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Paan Plus",
    Subchannel: "Paan Plus",
    RetailerCode: "NT0560204",
    RetailerName: "Pangmalee Store & Liquor Shop",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI5-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12495410",
    ProductName: "NESTLE BAR ONE Ctln 16(24x20g) N1 IN",
    BrandName: "IN C&C : Barone",
    BATCH: "31550454E1",
    MRP: "19.99972",
    RATE: "15.525321",
    Quantity: "24",
    "Quantity(Case)": "0",
    "Quantity(Each)": "24",
    Amount: "372.607704",
    SchemeDiscount: "7.45215408",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "47.47022149",
    NetAmount: "412.63",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Paan Plus",
    Subchannel: "Paan Plus",
    RetailerCode: "NT0560204",
    RetailerName: "Pangmalee Store & Liquor Shop",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI5-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12514692",
    ProductName: "KIT KAT 2 F Mini 24(42x12.8g) IN",
    BrandName: "IN C&C : Kitkat",
    BATCH: "31150454B1",
    MRP: "19.99999",
    RATE: "15.525532",
    Quantity: "42",
    "Quantity(Case)": "0",
    "Quantity(Each)": "42",
    Amount: "652.072344",
    SchemeDiscount: "13.04144688",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "83.07401663",
    NetAmount: "722.1",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Paan Plus",
    Subchannel: "Paan Plus",
    RetailerCode: "NT0560204",
    RetailerName: "Pangmalee Store & Liquor Shop",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI5-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12531641",
    ProductName: "KIT KAT 3F 18(28x28.5g) IN",
    BrandName: "IN C&C : Kitkat",
    BATCH: "31190454A1",
    MRP: "50.00006",
    RATE: "38.813896",
    Quantity: "28",
    "Quantity(Case)": "0",
    "Quantity(Each)": "28",
    Amount: "1086.789088",
    SchemeDiscount: "21.73578176",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "138.4569298",
    NetAmount: "1203.51",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Paan Plus",
    Subchannel: "Paan Plus",
    RetailerCode: "NT0560204",
    RetailerName: "Pangmalee Store & Liquor Shop",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI5-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12534711",
    ProductName: "MUNCH 4x4 18(42x18g) IN",
    BrandName: "IN C&C : Munch",
    BATCH: "30736640PA",
    MRP: "19.9996",
    RATE: "15.525228",
    Quantity: "42",
    "Quantity(Case)": "0",
    "Quantity(Each)": "42",
    Amount: "652.059576",
    SchemeDiscount: "0",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "84.76774488",
    NetAmount: "736.83",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Paan Plus",
    Subchannel: "Paan Plus",
    RetailerCode: "NT0560204",
    RetailerName: "Pangmalee Store & Liquor Shop",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI5-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12552152",
    ProductName: "MILKYBAR Mould 24(30x12.5g) N1 IN",
    BrandName: "IN C&C : Milkybar",
    BATCH: "31300454X1",
    MRP: "19.99829",
    RATE: "15.524211",
    Quantity: "30",
    "Quantity(Case)": "0",
    "Quantity(Each)": "30",
    Amount: "465.72633",
    SchemeDiscount: "9.3145266",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "59.33353444",
    NetAmount: "515.75",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Paan Plus",
    Subchannel: "Paan Plus",
    RetailerCode: "NT0560204",
    RetailerName: "Pangmalee Store & Liquor Shop",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI5-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12559877",
    ProductName: "MUNCH Maha 27(32x8.9g) N1 IN",
    BrandName: "IN C&C : Munch",
    BATCH: "31240454P1",
    MRP: "9.99999",
    RATE: "8.045043",
    Quantity: "32",
    "Quantity(Case)": "0",
    "Quantity(Each)": "32",
    Amount: "257.441376",
    SchemeDiscount: "0",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "33.46737888",
    NetAmount: "290.91",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Paan Plus",
    Subchannel: "Paan Plus",
    RetailerCode: "NT0560204",
    RetailerName: "Pangmalee Store & Liquor Shop",
    RetailerAddress: "Chundevi",
    SalesInvoice: "TI5-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12559990",
    ProductName: "MUNCH Maxx 12(24x42g)N1 IN",
    BrandName: "IN C&C : Munch",
    BATCH: "31120454N1",
    MRP: "40.0004",
    RATE: "31.05139",
    Quantity: "24",
    "Quantity(Case)": "0",
    "Quantity(Each)": "24",
    Amount: "745.23336",
    SchemeDiscount: "0",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "96.8803368",
    NetAmount: "842.11",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560213",
    RetailerName: "Chitawan Store",
    RetailerAddress: "Dhumbarahi",
    SalesInvoice: "TI6-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12344691",
    ProductName: "NESCAFE CLASSIC BIB 16(2x200g) NP",
    BrandName: "IN C&B : Nescafe Classic - FS",
    BATCH: "31630452VA",
    MRP: "1300.50794",
    RATE: "1046.265435",
    Quantity: "1",
    "Quantity(Case)": "0",
    "Quantity(Each)": "1",
    Amount: "1046.265435",
    SchemeDiscount: "0",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "136.0145065",
    NetAmount: "1182.28",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560213",
    RetailerName: "Chitawan Store",
    RetailerAddress: "Dhumbarahi",
    SalesInvoice: "TI6-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12536078",
    ProductName: "NESCAFE Classic Stick 96(96x1.1g) IN",
    BrandName: "IN C&B : Nescafe Classic Small Packs",
    BATCH: "304204528A",
    MRP: "3.99992",
    RATE: "3.217958",
    Quantity: "288",
    "Quantity(Case)": "0",
    "Quantity(Each)": "288",
    Amount: "926.771904",
    SchemeDiscount: "0",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "120.4803475",
    NetAmount: "1047.25",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560213",
    RetailerName: "Chitawan Store",
    RetailerAddress: "Dhumbarahi",
    SalesInvoice: "TI6-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12539471",
    ProductName: "KIT KAT 4 Finger 18(21x38.5g) NP",
    BrandName: "IN C&C : Kitkat",
    BATCH: "31160454C2",
    MRP: "60.00046",
    RATE: "46.576974",
    Quantity: "21",
    "Quantity(Case)": "0",
    "Quantity(Each)": "21",
    Amount: "978.116454",
    SchemeDiscount: "19.56232908",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "124.6120362",
    NetAmount: "1083.17",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560184",
    RetailerName: "Jaiswal kirana Store",
    RetailerAddress: "Handigaun",
    SalesInvoice: "TI7-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12493771",
    ProductName: "MAGGI H&S TCS Bottle 24x500g NR IN",
    BrandName: "IN CUL : Sauces",
    BATCH: "31570451FA",
    MRP: "280",
    RATE: "225.261464",
    Quantity: "3",
    "Quantity(Case)": "0",
    "Quantity(Each)": "3",
    Amount: "675.784392",
    SchemeDiscount: "48.25100559",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "81.57934023",
    NetAmount: "709.11",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560184",
    RetailerName: "Jaiswal kirana Store",
    RetailerAddress: "Handigaun",
    SalesInvoice: "TI7-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12493775",
    ProductName: "MAGGI H&S TCS Bottle 24x200g NR IN",
    BrandName: "IN CUL : Sauces",
    BATCH: "31300451FA",
    MRP: "160",
    RATE: "128.720837",
    Quantity: "3",
    "Quantity(Case)": "0",
    "Quantity(Each)": "3",
    Amount: "386.162511",
    SchemeDiscount: "0",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "50.20112643",
    NetAmount: "436.36",
  },
  {
    Salesman: "Subash Majhi",
    Channel: "Groceries - Small",
    Subchannel: "Groceries - Small",
    RetailerCode: "NT0560184",
    RetailerName: "Jaiswal kirana Store",
    RetailerAddress: "Handigaun",
    SalesInvoice: "TI7-AJI-80/81",
    InvoiceDate: "7/17/2023",
    ProductCode: "12514692",
    ProductName: "KIT KAT 2 F Mini 24(42x12.8g) IN",
    BrandName: "IN C&C : Kitkat",
    BATCH: "31150454B1",
    MRP: "19.99999",
    RATE: "15.525532",
    Quantity: "42",
    "Quantity(Case)": "0",
    "Quantity(Each)": "42",
    Amount: "652.072344",
    SchemeDiscount: "13.04144688",
    DistributorDiscount: "0",
    CashDiscount: "",
    TaxAmount: "83.07401663",
    NetAmount: "722.1",
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
            name: "salesman",
            placeholder: "Enter  salesman",
            label: "SalesMan",
            validation_regex: "",
            optional: true,
          },
          {
            type: "text",
            name: "route",
            placeholder: "Enter Route",
            validation_regex: "",
            label: "Route",
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
            name: "retailer",
            placeholder: "Enter Retailer",
            validation_regex: "",
            label: "Retailer",
            optional: true,
          },
          {
            type: "text",
            name: "product",
            placeholder: "Enter Product",
            validation_regex: "",
            label: "Product",
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

      {
        type: "checkbox",
        name: "sales_return",
        placeholder: "Select Sales Return",
        validation_regex: "",
        label: "Include Sales Return",
        optional: true,
      },
    ],
  },
];

export { columns, filterFormData, tableData };
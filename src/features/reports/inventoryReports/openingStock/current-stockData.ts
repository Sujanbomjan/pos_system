import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

const columns: IColumns[] = [
  { name: "Product Code", uid: "ProductCode" },
  { name: "Product Name", uid: "ProductName" },
  { name: "Brand", uid: "BRAND" },
  { name: "Batch", uid: "BATCH" },
  { name: "MRP", uid: "MRP" },
  { name: "Saleable Stock", uid: "case1" },
  { name: "Saleable Stock(CASE)", uid: "case" },
  { name: "Saleable Stock (EACH)", uid: "each" },
  { name: "Saleable (KG)", uid: "SaleableKg" },
  { name: "Total (KG)", uid: "TotalKg" },
  { name: "Saleable Value", uid: "SaleableValue" },
  { name: "Total Value", uid: "TotalValue" },
  { name: "ShelfLife", uid: "selflife" },
];

const tableData = [
  {
    ProductCode: "12516326",
    ProductName: "KIT KAT Dsrt Truffle 20(12x50g) N3 IN",
    BRAND: "IN C&C : Kitkat Tablets",
    BATCH: "31030454R1",
    MRP: "30.00018",
    case: "108",

    case1: "1.9",
    each: "0",
    SaleableKg: "5.4",
    TotalKg: "10282.022064",
    SaleableValue: "10282.022064",
    TotalValue: "61",
    selflife: "",
  },
  {
    ProductCode: "12516316",
    ProductName: "KIT KAT Dsrt Choc Pdg 20(12x50g) N1 IN",
    BRAND: "IN C&C : Kitkat Tablets",
    BATCH: "31040454R1",
    MRP: "30.00018",
    each: "0",
    case: "1.08",
    case1: "1.9",
    SaleableKg: "1.2",
    TotalKg: "2284.893792",
    SaleableValue: "2284.893792",
    TotalValue: "62",
    selflife: "",
  },
  {
    ProductCode: "12532605",
    ProductName: "NESTLE GOLD Crunchy Flakes 10x850g NP",
    BRAND: "IN CPW : Flakes",
    BATCH: "3104T246AA",
    MRP: "99.08232",
    each: "0",
    case: "1.08",
    case1: "1.9",
    SaleableKg: "8.5",
    TotalKg: "4465.64477",
    SaleableValue: "4465.64477",
    TotalValue: " 32",
    selflife: "",
  },
  {
    ProductCode: "12517558",
    ProductName: "NESTLE GOLD Crunchy Flakes 12x475g NP",
    BRAND: "IN CPW : Flakes",
    BATCH: "3178T246GB",
    MRP: "362.99915",
    each: "0",
    case: "1.08",
    case1: "1.9",
    SaleableKg: "14.25",
    TotalKg: "8117.54178",
    SaleableValue: "8117.54178",
    TotalValue: "106",
    selflife: "1",
  },
  {
    ProductCode: "12532605",
    ProductName: "NESTLE GOLD Crunchy Flakes 10x850g NP",
    BRAND: "IN CPW : Flakes",
    BATCH: "3179T246GB",
    MRP: "599.08232",
    each: "0",
    case: "1.08",
    case1: "1.9",
    SaleableKg: "8.5",
    TotalKg: "4465.64477",
    SaleableValue: "4465.64477",
    TotalValue: "107",
    selflife: "1",
  },
  {
    ProductCode: "12530529",
    ProductName: "NESCAFE CLASSIC Jar 36x24g IN",
    BRAND: "IN C&B : Nescafe Classic Large Packs",
    BATCH: "32170452CA",
    MRP: "147",
    each: "0",
    case: "1.08",
    case1: "1.9",
    SaleableKg: "0.24000000000005",
    TotalKg: "1115.68178",
    SaleableValue: "1115.68178",
    TotalValue: "355",
    selflife: "1",
  },
  {
    ProductCode: "12489773",
    ProductName: "MAGGI H&S TCS Bottle 12x1kg NR IN",
    BRAND: "IN CUL : Sauces",
    BATCH: "32350451FA",
    MRP: "402.99917",
    each: "0",
    case: "1.08",
    case1: "1.9",
    SaleableKg: " 4",
    TotalKg: "1223.452592",
    SaleableValue: "1223.452592",
    TotalValue: "373",
    selflife: "1",
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
            name: "sorting",
            placeholder: "Select Sorting",
            label: "Sorting",
            validation_regex: "",
            optional: true,
            dropdownItem: [
              {
                label: "Adidas",
                value: "1",
              },
              {
                label: "Nike",
                value: "2",
              },
              {
                label: "Puma",
                value: "3",
              },
            ],
          },
          {
            type: "async-select",
            name: "report_label",
            placeholder: "Enter Report Level",
            validation_regex: "",
            label: "Report Level",
            optional: true,
            dropdownItem: [
              {
                label: "Adidas",
                value: "1",
              },
              {
                label: "Nike",
                value: "2",
              },
              {
                label: "Puma",
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
            type: "async-select",
            name: "product",
            placeholder: "Select Product (Multiple Product)",
            validation_regex: "",
            label: "Product",
            optional: true,
            dropdownItem: [
              {
                label: "Adidas",
                value: "1",
              },
              {
                label: "Nike",
                value: "2",
              },
              {
                label: "Puma",
                value: "3",
              },
            ],
          },
          {
            type: "async-select",
            name: "brand",
            placeholder: "Select Brand (Multiple Brand)",
            validation_regex: "",
            label: "Brand",
            optional: true,
            dropdownItem: [
              {
                label: "Adidas",
                value: "1",
              },
              {
                label: "Nike",
                value: "2",
              },
              {
                label: "Puma",
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
            type: "async-select",
            name: "ageing_select",
            placeholder: "Select Ageing Selection",
            validation_regex: "",
            label: "Aeging Selection",
            optional: true,
            dropdownItem: [
              {
                label: "Mac Tea",
                value: "1",
              },
              {
                label: "Nike",
                value: "2",
              },
              {
                label: "Sneakers",
                value: "3",
              },
            ],
          },
        ],
      },
    ],
  },
];

export { columns, filterFormData, tableData };

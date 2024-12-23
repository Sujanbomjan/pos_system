import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

const columns: IColumns[] = [
  { mainHeading: "ITEM DESCRIPTION", subHeading: "Item Details", name: "Item Code", uid: "itemcode" },
  { mainHeading: "ITEM DESCRIPTION", subHeading: "Item Details", name: "Item Name", uid: "itemname" },
  { mainHeading: "ITEM DESCRIPTION", subHeading: "Item Details", name: "Unit", uid: "unit" },
  { mainHeading: "OPENING BALANCE", subHeading: "Quantity", name: "QTY", uid: "QTY1" },
  { mainHeading: "OPENING BALANCE", subHeading: "Rate", name: "Rate", uid: "RATE1" },
  { mainHeading: "OPENING BALANCE", subHeading: "Value", name: "Value", uid: "VALUE1" },
  { mainHeading: "INWARDS", subHeading: "Quantity", name: "QTY", uid: "QTY2" },
  { mainHeading: "INWARDS", subHeading: "Cost Value", name: "Cost Value", uid: "COST VALUE1" },
  { mainHeading: "OUTWARDS", subHeading: "Quantity", name: "QTY", uid: "QTY3" },
  { mainHeading: "OUTWARDS", subHeading: "Cost Value", name: "Cost Value", uid: "COST VALUE2" },
  { mainHeading: "CLOSING BALANCE", subHeading: "Quantity", name: "QTY", uid: "QTY4" },
  { mainHeading: "CLOSING BALANCE", subHeading: "Rate", name: "Rate", uid: "RATE2" },
  { mainHeading: "CLOSING BALANCE", subHeading: "Value", name: "Value", uid: "VALUE2" },
  { mainHeading: "ITEM GROUP HIERARCHY", subHeading: "Hierarchy", name: "Main Group", uid: "MAIN GROUP" },
  { mainHeading: "ITEM GROUP HIERARCHY", subHeading: "Hierarchy", name: "Sub Group (A)", uid: "sub" },
  { mainHeading: "ITEM GROUP HIERARCHY", subHeading: "Hierarchy", name: "Sub Group (B)", uid: "sub_1" },
  { mainHeading: "ITEM GROUP HIERARCHY", subHeading: "Hierarchy", name: "Sub Group (c)", uid: "sub_2" },
  { mainHeading: "ITEM GROUP HIERARCHY", subHeading: "Hierarchy", name: "Category", uid: "category" },
];

const tableData = [
  {
    itemcode: "12440800",
    itemname: "AAMILKYBAR-MOULD 16(27x12.5g) IN",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 0,
    "COST VALUE1": 0.0,
    QTY3: 0,
    "COST VALUE2": 0.0,
    QTY4: 0,
    RATE2: 0.0,
    VALUE2: 0.0,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12497893",
    itemname: "CERELAC STA3 Whe Ri Mxd Frt24x300g N4 NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 0,
    "COST VALUE1": 0.0,
    QTY3: 0,
    "COST VALUE2": 0.0,
    QTY4: 0,
    RATE2: 0.0,
    VALUE2: 0.0,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12497656",
    itemname: "CERELAC STA4 MU&FrtPoshan24x300gN2 NV NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 0,
    "COST VALUE1": 0.0,
    QTY3: 0,
    "COST VALUE2": 0.0,
    QTY4: 0,
    RATE2: 0.0,
    VALUE2: 0.0,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12534941",
    itemname: "CERELAC STA4 MU&FrtPoshan24x300gN2 NV NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 1662,
    "COST VALUE1": 698785.13,
    QTY3: 1565,
    "COST VALUE2": 657929.95,
    QTY4: 97,
    RATE2: 421.19,
    VALUE2: 40855.17,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12497664",
    itemname: "CERL STA1 Whe Poshan BIB 24x300gN1 NV NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 0,
    "COST VALUE1": 0.0,
    QTY3: 0,
    "COST VALUE2": 0.0,
    QTY4: 0,
    RATE2: 0.0,
    VALUE2: 0.0,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12534917",
    itemname: "CERL STA1 Whe Poshan BIB 24x300gN2 NV NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 384,
    "COST VALUE1": 128162.12,
    QTY3: 384,
    "COST VALUE2": 128162.12,
    QTY4: 0,
    RATE2: 0.0,
    VALUE2: 0.0,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12497654",
    itemname: "CERL STA1 WheAppPoshanBIB24x300gN1 NV NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 0,
    "COST VALUE1": 0.0,
    QTY3: 0,
    "COST VALUE2": 0.0,
    QTY4: 0,
    RATE2: 0.0,
    VALUE2: 0.0,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12534889",
    itemname: "CERL STA1 WheAppPoshanBIB24x300gN2 NV NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 1656,
    "COST VALUE1": 578824.29,
    QTY3: 1446,
    "COST VALUE2": 505029.98,
    QTY4: 210,
    RATE2: 351.4,
    VALUE2: 73794.31,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12452999",
    itemname: "CERL STA2 WheAppChry Poshan24x300g N1 NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 0,
    "COST VALUE1": 0.0,
    QTY3: 0,
    "COST VALUE2": 0.0,
    QTY4: 0,
    RATE2: 0.0,
    VALUE2: 0.0,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12497655",
    itemname: "CERL STA2 WheAppChryPoshan24x300gN1NV NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 0,
    "COST VALUE1": 0.0,
    QTY3: 0,
    "COST VALUE2": 0.0,
    QTY4: 0,
    RATE2: 0.0,
    VALUE2: 0.0,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12534908",
    itemname: "CERL STA2 WheAppChryPoshan24x300gN2NV NP",
    unit: "EACH",
    QTY1: 60,
    RATE1: 366.58,
    VALUE1: 21994.85,
    QTY2: 1368,
    "COST VALUE1": 516965.52,
    QTY3: 1239,
    "COST VALUE2": 467238.03,
    QTY4: 189,
    RATE2: 379.48,
    VALUE2: 71722.34,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12578317",
    itemname: "CERL STA3 Whe Ri Mxd Frt 24x300g N5 NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 696,
    "COST VALUE1": 277854.86,
    QTY3: 524,
    "COST VALUE2": 209189.57,
    QTY4: 172,
    RATE2: 399.22,
    VALUE2: 68665.28,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12497669",
    itemname: "CERL STA3 Whe Ri Mxd Frt24x300g N3 NV NP",
    unit: "EACH",
    QTY1: 73,
    RATE1: 387.07,
    VALUE1: 28256.33,
    QTY2: 528,
    "COST VALUE1": 210203.39,
    QTY3: 601,
    "COST VALUE2": 238459.71,
    QTY4: 0,
    RATE2: 0.0,
    VALUE2: 0.0,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
  },
  {
    itemcode: "12578222",
    itemname: "CERL STA5 5Gra&Frt Poshan 24x300g N1 NP",
    unit: "EACH",
    QTY1: 0,
    RATE1: 0.0,
    VALUE1: 0.0,
    QTY2: 648,
    "COST VALUE1": 278364.88,
    QTY3: 522,
    "COST VALUE2": 224238.38,
    QTY4: 126,
    RATE2: 429.58,
    VALUE2: 54126.5,
    "MAIN GROUP": "",
    sub: "",
    sub_1: "",
    sub_2: "",
    category: "",
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
            type: "dropdown",
            name: "fiscal_year",
            placeholder: "Select Year Selection",
            validation_regex: "",
            label: "Fiscal Year Selection",
            optional: true,
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
            name: "supplier",
            placeholder: "Enter Your Supplier Name",
            validation_regex: "",
            label: "Supplier",
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
            name: "warehouse",
            placeholder: "Select Warehouse",
            label: "Warehouse",
            validation_regex: "",
            optional: true,
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
            type: "async-select",
            name: "product",
            placeholder: "Select product",
            validation_regex: "",
            label: "Product",
            optional: true,
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
            type: "async-select",
            name: "report_type_selection",
            placeholder: "Select Report Type Selection",
            validation_regex: "",
            label: "Select Report Type Selection",
            optional: true,
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
            name: "report_format",
            placeholder: "Select Report Format",
            validation_regex: "",
            label: "Select Report format",
            optional: true,
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
            type: "async-select",
            name: "report_option",
            placeholder: "Select Report Option",
            label: "Report Option",
            validation_regex: "",
            optional: true,
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
        label: "Show Batch Wise Stock Report",
        name: "btach_wise_stock",
        placeholder: "Show Batch Wise Stock Report",
        validation_regex: "",
        optional: true,
      },
    ],
  },
];

export { columns, filterFormData, tableData };

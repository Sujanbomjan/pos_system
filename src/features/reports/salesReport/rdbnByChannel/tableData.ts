import { IFormData } from "@/types/form";

const columns = [
  { name: "ASM", uid: "asm" },
  { name: "So", uid: "so" },
  { name: "CD CODE", uid: "cd_code" },
  { name: "CD NAME", uid: "cd_name" },
  { name: "Outlet Classification", uid: "outlet_classification" },
  { name: "Total", uid: "total" },
  { name: "In Culnasala-AE-Magic", uid: "magic" },
  { name: "In SSD Nescafe rtd cold coffee", uid: "nescafe" },
  { name: "In C&C Munch", uid: "munch" },
  { name: "In CPW Kokos", uid: "kokos" },
  { name: "In NSB Cerelac 1", uid: "cerelac_1" },
  { name: "In NSB Cerelac 5", uid: "cerelac_5" },
  { name: "In C&C: Kitkat", uid: "kit_kat" },
  { name: "In NSB Lactogen 1", uid: "lactogen" },
];

const tableData = [
  {
    asm: "P001",
    so: "Product A",
    cd_code: "MP001",
    cd_name: "Brand X",
    outlet_classification: "BU1",
    total: "Brand X",
    magic: "BU1",
    nescafe: "BU1",
    munch: "BU1",
    kokos: "BU1",
    cerelac_1: "BU1",
    cerelac_5: "BU1",
    kit_kat: "BU1",
    lactogen: "BU1",
  },
  {
    asm: "P001",
    so: "Product A",
    cd_code: "MP001",
    cd_name: "Brand X",
    outlet_classification: "BU1",
    total: "Brand X",
    magic: "BU1",
    nescafe: "BU1",
    munch: "BU1",
    kokos: "BU1",
    cerelac_1: "BU1",
    cerelac_5: "BU1",
    kit_kat: "BU1",
    lactogen: "BU1",
  },
  {
    asm: "P001",
    so: "Product A",
    cd_code: "MP001",
    cd_name: "Brand X",
    outlet_classification: "BU1",
    total: "Brand X",
    magic: "BU1",
    nescafe: "BU1",
    munch: "BU1",
    kokos: "BU1",
    cerelac_1: "BU1",
    cerelac_5: "BU1",
    kit_kat: "BU1",
    lactogen: "BU1",
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
            name: "retailer",
            placeholder: "Enter Retailer",
            validation_regex: "",
            label: "Retailer",
          },
          {
            type: "text",
            name: "channel",
            placeholder: "Enter Channel",
            validation_regex: "",
            label: "Channel",
          },
        ],
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
      },
    ],
  },
];

export { columns, filterFormData, tableData };

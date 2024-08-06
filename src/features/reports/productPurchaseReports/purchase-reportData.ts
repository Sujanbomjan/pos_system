import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

const columns: IColumns[] = [
  { name: "Supplier", uid: "c1" },
  { name: "Company Inv No", uid: "c2" },
  { name: "GRN Number", uid: "c3" },
  { name: "GRN Date", uid: "c4" },
  { name: "Product Code", uid: "c5" },
  { name: "Product Name", uid: "c6" },
  { name: "Quantity", uid: "c7" },
  { name: "Quantity (Case)", uid: "c8" },
  { name: "Quantity (Each)", uid: "c9" },
  { name: "MRP", uid: "c10" },
  { name: "Gross Amount", uid: "c11" },
  { name: "OID Value ", uid: "c12" },
  { name: "Tax", uid: "c13" },
  { name: "Net Value", uid: "c14" },
];
const tableData = [
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12425804",
    c6: "EVERYDAY DW 20x800g N2 NP",
    c7: 976,
    c8: 100,
    c9: 5,
    c10: 0,
    c11: 74780.6766,
    c12: 0,
    c13: 9721.487958,
    c14: 84502.164558,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12425813",
    c6: "NESTLE EVERYDAY DW 32x400g N1 NP",
    c7: 493,
    c8: 160,
    c9: 5,
    c10: 0,
    c11: 60437.4976,
    c12: 0,
    c13: 7856.874688,
    c14: 68294.372288,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12489773",
    c6: "MAGGI H&S TCS Bottle 12x1kg NR IN",
    c7: 402.99917,
    c8: 24,
    c9: 2,
    c10: 0,
    c11: 7340.715552,
    c12: 0,
    c13: 954.29302176,
    c14: 8295.00857376,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12493771",
    c6: "MAGGI H&S TCS Bottle 24x500g NR IN",
    c7: 280,
    c8: 48,
    c9: 2,
    c10: 0,
    c11: 10200.51912,
    c12: 0,
    c13: 1326.0674856,
    c14: 11526.5866056,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12493772",
    c6: "MAGGI Tomato Ket Bottle 24x500g N1 IN",
    c7: 257.84108,
    c8: 48,
    c9: 2,
    c10: 0,
    c11: 9393.260352,
    c12: 0,
    c13: 1221.12384576,
    c14: 10614.38419776,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12493775",
    c6: "MAGGI H&S TCS Bottle 24x200g NR IN",
    c7: 160,
    c8: 120,
    c9: 5,
    c10: 0,
    c11: 14572.17024,
    c12: 0,
    c13: 1894.3821312,
    c14: 16466.5523712,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12499432",
    c6: "NESCAFE All in1 Sac 10(48x16g)Hanger IN",
    c7: 19,
    c8: 2400,
    c9: 5,
    c10: 0,
    c11: 34608.9048,
    c12: 0,
    c13: 4499.157624,
    c14: 4.9,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12425804",
    c6: "EVERYDAY DW 20x800g N2 NP",
    c7: 976,
    c8: 100,
    c9: 5,
    c10: 0,
    c11: 74780.6766,
    c12: 0,
    c13: 9721.487958,
    c14: 84502.164558,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12425813",
    c6: "NESTLE EVERYDAY DW 32x400g N1 NP",
    c7: 493,
    c8: 160,
    c9: 5,
    c10: 0,
    c11: 60437.4976,
    c12: 0,
    c13: 7856.874688,
    c14: 68294.372288,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12489773",
    c6: "MAGGI H&S TCS Bottle 12x1kg NR IN",
    c7: 402.99917,
    c8: 24,
    c9: 2,
    c10: 0,
    c11: 7340.715552,
    c12: 0,
    c13: 954.29302176,
    c14: 8295.00857376,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12493771",
    c6: "MAGGI H&S TCS Bottle 24x500g NR IN",
    c7: 280,
    c8: 48,
    c9: 2,
    c10: 0,
    c11: 10200.51912,
    c12: 0,
    c13: 1326.0674856,
    c14: 11526.5866056,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12493772",
    c6: "MAGGI Tomato Ket Bottle 24x500g N1 IN",
    c7: 257.84108,
    c8: 48,
    c9: 2,
    c10: 0,
    c11: 9393.260352,
    c12: 0,
    c13: 1221.12384576,
    c14: 10614.38419776,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12493775",
    c6: "MAGGI H&S TCS Bottle 24x200g NR IN",
    c7: 160,
    c8: 120,
    c9: 5,
    c10: 0,
    c11: 14572.17024,
    c12: 0,
    c13: 1894.3821312,
    c14: 16466.5523712,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12499432",
    c6: "NESCAFE All in1 Sac 10(48x16g)Hanger IN",
    c7: 19,
    c8: 2400,
    c9: 5,
    c10: 0,
    c11: 34608.9048,
    c12: 0,
    c13: 4499.157624,
    c14: 39108.062424,
  },
  {
    c1: "Nep Trade Pvt. Ltd",
    c2: "TI1082-NEP-80/81",
    c3: "PI16-AJI-80/81",
    c4: "11/1/2023",
    c5: "12516439",
    c6: "LACTOGEN 1 IF BIB 24x400g NWB0142-1 NP",
    c7: 826.99958,
    c8: 240,
    c9: 10,
    c10: 0,
    c11: 150639.73344,
    c12: 0,
    c13: 19583.1653472,
    c14: 170222.8987872,
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
            label: "To Date (AD)",
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
            name: "product",
            placeholder: "Enter  Product",
            label: "Product",
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
            type: "text",
            name: "voucher_no",
            placeholder: "Enter Voucher Number",
            validation_regex: "",
            label: "Voucher Number",
            optional: true,
          },
        ],
      },
    ],
  },
];

export { columns, filterFormData, tableData };

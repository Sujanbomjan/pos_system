import { IFormData } from "@/types/form";

const columns = [
  { name: "Asm", uid: "asm" },
  { name: "So", uid: "so" },
  { name: "Imp/Dist Code", uid: "dist_code" },
  { name: "Imp/ Dist Name", uid: "distName" },
  { name: "Customer Code", uid: "customer_code" },
  { name: "Pan/Vat No.", uid: "pan_no" },
  { name: "Phone Number", uid: "phone_number" },
  { name: "Address", uid: "address" },
  { name: "District", uid: "district" },
  { name: "Channel", uid: "channel" },
  { name: "Sub Channel ", uid: "sub_channel" },
  { name: "Sales man", uid: "salesman" },
  { name: "Route", uid: "route" },
  { name: "Bills Cut", uid: "bills_cut" },
];

const tableData = [
  {
    asm: "P001",
    so: "Product A",
    dist_code: "MP001",
    distName: "Brand X",
    customer_code: "BU1",
    pan_no: "Brand X",
    phone_number: "BU1",
    address: "BU1",
    district: "BU1",
    channel: "BU1",
    sub_channel: "BU1",
    salesman: "BU1",
    route: "BU1",
    bills_cut: "BU1",
  },
  {
    asm: "P001",
    so: "Product A",
    dist_code: "MP001",
    distName: "Brand X",
    customer_code: "BU1",
    pan_no: "Brand X",
    phone_number: "BU1",
    address: "BU1",
    district: "BU1",
    channel: "BU1",
    sub_channel: "BU1",
    salesman: "BU1",
    route: "BU1",
    bills_cut: "BU1",
  },
  {
    asm: "P001",
    so: "Product A",
    dist_code: "MP001",
    distName: "Brand X",
    customer_code: "BU1",
    pan_no: "Brand X",
    phone_number: "BU1",
    address: "BU1",
    district: "BU1",
    channel: "BU1",
    sub_channel: "BU1",
    salesman: "BU1",
    route: "BU1",
    bills_cut: "BU1",
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
            name: "supplier",
            placeholder: "Enter your supplier name",
            validation_regex: "",
            label: "Suppiler",
          },
          {
            type: "dropdown",
            name: "report_type",
            placeholder: "Select Report Type",
            validation_regex: "",
            label: "Report Type",
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
            type: "dropdown",
            name: "report_data",
            placeholder: "Select Report Data",
            validation_regex: "",
            label: "Select Report Data",
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
    ],
  },
];

export { columns, filterFormData, tableData };

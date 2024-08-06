import React from "react";
const columns = [
  { name: "Salesman No", uid: "sno" },
  { name: "Route Name", uid: "routename" },
  { name: "Route Code", uid: "routecode" },
  { name: "Effective Date", uid: "effectivedate" },
];

const tableData = [
  {
    "sno": "001",
    "routename": "Route A",
    "routecode": "RA001",
    "effectivedate": "2024-05-01"
  },
  {
    "sno": "002",
    "routename": "Route B",
    "routecode": "RB002",
    "effectivedate": "2024-06-15"
  },
  {
    "sno": "003",
    "routename": "Route C",
    "routecode": "RC003",
    "effectivedate": "2024-07-30"
  }
];

export { columns, tableData };

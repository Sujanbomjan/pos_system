import React from "react";
const columns = [
  { name: "Route Name", uid: "routename" },
  { name: "Route Code", uid: "routecode" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const tableData = [
  {
    "routename": "Route 1",
    "routecode": "R001",
    "status": "Active",
    // "actions": ["Edit", "Delete"],
      "avatar":
    'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
  },
  {
    "routename": "Route 2",
    "routecode": "R002",
    "status": "Inactive",
    // "actions": ["Edit", "Delete"],
      "avatar":
    'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
  },
  {
    "routename": "Route 3",
    "routecode": "R003",
    "status": "Active",
    // "actions": ["Edit", "Delete"],
      "avatar":
    'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp',
  },
];

export { columns, tableData };

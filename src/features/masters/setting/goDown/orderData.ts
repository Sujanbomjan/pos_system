const columns = [
  { name: "Name", uid: "godownName" },
  { name: "Address", uid: "address" },
  { name: "Phone No", uid: "phone" },
  { name: "Division", uid: "division" },
  { name: "Remarks", uid: "remarks" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const tableData = [
  {
    godownName: "Godown A",
    address: "123 Main Street, City, Country",
    phone: "+1234567890",
    division: "North",
    remarks: "Spacious storage area",
    status: "Active",
    avatar:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp",
  },
  {
    godownName: "Godown B",
    address: "456 Elm Street, City, Country",
    phone: "+1987654321",
    division: "South",
    remarks: "Temperature-controlled",
    status: "Active",
    avatar:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp",
  },
  {
    godownName: "Godown C",
    address: "789 Oak Street, City, Country",
    phone: "+1122334455",
    division: "East",
    remarks: "Near transport hub",
    status: "Inactive",
    avatar:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-01.webp",
  },
];
export { columns, tableData };


const columns = [
  { name: "Salesman Name", uid: "sales" },
  { name: "Address", uid: "address" },
  { name: "Mobile", uid: "mobile" },
  { name: "Salesman Id", uid: "salesmanid" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const tableData = [
  {
    sales: "John Doe",
    address: "123 Main Street, City, Country",
    mobile: "+1234567890",
    salesmanid: "S001",
    status: "Active",
  },
  {
    sales: "Jane Smith",
    address: "456 Elm Street, City, Country",
    mobile: "+1987654321",
    salesmanid: "S002",
    status: "Active",
  },
  {
    sales: "Bob Johnson",
    address: "789 Oak Street, City, Country",
    mobile: "+1122334455",
    salesmanid: "S003",
    status: "Inactive",
  },
];
export { columns, tableData };

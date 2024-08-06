import React from "react";
const columns = [
  { name: "Scheme No", uid: "no" },
  { name: "Scheme Description", uid: "description" },
  { name: "Scheme Type", uid: "schemeType" },
  { name: "Type", uid: "type" },
  { name: "R", uid: "r" },
  { name: "Valid From Date", uid: "from" },
  { name: "Valid To Date", uid: "to" },
  { name: "Pro-Rata Status", uid: "rata" },
  { name: "Allocated Budget", uid: "allocatedBudget" },
  { name: "Applied Budget", uid: "appliedBudget" },
  { name: "Actions", uid: "actions" },
];

const tableData = [
  {
    "no": "1",
    "description": "Discount on Bulk Purchase",
    "schemeType": "Discount",
    "type": "Bulk Purchase",
    "r": "5%",
    "from": "2024-06-01",
    "to": "2024-12-31",
    "rata": "Active",
    "allocatedBudget": "Rs. 10000",
    "appliedBudget": "Rs. 8000",
  },
  {
    "no": "2",
    "description": "Free Samples with Every Purchase",
    "schemeType": "Free Item",
    "type": "All Purchases",
    "r": "N/A",
    "from": "2024-07-01",
    "to": "2024-09-30",
    "rata": "In-Active",
    "allocatedBudget": "Rs. 5000",
    "appliedBudget": "Rs. 3000",
  },
  {
    "no": "3",
    "description": "Seasonal Discount",
    "schemeType": "Discount",
    "type": "Seasonal",
    "r": "10%",
    "from": "2024-10-01",
    "to": "2024-12-31",
    "rata": "Active",
    "allocatedBudget": "Rs. 15000",
    "appliedBudget": "Rs. 12000",
    // "actions": ["Edit", "Delete"]
  }
];

export { columns, tableData };

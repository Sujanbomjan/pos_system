"use client";
import {
  columns,
  tableData,
} from "@/features/masters/setting/salesman/orderData1";
import React, { useState } from "react";
import { Button, Input, Select } from "rizzui";
import TableBuilder from "@/features/TableBuilder/TableBuilder";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";

const pageHeader = {
  title: "Salesman Route Details",
  breadcrumb: [
    {
      href: routes.masters.setting.salesman,
      name: "Dashboard",
    },
    {
      href: routes.masters.setting.salesman,
      name: "Setting",
    },
    {
      href: routes.masters.setting.salesman,
      name: "Salesman",
    },
    {
      name: "Salesman Route details",
    },
  ],
};
const options = [
  { "label": "City", "value": "city" },
  { "label": "Highway", "value": "highway" },
  { "label": "Suburban", "value": "suburban" }
];

export default function App() {
  const [value, setValue] = useState(null);

  return (
    <>
      <div className="flex flex-row items-center gap-3 justify-center mb-4">
        <Select
          className="[&>label>span]:font-medium !flex flex-1 flex-col"
          label="Select"
          options={options}
          value={value}
          onChange={setValue}
        />
        <Input
          className="flex flex-1"
          type="date"
          label="Date"
          placeholder="Enter your date"
        />
        <Button className="mt-[20px] text-center">Add Route</Button>
      </div>
      <TableBuilder columns={columns} tableData={tableData} uniqueKey="sno" filterFormData={filterFormData[0]} />
    </>
  );
}

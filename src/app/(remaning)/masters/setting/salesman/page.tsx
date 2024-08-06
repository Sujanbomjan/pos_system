"use client";
import { columns, tableData } from "@/features/masters/setting/salesman/orderData";
import TableBuilder from "@/features/TableBuilder/TableBuilder";
import React, { useState } from "react";
import { Button, Input, Select } from "rizzui";
import Link from "next/link";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";

const pageHeader = {
  title: "Sales Man",
  breadcrumb: [
    {
      href: routes.masters.setting.salesman,
      name: "Dashboard",
    },
    {
      href: routes.masters.setting.salesman,
      name: "Sales Man",
    },
    {
      name: "Sales Man",
    },
  ],
};


export default function App() {

  return (
    <>
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex mb-4">
        <Link  className="mr-auto p-2" href={routes.masters.setting.salesman.addSalesman}>
          <Button>Add Salesman</Button>
        </Link>
        <Button>Export Salesman</Button>
      </div>
      <TableBuilder
        columns={columns}
        tableData={tableData}
        uniqueKey="sales"
        filterFormData={filterFormData[0]}
      />
    </>
  );
}

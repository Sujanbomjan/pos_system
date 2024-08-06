"use client";
import {
  columns,
  tableData,
} from "@/features/masters/setting/schemeView/orderData";
import TableBuilder from "@/features/TableBuilder/TableBuilder";
import React, { useState } from "react";
import { Button } from "rizzui";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";

const pageHeader = {
  title: "Scheme View",
  breadcrumb: [
    {
      href: routes.masters.setting.scheme,
      name: "Dashboard",
    },
    {
      href: routes.masters.setting.scheme,
      name: "Setting",
    },
    {
      name: "Scheme",
    },
  ],
};


export default function App() {

  return (
    <>
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <TableBuilder
        columns={columns}
        tableData={tableData}
        uniqueKey="no"
        filterFormData={filterFormData[0]}
      />
      
      <div className="flex flex-row gap-3 mt-4">
        <Button>Export Fixed Discout</Button>
        <Button>Export Scheme</Button>
      </div>
    </>
  );
}

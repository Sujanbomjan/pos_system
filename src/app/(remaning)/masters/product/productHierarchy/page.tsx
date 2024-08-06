"use client";
import TableBuilder from "@/features/TableBuilder/TableBuilder";
import {
  columns,
  tableData,
} from "@/features/masters/product/productHierechary/tableData";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";

const pageHeader = {
  title: "Product Master",
  breadcrumb: [
    {
      href: routes.masters.product.productHierarchy,
      name: "Dashboard",
    },
    {
      href: routes.masters.product.productHierarchy,
      name: "Product",
    },
    {
      name: "Product Hierarchy",
    },
  ],
};

export default function App() {
  return (
    <>
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <h3 className="mb-4">Products Hierarchy</h3>
      <TableBuilder
        columns={columns}
        tableData={tableData}
        uniqueKey="productName"
        filterFormData={filterFormData[0]}
      />
    </>
  );
}

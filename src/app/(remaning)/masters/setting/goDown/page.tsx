"use client";
import { routes } from "@/config/routes";
import TableBuilder from "@/features/TableBuilder/TableBuilder";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import {
  columns,
  tableData,
} from "@/features/masters/setting/goDown/orderData";
import Link from "next/link";
import { Button } from "rizzui";
import PageHeader from "@/components/PageHeader/page-header";

const pageHeader = {
  title: "GoDown",
  breadcrumb: [
    {
      href: routes.masters.setting.goDown,
      name: "Master",
    },
    {
      href: routes.masters.setting.goDown,
      name: "Setting",
    },
    {
      name: "GoDown",
    },
  ],
};

export default function App() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Link className="mb-4" href={routes.masters.setting.goDown.goDownAdd}>
        <Button>New Godown</Button>
      </Link>
      <h3 className="mb-4">Godown</h3>
      <TableBuilder
        filterFormData={filterFormData[0]}
        columns={columns}
        tableData={tableData}
        uniqueKey="godownName"
      />
    </>
  );
}

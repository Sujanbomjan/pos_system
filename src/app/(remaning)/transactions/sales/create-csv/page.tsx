"use client";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import CreateSales from "@/features/transactions/sales/create-sales-csv";
import Link from "next/link";
import React from "react";
import { Button } from "rizzui";

const pageHeader = {
  title: "Create Sales By CSV",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      href: routes.sales.sales,
      name: "Sales",
    },
    {
      name: "Create Sales By Csv",
    },
  ],
};

const CreateSalesPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <Link href={routes.sales.sales} className="w-fit">
          <Button as="span" variant="outline">
            Cancel
          </Button>
        </Link>
      </div>

      <div className="my-10">
        <CreateSales />
      </div>
    </div>
  );
};

export default CreateSalesPage;

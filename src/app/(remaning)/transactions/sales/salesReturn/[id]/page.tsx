"use client";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import SalesReturnData from "@/features/transactions/sales/return-sales";
import Link from "next/link";
import React from "react";
import { Button } from "rizzui";

const pageHeader = {
  title: "Sales Return",
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
      name: "Return",
    },
  ],
};

const SalesReturnPage = () => {
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
        <SalesReturnData />
      </div>
    </div>
  );
};

export default SalesReturnPage;

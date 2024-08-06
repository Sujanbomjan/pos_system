"use client";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import PurchaseReturn from "@/features/transactions/purchase/return-purchase";
import Link from "next/link";
import React from "react";
import { Button } from "rizzui";

const pageHeader = {
  title: "Purchase Return",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      href: routes.purchase.purchase,
      name: "Purchase",
    },
    {
      name: "Return",
    },
  ],
};

const PurchaseReturnPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <Link href={routes.purchase.purchase} className="w-fit">
          <Button as="span" variant="outline">
            Cancel
          </Button>
        </Link>
      </div>

      <div className="my-10">
        <PurchaseReturn />
      </div>
    </div>
  );
};

export default PurchaseReturnPage;

"use client";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import CreatePurchase from "@/features/transactions/purchase/create-purchase-csv";
import Link from "next/link";
import React from "react";
import { Button } from "rizzui";

const pageHeader = {
  title: "Create Purchase",
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
      name: "Create Purchase By CSV",
    },
  ],
};

const CreatePurchasePage = () => {
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
        <CreatePurchase />
      </div>
    </div>
  );
};

export default CreatePurchasePage;

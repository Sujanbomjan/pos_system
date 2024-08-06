"use client";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import CreatePurchase from "@/features/transactions/warehouseTransfer/edit-warehouse-transfer/index";
import Link from "next/link";
import React from "react";
import { Button } from "rizzui";


const pageHeader = {
  title: "Edit Warehouse Transfer",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      href: routes.inventory.warehouseTransfer.warehouseTransfer,
      name: "Warehouse Transfer",
    },
    {
      name: "Edit",
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
        <Link
          href={routes.inventory.warehouseTransfer.warehouseTransfer}
          className="w-fit"
        >
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

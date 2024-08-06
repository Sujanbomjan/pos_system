"use client";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import CreateRolePermission from "@/features/masters/setting/roles-permission/create-roles-permission";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { Router } from "next/router";
import React from "react";
import { Button } from "rizzui";

const pageHeader = {
  title: "Roles and Permission",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      href: routes.masters.roles_permission.viewRoles,
      name: "Roles and Permission",
    },
    {
      name: "Create",
    },
  ],
};

const AddRolesPermissionPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />

        <Button
          as="span"
          variant="outline"
          onClick={() => router.push(routes.masters.roles_permission.viewRoles)}
        >
          Cancel
        </Button>
      </div>

      <div className="my-10">
        <CreateRolePermission />
      </div>
    </div>
  );
};

export default AddRolesPermissionPage;

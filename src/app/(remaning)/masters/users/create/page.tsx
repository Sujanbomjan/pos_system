"use client";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import CreateUsersForm from "@/features/masters/users/create-users-form";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { Router } from "next/router";
import React from "react";
import { Button } from "rizzui";

const pageHeader = {
  title: "Create Users",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Users",
    },
    {
      href: routes.masters.users.createUsers,
      name: "Create",
    },
  ],
};

export default function CreateUsers() {
  //   const router = useRouter();
  return (
    <div>
      <div className="flex justify-between">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />

        {/* <Button
          as="span"
          variant="outline"
          onClick={() => router.push(routes.masters.roles_permission.viewRoles)}
        >
          Cancel
        </Button> */}
      </div>

      <div className="my-10">
        <CreateUsersForm />
      </div>
    </div>
  );
}

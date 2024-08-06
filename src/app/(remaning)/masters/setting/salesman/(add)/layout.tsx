"use client";
import React from "react";
import { routes } from "@/config/routes";
import TabContainer from "@/components/TabContainer/TabContainer";
import { Button } from "rizzui";
import PageHeader from "@/components/PageHeader/page-header";
const pageHeader = {
  title: "Sales Man",
  breadcrumb: [
    {
      href: routes.masters.setting.salesman,
      name: "Dashboard",
    },
    {
      href: routes.masters.setting.salesman,
      name: "Setting",
    },
    {
      href: routes.masters.setting.salesman,
      name: "Salesman",
    },
    {
      name: "Salesman",
    },
  ],
};
const TabItems = [
  {
    path: routes.masters.setting.salesman.addSalesman,
    name: "General Info",
  },
  {
    path: routes.masters.setting.salesman.addWithRouteDetails,
    name: "Route Details",
  },
];
const layout = ({ children }: any) => {
  return (
    <>
      <div>
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <TabContainer tabItem={TabItems} />
      </div>
      <div>{children}</div>
    </>
  );
};

export default layout;

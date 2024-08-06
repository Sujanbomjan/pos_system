"use client";
import TableBuilder from "@/features/TableBuilder/TableBuilder";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import {
  columns,
  tableData,
} from "@/features/masters/setting/channel/orderData";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";

const pageHeader = {
  title: "Channel Sub",
  breadcrumb: [
    {
      href: routes.masters.setting.channelSub,
      name: "Dashboard",
    },
    {
      href: routes.masters.setting.channelSub,
      name: "Setting",
    },
    {
      name: "Channel Sub",
    },
  ],
};
export default function App() {
  return (
    <>
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <TableBuilder
        filterFormData={filterFormData[0]}
        columns={columns}
        tableData={tableData}
        uniqueKey="channel"
      />
    </>
  );
}

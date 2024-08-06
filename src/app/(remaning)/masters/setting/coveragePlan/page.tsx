"use client";
import {
  columns,
  users,
} from "@/features/masters/setting/coveragePlan/orderData";
import {
  columns1,
  users1,
} from "@/features/masters/setting/coveragePlan/orderData1";
import {
  ChipProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Button, Checkbox, Select } from "rizzui";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";

const pageHeader = {
  title: "Coverage Plan",
  breadcrumb: [
    {
      href: routes.masters.setting.coveragePlan,
      name: "Master",
    },
    {
      href: routes.masters.setting.coveragePlan,
      name: "Setting",
    },
    {
      name: "Coverage Plan",
    },
  ],
};
const statusColorMap: Record<string, ChipProps["color"]> = {
  edit: "primary",
  delete: "danger",
  view: "warning",
};
const options = [
  { "label": "बैशाख", "value": "Baisakh" },
  { "label": "जेठ", "value": "Jeth" },
  { "label": "असार", "value": "Asar" },
  { "label": "साउन", "value": "Shrawan" },
  { "label": "भदौ", "value": "Bhadra" },
  { "label": "आश्विन", "value": "Ashwin" },
  { "label": "कार्तिक", "value": "Kartik" },
  { "label": "मंसिर", "value": "Mangsir" },
  { "label": "पौष", "value": "Poush" },
  { "label": "माघ", "value": "Magh" },
  { "label": "फागुन", "value": "Falgun" },
  { "label": "चैत्र", "value": "Chaitra" }
]

type User = (typeof users)[0];
type User1 = (typeof users1)[0];


export default function App() {

  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState(null);
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "weeks":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {user.weeks}
            </p>
          </div>
        );
      case "sun":
        return (
          <div className="flex flex-col">
            <Checkbox label={""} />
          </div>
        );
      case "mon":
        return (
          <div className="flex flex-col">
            <Checkbox value={user.mon} />
          </div>
        );
      case "tue":
        return (
          <div className="flex flex-col">
            <Checkbox value={user.tue} />
          </div>
        );
      case "wed":
        return (
          <div className="flex flex-col">
            <Checkbox value={user.wed} />
          </div>
        );
      case "thr":
        return (
          <div className="flex flex-col">
            <Checkbox value={user.thr} />
          </div>
        );

      case "fri":
        return (
          <div className="flex flex-col">
            <Checkbox value={user.fri} />
          </div>
        );
      case "sat":
        return (
          <div className="flex flex-col">
            <Checkbox value={user.sat} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const renderCell1 = React.useCallback(
    (user: User1, columnKey1: React.Key) => {
      const cellValue1 = user[columnKey1 as keyof User1];
      switch (columnKey1) {
        case "date":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {user.date}
              </p>
            </div>
          );
        case "days":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {user.days}
              </p>
            </div>
          );

        default:
          return cellValue1;
      }
    },
    []
  );

  return (
    <>
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="grid lg:grid-cols-2 gap-4 ">
        <div className="shadow-lg rounded-lg overflow-hidden mb-[40px]">
          <Table
            aria-label="Example table with custom cells"
            className="w-full table-auto"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  className="px-4 py-2 bg-gray-100 text-gray-600"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={users}>
              {(item) => (
                <TableRow key={item.weeks} className="hover:bg-gray-100">
                  {(columnKey: any) => (
                    <TableCell className="px-4 py-2 border">
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div>
          <div className="flex flex-row gap-2 mt-[50px]">
            <Select
              className="[&>label>span]:font-medium !flex flex-1 flex-col"
              label="Select Month"
              options={options}
              value={value}
              onChange={setValue}
            />
            <Button className="mt-[25px]">Generate Schedule</Button>
          </div>

          <br />
          <Table
            aria-label="Example table with custom cells"
            className="w-full table-auto"
          >
            <TableHeader columns={columns1}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  className="px-4 py-2 bg-gray-100 text-gray-600"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={users1}>
              {(item) => (
                <TableRow key={item.date} className="hover:bg-gray-100">
                  {(columnKey: any) => (
                    <TableCell className="px-4 py-2 border">
                      {renderCell1(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <Button>Save</Button>
        <Button>Back</Button>
      </div>
    </>
  );
}

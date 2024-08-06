"use client";
import PencilIcon from "@/components/icons/pencil";
import { IFormData } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ActionIcon, Avatar, Badge, Button, Text, Tooltip } from "rizzui";
import FormBuilder from "../FormBuilder/FormBuilder";
import getDefaultValues from "../getDefaultValues";
import formData from "../masters/setting/goDown/formData";
import schemaGenerator from "../schemaGenerator/schemaGenerator";

import DeletePopover from "@/components/icons/delete-popover";
import { routes } from "@/config/routes";
interface IColumns {
  name: string;
  uid: string;
}

type TableData = { [key: string]: any };

interface ITableBuilderProps {
  columns: IColumns[];
  tableData: TableData[];
  uniqueKey: string;
  filterFormData: IFormData;
  isFilter?: boolean;
}

const TableBuilder = ({
  columns,
  tableData,
  uniqueKey,
  filterFormData,
  isFilter = true,
}: ITableBuilderProps) => {
  const [page, setPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [formStep, setFormStep] = useState(0);

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
    getValues,
  } = useForm({
    defaultValues: getDefaultValues(filterFormData),
    resolver: yupResolver(schemaGenerator(filterFormData)),
  });

  const isFinalStep = formStep + 1 === formData.length;

  const onSubmit = (data: any) => {
    if (!isFinalStep) {
      setFormStep((prev) => ++prev);
      return;
    }
    //change the url query params and based on that call the filter api on the page
    console.log(data);
  };

  return (
    <div className="">
      {/* filter starts here */}
      <div className={`${filterFormData ? "flex" : "hidden"} flex-col`}>
        {isFilter && (
          <Button
            className={`${
              isFilterVisible && "bg-red-400 hover:!bg-red-500"
            } inline-flex gap-1 self-end`}
            onClick={() => setIsFilterVisible((prev) => !prev)}
          >
            {isFilterVisible ? (
              <>
                <IoMdClose size={16} />
                Close
              </>
            ) : (
              <>
                <FaFilter />
                Filter
              </>
            )}
          </Button>
        )}
        {/* filter component */}
        <div
          className={`${
            isFilterVisible ? "flex" : "hidden"
          } transition w-full flex-col pb-8`}
        >
          {isFilter && (
            <div className="border-[1px] rounded-md p-4">
              <FormBuilder
                size="sm"
                data={filterFormData}
                {...{
                  handleSubmit,
                  isFinalStep,
                  register,
                  errors,
                  onSubmit,
                  control,
                  reset,
                  formStep,
                  setFormStep,
                  getValues,
                }}
                buttonLabel="Filter"
              />
            </div>
          )}
        </div>
      </div>

      {/* table starts here */}
      <div className="overflow-hidden">
        <Table
          aria-label="Example table with custom cells"
          className="w-full table-auto"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                classNames={{
                  cursor: "!bg-red-100",
                }}
                page={page}
                total={10}
                onChange={(page) => {
                  setPage(page);
                }}
              />
            </div>
          }
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
          <TableBody items={tableData}>
            {(item) => (
              <TableRow key={item[uniqueKey]} className="hover:bg-gray-100">
                {(columnKey) => (
                  <TableCell className="px-4 py-2 border">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const renderCell = (user: TableData, columnKey: React.Key) => {
  const cellValue = user[columnKey as any];
  if (columnKey === "status") {
    let statusColorClass = "";
    let badgeColor = "";

    if (user.status === "Active") {
      statusColorClass = "text-green-dark";
      badgeColor = "success";
    } else if (user.status === "Inactive") {
      statusColorClass = "text-red-dark";
      badgeColor = "danger";
    }

    return (
      <div className="flex items-center">
        <Badge color={badgeColor as any} renderAsDot />
        <Text className={`ms-2 font-medium ${statusColorClass}`}>
          {user.status}
        </Text>
      </div>
    );
  }

  if (columnKey === "name") {
    console.log("avatar", user.avatar);
    return (
      <div className={"flex items-center gap-3"}>
        {user.avatar ? (
          <>
            <Avatar name={user.productName} src={user.avatar} />
            <div className="grid gap-0.5">
              <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
                {user.productName}
              </Text>
              <Text className="text-[13px] text-gray-500">
                {user.productName}
              </Text>
            </div>
          </>
        ) : null}
      </div>
    );
  }

  if (columnKey === "actions") {
    return (
      <div className="flex items-center justify-start gap-3">
        <Link href={routes.masters.setting.routeMaster.routeMasterEdit}>
          <Tooltip size="sm" content={"Edit"} placement="top" color="invert">
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
        </Link>
        <DeletePopover
          title={`Delete the invoice`}
          onDelete={() => {}}
          description={`Are you sure you want to delete this invoice?`}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="text-bold text-sm capitalize text-default-400">
        {user[columnKey as keyof typeof user]}
      </p>
    </div>
  );
};

const keyGenerator = (object: any) => {
  const keyArray = [] as string[];
  Object.values(object).forEach((value: any) => {
    keyArray.push(value);
  });
  return keyArray.join("-");
};

export default TableBuilder;

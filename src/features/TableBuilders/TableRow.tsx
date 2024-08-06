import NumberWithCommas from "@/components/NumberCommas/NumberCommas";
import type {
  IColumns,
  TableActionHandler,
  TableColumnsClickHandler,
  TableData,
} from "@/types/table";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCaretDown } from "react-icons/rx";
import { Button, Checkbox, Popover, cn } from "rizzui";

// Props for TableRow
interface TableRowProps {
  item: TableData;
  sn: number;
  columns: IColumns[];
  actionHandler?: TableActionHandler;
  uniqueKey: string;
  selectedRowId: string[];
  setSelectedRowId: Dispatch<SetStateAction<string[]>>;
  handleRowClick?: (id: string) => void;
  handleClickOnColumns?: TableColumnsClickHandler;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  sn,
  columns,
  actionHandler,
  uniqueKey,
  selectedRowId,
  setSelectedRowId,
  handleRowClick,
  handleClickOnColumns,
}) => {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);

  const renderFieldContent = (field: string) => {
    if (typeof item[field] === "string" && item[field].includes(",")) {
      return item[field].split(",").map((value: any, index: any) => (
        <div key={index} className={index > 0 ? "mt-1" : ""}>
          {value?.trim()}
        </div>
      ));
    }
    return item[field];
  };

  // Check if item is empty
  const isEmpty = Object.keys(item).length === 0;

  // If item is empty, render No Data Found message
  if (isEmpty) {
    return (
      <tr>
        <td colSpan={columns.length + 1} className="text-center py-4">
          No Data Found
        </td>
      </tr>
    );
  }

  //called on each column click
  const columnActionHandler = (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    uid: string
  ) => {
    if (handleClickOnColumns && handleClickOnColumns[uid]) {
      e.stopPropagation();
      handleClickOnColumns[uid](item[uniqueKey]);
      return;
    }
  };

  return (
    <tr
      key={item[uniqueKey]}
      className="relative dark:even:bg-gray-100 hover:bg-gray-300 dark:hover:bg-gray-300 cursor-pointer"
      onClick={() => {
        handleRowClick && handleRowClick(item[uniqueKey]);
      }}
    >
      {/* Serial number column */}
      <td className="pl-6 text-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center justify-center h-full w-full">
          <Checkbox
            size="sm"
            checked={selectedRowId.some(
              (selectedId) => selectedId === item[uniqueKey]
            )}
            className="custom-checkbox"
            onChange={(e) => {
              e.stopPropagation();
              setSelectedRowId(() => {
                // add selected value to the array
                if (e.target.checked) {
                  return [...selectedRowId, item[uniqueKey]];
                }
                // if unselected remove the value from the array
                return selectedRowId.filter(
                  (selectedId) => selectedId !== item[uniqueKey]
                );
              });
            }}
          />
        </div>
      </td>
      <td className="px-6 py-3 text-sm">{sn}</td>

      {columns.map(({ uid, type, objectField, render }) => {
        if (type === "date") {
          return (
            <td key={uid} className="px-6 py-1 text-sm">
              {new Date(item[uid]).toDateString()}
            </td>
          );
        }

        if (type === "object" && objectField && item[uid]) {
          return (
            <td key={uid} className="px-6 py-1 text-sm">
              {item[uid][objectField]}
            </td>
          );
        }

        if (type === "float") {
          return (
            <td key={uid} className="px-6 py-1 text-sm">
              {parseFloat(item[uid]).toFixed(2)}
            </td>
          );
        }

        if (type === "custom" && render) {
          return (
            <td key={uid} className="px-6 py-1 text-sm">
              {render(item)}
            </td>
          );
        }

        if (type === "image") {
          return (
            <div className="py-2 px-6 cursor-pointer relative" key={uid}>
              {item[uid] && (
                <Image
                  alt="image"
                  width={40}
                  height={40}
                  src={item[uid]}
                  className="rounded-full w-[40px] h-[40px] shrink-0"
                />
              )}
            </div>
          );
        }

        if (type === "boolean") {
          if (item[uid] === null) {
            return <td key={uid}></td>;
          }

          if (!isNaN(Number(item[uid])) && Number(item[uid]) !== 0) {
            return (
              <td
                className="text-center px-6 py-3 text-xs"
                key={uid}
                onClick={(e) => columnActionHandler(e, uid)}
              >
                <div className="text-red-dark px-3 py-1 bg-red-lighter font-semibold w-max rounded-full">
                  {<NumberWithCommas value={Number(item[uid]).toFixed(2)} />}
                </div>
              </td>
            );
          }
          if (!isNaN(Number(item[uid])) && Number(item[uid]) === 0) {
            return (
              <td
                className="text-center px-6 py-3 text-xs"
                key={uid}
                onClick={(e) => columnActionHandler(e, uid)}
              ></td>
            );
          }

          //success color
          if (["completed", "received"].includes(item[uid]?.toLowerCase())) {
            return (
              <td
                className="text-center px-6 py-3 text-xs"
                key={uid}
                onClick={(e) => columnActionHandler(e, uid)}
              >
                <div className="text-green-dark px-3 py-1 bg-green-lighter font-semibold w-max rounded-full">
                  {item[uid]}
                </div>
              </td>
            );
          }
          //warning color
          if (["returned", "cancelled"].includes(item[uid]?.toLowerCase())) {
            return (
              <td
                onClick={(e) => columnActionHandler(e, uid)}
                className="text-center px-6 py-3 text-xs"
                key={uid}
              >
                <div className="text-red-dark px-3 py-1 bg-red-lighter font-semibold w-max rounded-full">
                  {item[uid]}
                </div>
              </td>
            );
          }
          //yellow color
          if (["pending"].includes(item[uid]?.toLowerCase())) {
            return (
              <td
                onClick={(e) => columnActionHandler(e, uid)}
                className="text-center px-6 py-3 text-xs"
                key={uid}
              >
                <div className="text-orange-dark px-3 py-1 bg-orange-lighter font-semibold w-max rounded-full">
                  {item[uid]}
                </div>
              </td>
            );
          }
          //blue color
          if (["ordered"].includes(item[uid]?.toLowerCase())) {
            return (
              <td
                onClick={(e) => columnActionHandler(e, uid)}
                className="text-center px-6 py-3 text-xs"
                key={uid}
              >
                <div className="text-blue-dark px-3 py-1 bg-blue-lighter font-semibold w-max rounded-full">
                  {item[uid]}
                </div>
              </td>
            );
          }
        }

        // Action column
        if (uid === "actions" && actionHandler) {
          return (
            <td className="px-6 py-3 text-sm" key={uid}>
              <Popover
                isOpen={isActionDialogOpen}
                setIsOpen={setIsActionDialogOpen}
                placement="bottom-end"
              >
                <Popover.Trigger>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={cn(
                      "shrink-0  rounded-md outline-none ring-1 ring-gray-300 px-2 py-1 flex items-center justify-center"
                    )}
                  >
                    Actions
                    <RxCaretDown />
                  </button>
                </Popover.Trigger>

                <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
                  <div className="flex flex-col items-start">
                    {actionHandler.handleEdit && (
                      <Button
                        variant="text"
                        onClick={(e) => {
                          e.stopPropagation();
                          actionHandler.handleEdit &&
                            actionHandler.handleEdit(item[uniqueKey]);
                          setIsActionDialogOpen(false);
                        }}
                        className="inline-flex gap-1"
                      >
                        <FaEdit size={18} color="primary" />
                        Edit
                      </Button>
                    )}
                    {actionHandler.handleView && (
                      <Button
                        variant="text"
                        onClick={(e) => {
                          e.stopPropagation();
                          actionHandler.handleView &&
                            actionHandler.handleView(item[uniqueKey]);
                        }}
                        className="inline-flex gap-1"
                      >
                        <FaEye size={18} />
                        View
                      </Button>
                    )}
                    {actionHandler.handleDelete && (
                      <Button
                        variant="text"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsActionDialogOpen(false);
                          actionHandler.handleDelete &&
                            actionHandler.handleDelete(item[uniqueKey]);
                        }}
                        className="inline-flex gap-1"
                      >
                        <RiDeleteBin6Line size={18} color="primary" />
                        Delete
                      </Button>
                    )}
                    {actionHandler.handleReturn && (
                      <Button
                        variant="text"
                        onClick={(e) => {
                          e.stopPropagation();
                          actionHandler.handleReturn &&
                            actionHandler.handleReturn(item[uniqueKey]);
                        }}
                        className="inline-flex gap-1"
                      >
                        <MdKeyboardDoubleArrowLeft />
                        Return
                      </Button>
                    )}
                  </div>
                </Popover.Content>
              </Popover>
            </td>
          );
        }
        return (
          <td
            key={uid}
            className="px-6 py-3 text-sm"
            onClick={(e) => columnActionHandler(e, uid)}
          >
            {renderFieldContent(uid)}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;

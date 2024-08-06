"use client";
import EmptyData from "@/components/EmptyData/EmptyData";
import ActionModal from "@/components/Modal/ActionModal";
import TableSkeletal from "@/components/skeletal/TableSkeletal";
import useQueryParams from "@/hooks/use-pararms";
import { IColumns, ITableBuilderProps } from "@/types/table";
import { useModal } from "@ebay/nice-modal-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CiExport, CiImport } from "react-icons/ci";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { Button, Checkbox } from "rizzui";
import { Pagination } from "./Pagination";
import TableRow from "./TableRow";

const TableBuilder = ({
  endCountOfPage,
  startCountOfPage,
  totalData,
  tableData,
  columns,
  actionHandler,
  uniqueKey,
  tableTitle,
  isLoading,
  totalPageCount,
  selectedRowId,
  setSelectedRowId,
  handleSelectedDelete,
  handleSelectedExport,
  handleRowClick,
  handleClickOnColumns,
  showDeleteButton = false,
}: ITableBuilderProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const deleteModal = useModal(ActionModal);

  const currentPageDataCount = endCountOfPage - startCountOfPage + 1;

  const { setMultipleQueryParams } = useQueryParams();
  const sortDirection = searchParams.get("sortDirection");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handlePageClick = (e: any) => {
    const activePageNumber = e.selected + 1;
    setSelectedRowId([]);
    router.push(pathname + "?" + createQueryString("page", activePageNumber));
  };

  const handleCountChange = (e: any) => {
    const resultPerPage = e.target.value;
    router.push(pathname + "?" + createQueryString("limit", resultPerPage));
  };

  const [data, setData] = useState([...(tableData || [])]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [sortKey, setSortKey] = useState<string>();

  useEffect(() => {
    setData(tableData || []);
  }, [tableData]);

  const handleSorting = (id: string) => {
    setSortKey(id);

    if (sortOrder === "none") {
      setSortOrder("asc");
      setMultipleQueryParams({
        sortBy: id,
        sortDirection: "asc",
      });
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setMultipleQueryParams({
        sortBy: id,
        sortDirection: "desc",
      });
    } else if (sortOrder === "desc") {
      setSortOrder("none");
      setMultipleQueryParams({
        sortBy: "",
        sortDirection: "",
      });
    }
  };

  if (isLoading) {
    return <TableSkeletal columns={columns.length} rows={10} />;
  }

  // Group columns by mainHeading
  const groupedColumns = columns.reduce((acc, column) => {
    if (column.mainHeading) {
      if (!acc[column.mainHeading]) {
        acc[column.mainHeading] = [];
      }
      acc[column.mainHeading].push(column);
    }
    return acc;
  }, {} as Record<string, IColumns[]>);

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold text-xl">{tableTitle}</p>
      </div>

      <p className="font-semibold mb-2">
        Showing {startCountOfPage} to {endCountOfPage} of {totalData} entries
      </p>

      <div className="overflow-auto relative max-h-[calc(620px)]">
        <table className="min-w-full divide-y divide-gray-200 font-[sans-serif] border-[1px] relative">
          <thead className="bg-gray-300 whitespace-nowrap sticky top-0 left-0 z-[99]">
            {/* Render main headings if they exist */}
            {Object.keys(groupedColumns).length > 0 && (
              <>
                <tr className="heading-row">
                  <th className="pl-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0"></th>
                  <th className="px-6 py-3 sticky top-0 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {/* S.N. */}
                  </th>
                  {Object.keys(groupedColumns).map((mainHeading, idx) => (
                    <th
                      key={idx}
                      colSpan={groupedColumns[mainHeading].length}
                      className="px-6 py-3 sticky top-0 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {mainHeading}
                    </th>
                  ))}
                </tr>
                {/* Render sub headings */}
                <tr className="subheading-row">
                  <th className="pl-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={currentPageDataCount === selectedRowId.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            return setSelectedRowId(
                              data.map((item) => item[uniqueKey])
                            );
                          }
                          setSelectedRowId([]);
                        }}
                        size="sm"
                        inputClassName="bg-white"
                        className="custom-checkbox"
                      />
                    </div>
                  </th>
                  <th className="px-6 py-3 sticky top-0 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    S.N.
                  </th>
                  {columns.map(({ name, uid, isSortable }) => (
                    <th
                      key={uid}
                      onClick={() => {
                        if (isSortable) {
                          handleSorting(uid);
                        }
                      }}
                      className={`${
                        isSortable ? "cursor-pointer select-none" : ""
                      } px-6 py-3 sticky top-0 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider`}
                    >
                      <span>{name}</span>
                      <span
                        className={`absolute top-1 right-0 ${
                          isSortable ? "flex" : "hidden"
                        }`}
                      >
                        {sortKey === uid && sortDirection === "asc" && (
                          <MdArrowDropUp size={22} />
                        )}
                      </span>
                      <span
                        className={`absolute top-3 right-0 ${
                          isSortable ? "flex" : "hidden"
                        }`}
                      >
                        {sortKey === uid && sortDirection === "desc" && (
                          <MdArrowDropDown size={22} />
                        )}
                      </span>
                      <span className={isSortable ? "flex" : "hidden"}>
                        {!sortDirection && (
                          <span className="flex flex-col gap-0">
                            <MdArrowDropUp
                              size={22}
                              className="absolute top-1 right-0"
                            />
                            <MdArrowDropDown
                              size={22}
                              className="absolute top-3 right-0"
                            />
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </>
            )}
            {/* Render default column headers if no main headings */}
            {Object.keys(groupedColumns).length === 0 && (
              <tr className="heading-row">
                <th className="pl-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={currentPageDataCount === selectedRowId.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          return setSelectedRowId(
                            data.map((item) => item[uniqueKey])
                          );
                        }
                        setSelectedRowId([]);
                      }}
                      size="sm"
                      inputClassName="bg-white"
                      className="custom-checkbox"
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  S.N.
                </th>
                {columns.map(({ name, uid, isSortable }) => (
                  <th
                    key={uid}
                    onClick={() => {
                      if (isSortable) {
                        handleSorting(uid);
                      }
                    }}
                    className={`${
                      isSortable ? "cursor-pointer select-none" : ""
                    } px-6 py-3 sticky top-0 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider`}
                  >
                    <span>{name}</span>
                    <span
                      className={`absolute top-1 right-0 ${
                        isSortable ? "flex" : "hidden"
                      }`}
                    >
                      {sortKey === uid && sortDirection === "asc" && (
                        <MdArrowDropUp size={22} />
                      )}
                    </span>
                    <span
                      className={`absolute top-3 right-0 ${
                        isSortable ? "flex" : "hidden"
                      }`}
                    >
                      {sortKey === uid && sortDirection === "desc" && (
                        <MdArrowDropDown size={22} />
                      )}
                    </span>
                    <span className={isSortable ? "flex" : "hidden"}>
                      {!sortDirection && (
                        <span className="flex flex-col gap-0">
                          <MdArrowDropUp
                            size={22}
                            className="absolute top-1 right-0"
                          />
                          <MdArrowDropDown
                            size={22}
                            className="absolute top-3 right-0"
                          />
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            )}
          </thead>

          <tbody className="divide-y divide-gray-200 whitespace-nowrap">
            {data.length !== 0 &&
              data.map((item, index: number) => (
                <TableRow
                  handleClickOnColumns={handleClickOnColumns}
                  handleRowClick={handleRowClick}
                  selectedRowId={selectedRowId}
                  setSelectedRowId={setSelectedRowId}
                  uniqueKey={uniqueKey}
                  item={item}
                  sn={startCountOfPage + index}
                  key={index}
                  columns={columns}
                  actionHandler={actionHandler}
                />
              ))}
          </tbody>
        </table>
      </div>

      <div
        className={`w-full rounded-md border px-4 py-2 mt-3 ${
          selectedRowId.length === 0
            ? "hidden"
            : "flex flex-row items-center justify-between"
        }`}
      >
        <div className="inline-flex gap-6">
          <p className="font-semibold">{selectedRowId.length} selected</p>
          {!showDeleteButton && (
            <p
              className="text-red-500 underline cursor-pointer hover:text-red-600"
              onClick={() => {
                deleteModal.show({
                  handleAction: handleSelectedDelete,
                });
              }}
            >
              Delete
            </p>
          )}
        </div>

        <div className="flex flex-row gap-4">
          <Button className="inline-flex gap-1">
            <CiImport size={22} />
            Import
          </Button>
          <Button
            className="inline-flex gap-1"
            onClick={() => {
              deleteModal.show({
                handleAction: handleSelectedExport,
                isPrimary: true,
                text: "Are you sure you want to export these selected items",
                title: "Export data",
                icon: <CiExport size={24} className="text-blue-500" />,
                deleteButtonText: "Export",
              });
            }}
          >
            <CiExport size={22} />
            Export
          </Button>
        </div>
      </div>

      {data.length === 0 && (
        <div>
          <EmptyData width={150} />
        </div>
      )}

      <Pagination
        {...{ handleCountChange, handlePageClick }}
        totalPageCount={totalPageCount || 10}
      />
    </div>
  );
};

export default TableBuilder;

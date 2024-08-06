"use client";
import useDeleteMultipleWarehouse from "@/api/hooks/master/setting/warehouse/useDeleteMultipleWarehouse";
import useExportWarehouse from "@/api/hooks/master/setting/warehouse/useExportWarehouse";
import AsyncSelect from "@/components/AsyncDropdownSelect/AsyncSelect";
import DateFiled from "@/components/DateFiled/DateFiled";
import ActionModal from "@/components/Modal/ActionModal";
import NepaliCalendar from "@/components/NepaliCalendar/NepaliCalendar";
import FilterBuilder from "@/features/FilterBuilder/FilterBuilder";
import useQueryParams from "@/hooks/use-pararms";
import { useTable } from "@/hooks/use-table";
import { exportToCSV } from "@/utils/export-to-csv";
import { getDateRangeStateValues } from "@/utils/validators/get-formatted-date";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiExport, CiImport } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button, Checkbox, Popover, cn } from "rizzui";
import ImportWarehouseProductModal from "./modals/ImportWarehouseProductModal";
import useWarehouseProductData from "./orderData";

const FilterSection = () => {
  const filterState = {
    createdAt: [null, null],
    product_id: [null],
    warehouse_id: [null],
  };

  const { filters, updateFilter, handleReset } = useTable([], 10, filterState);

  const client = useQueryClient();
  const deleteMultiple = useDeleteMultipleWarehouse();
  const actionModal = useModal(ImportWarehouseProductModal);
  const { data: exportData, isLoading, isError, error } = useExportWarehouse();
  const { warehouseDropDownObject } = useWarehouseProductData();

  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const exportSelected = async () => {
    try {
      if (!exportData || isLoading || isError) {
        toast.error("Export URL not available");
        return;
      }
      const url = exportData.data.url;
      exportToCSV(url, "Warehouse", "Warehouse");
    } catch (error) {
      console.error("Error exporting warehouse:", error);
      toast.error("Error exporting warehouse");
    }
  };

  const { setMultipleQueryParams, clearQueryParams, setQueryParams } =
    useQueryParams();
  const deleteModal = useModal(ActionModal);

  const handleDeleteAll = () => {
    deleteMultiple.mutate(
      { delete_all: true },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["warehouse"] });
          toast.success("Successfully deleted all items");
        },
        onError: () => {
          toast.error("Error while deleting all items");
        },
      }
    );
  };
  const handleResetFilters = () => {
    handleReset();
    setSelectedWarehouse(null);
    setMultipleQueryParams({
      product_id: null,
      warehouse_id: null,
      page: 1,
    });
  };

  const handleSelectChange = (selectedOption: any, type: any) => {
    const value = selectedOption ? selectedOption.value : null;
    const paramValue = value ? [value] : [null];
    if (type === "warehouse") {
      setSelectedWarehouse(selectedOption);
      setMultipleQueryParams({
        warehouse_id: paramValue,
        page: 1,
      });
    }
  };

  const searchParams = useSearchParams();
  const isBS = !!(searchParams.get("bs") ?? true);

  return (
    <div className="flex flex-row gap-2 items-center mb-4">
      <FilterBuilder
        enableDrawerFilter
        searchPlaceholder="Search by Product"
        searchKey="product_id"
        handleReset={handleResetFilters}
      >
        {" "}
        {!isBS ? (
          <DateFiled
            className="w-full"
            selected={getDateRangeStateValues(filters["createdAt"][0])}
            startDate={getDateRangeStateValues(filters["createdAt"][0])}
            endDate={getDateRangeStateValues(filters["createdAt"][1])}
            onChange={(date: any) => {
              updateFilter("createdAt", date);
              setMultipleQueryParams({
                date: `${new Date(date[0]).toLocaleDateString()}-${new Date(
                  date[1]
                ).toLocaleDateString()}`,
                page: 1,
              });
            }}
            placeholderText="Select created date"
          />
        ) : (
          <div className="flex flex-row gap-2">
          <NepaliCalendar
            value={searchParams.get("start-date") || ""}
            onChange={(value) => {
              setMultipleQueryParams({
                "start-date": value,
                bs: true,
              });
            }}
            onClear={() => setQueryParams("start-date", "")}
          />
          <NepaliCalendar
            value={searchParams.get("end-date") || ""}
            onChange={(value) => {
              setMultipleQueryParams({
                "end-date": value,
                bs: true,
              });
            }}
            onClear={() => setQueryParams("end-date", "")}
            minDate={searchParams.get("start-date") || undefined}
            placeholder="Select end date"
          />
        </div>
        )}
        <Checkbox
          size="md"
          name="bs"
          label="BS"
          checked={isBS}
          onChange={() => {
            if (isBS) {
              setMultipleQueryParams({
                "start-date": "",
                "end-date": "",
                bs: "",
              });
              updateFilter("startDate", [null, null]);
              updateFilter("endDate", [null, null]);
              return;
            }
            setMultipleQueryParams({
              date: "",
              bs: true,
            });
          }}
        />
        <div className="mt-1">
          <AsyncSelect
            label=""
            className="!min-w-96"
            size="md"
            options={warehouseDropDownObject}
            value={selectedWarehouse}
            placeholder="Select Warehouse"
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "warehouse")
            }
            isClearable={true}
            error={""}
          />
        </div>
      </FilterBuilder>

      <Popover shadow="sm" placement="bottom-end">
        <Popover.Trigger>
          <button
            className={cn(
              "shrink-0 rounded-md outline-none ring-1 ring-gray-300 p-2 flex items-center justify-center"
            )}
          >
            <LuSettings2 size={20} />
          </button>
        </Popover.Trigger>

        <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
          <div className="flex flex-col">
            <Button
              variant="text"
              className="inline-flex gap-1"
              onClick={() => {
                deleteModal.show({
                  handleAction: handleDeleteAll,
                  text: "Are you sure you want to delete all warehouses?",
                  title: "Delete all warehouses",
                  icon: <RiDeleteBin6Line size={24} className="text-red-500" />,
                  deleteButtonText: "Delete all",
                });
              }}
            >
              <RiDeleteBin6Line size={20} />
              Delete all
            </Button>
            <Button
              onClick={() => {
                deleteModal.show({
                  handleAction: exportSelected,
                  isPrimary: true,
                  text: "Are you sure you want to export these items?",
                  title: "Export data",
                  icon: <CiExport size={24} className="text-blue-500" />,
                  deleteButtonText: "Export",
                });
              }}
              variant="text"
              className="inline-flex gap-1"
            >
              <CiExport size={20} />
              Export all
            </Button>
            <Button
              onClick={() => {
                actionModal.show({
                  key: "import warehouse",
                  title: "Import Warehouse",
                });
              }}
              variant="text"
              className="inline-flex gap-1"
            >
              <CiImport size={20} />
              Import all
            </Button>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default FilterSection;

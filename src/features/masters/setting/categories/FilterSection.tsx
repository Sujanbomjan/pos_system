import useDeleteMultipleCategories from "@/api/hooks/master/setting/categories/useDeleteMultipleCategories"; // Corrected import statement
import useExportCategories from "@/api/hooks/master/setting/categories/useExportCategories"; // Ensure IPostData is imported
import useCreateApi from "@/api/useCreateApi";
import DateFiled from "@/components/DateFiled/DateFiled";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
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
import ImportCategoresModal from "./modals/ImportCategoresModal";

const FilterSection = () => {
  const filterState = {
    createdAt: [null, null],
  };

  const { filters, updateFilter, handleReset } = useTable([], 10, filterState);

  const api = useCreateApi();

  const [loading, setLoading] = useState(false);
  const client = useQueryClient();
  const deleteMultiple = useDeleteMultipleCategories();
  const actionModal = useModal(ImportCategoresModal);
  const { data: exportData, isLoading, isError, error } = useExportCategories();
  // const exportMutaton = useExportCategories();

  const exportSelected = async () => {
    try {
      if (!exportData || isLoading || isError) {
        toast.error("Export URL not available");
        return;
      }
      const url = exportData.data.url;
      exportToCSV(url, "Categories", "categories");
    } catch (error) {
      console.error("Error exporting categories:", error);
      toast.error("Error exporting categories");
    }
  };

  const { setMultipleQueryParams, setQueryParams } = useQueryParams();
  const deleteModal = useModal(ActionModal);

  const handleDeleteAll = () => {
    deleteMultiple.mutate(
      { delete_all: true },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["categories"] });
          toast.success("Successfully deleted all items");
        },
        onError: () => {
          toast.error("Error while deleting all items");
        },
      }
    );
  };

  const searchParams = useSearchParams();
  const isBS = !!(searchParams.get("bs") ?? true);

  return (
    <div className="flex flex-row gap-2 items-center mb-4">
      <LoadingOverlay isVisible={loading} />
      <FilterBuilder searchKey="categories" handleReset={handleReset}>
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
                  text: "Are you sure you want to delete all categories?",
                  title: "Delete all categories",
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
                  key: "import categories",
                  title: "Import Categories",
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

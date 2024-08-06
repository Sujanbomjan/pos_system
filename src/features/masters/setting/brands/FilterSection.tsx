import useExportBrands from "@/api/hooks/master/setting/brands/useExportBrands";
import useFetchBrandAll from "@/api/hooks/master/setting/brands/useFectchBrandAll";
import useCreateApi from "@/api/useCreateApi";
import DateFiled from "@/components/DateFiled/DateFiled";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import NepaliCalendar from "@/components/NepaliCalendar/NepaliCalendar";
import getApiRoute from "@/config/getApiRoutes";
import FilterBuilder from "@/features/FilterBuilder/FilterBuilder";
import useQueryParams from "@/hooks/use-pararms";
import { useTable } from "@/hooks/use-table";
import { errorHandler } from "@/utils/errorHandler";
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
import ImportBrandModal from "./ImportBrandModal";

const FilterSection = () => {
  const filterState = {
    createdAt: [null, null],
  };

  const { filters, updateFilter, handleReset } = useTable(
    // data?.data[0].data || [],
    [],
    10,
    filterState
  );

  //for demo purpose only
  const api = useCreateApi();
  const brandData = useFetchBrandAll();
  const actionModal = useModal(ImportBrandModal);

  //multiple delete logic
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();
  const deleteSelected = async () => {
    if (brandData.data?.data[0].data.length === 0) {
      toast.error("No items left to remove");
      return;
    }
    setLoading(true);
    try {
      const requests = brandData.data?.data[0].data?.map((item: any) =>
        api.delete(getApiRoute("deleteBrand")(item.id))
      ) as any;
      await Promise.all(requests).then((res) => {
        client.invalidateQueries({
          predicate: (query) => {
            return ["brands", "brands-all"].includes(
              query.queryKey[0] as string
            );
          },
        });
        toast.success(`Successfully deleted all items`);
      });
    } catch (err) {
      toast.error("Error while deleting the data");
    } finally {
      setLoading(false);
    }
  };
  const { data: exportData, isLoading, isError, error } = useExportBrands();
  const exportSelected = async () => {
    try {
      if (!exportData || isLoading || isError) {
        toast.error("Export URL not available");
        return;
      }
      const downloadUrl = exportData.data?.url;
      const link = document.createElement("a");
      link.href = downloadUrl || "";
      link.setAttribute(
        "download",
        `sma_brands_${new Date().toISOString()}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Exported Successfully");
    } catch (error) {
      errorHandler(error);
    }
  };

  const { clearQueryParams, setMultipleQueryParams, setQueryParams } =
    useQueryParams();
  const deleteModal = useModal(ActionModal);
  const searchParams = useSearchParams();
  const isBS = !!(searchParams.get("bs") ?? true);

  return (
    <div className="flex flex-row gap-2 items-center mb-4">
      <LoadingOverlay isVisible={loading} />
      <FilterBuilder searchKey="brand" handleReset={handleReset}>
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
                  handleAction: deleteSelected,
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
                  text: "Are you sure you want to export these items",
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
                  key: "import brands",
                  title: "Import Brands",
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

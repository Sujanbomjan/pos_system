"use client";
import useExportMultipleWarehouse from "@/api/hooks/master/setting/warehouse/exportMultipleWarehouse";
import useDeleteMultipleWarehouse from "@/api/hooks/master/setting/warehouse/useDeleteMultipleWarehouse";
import useDeleteWarehouse from "@/api/hooks/master/setting/warehouse/useDeleteWarehouse";
import useFetchWarehouse from "@/api/hooks/master/setting/warehouse/useFectchWarehouse";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import PageHeader from "@/components/PageHeader/page-header";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import FilterSection from "@/features/masters/setting/warehouse/FilterSection";
import AddWarehouseModal from "@/features/masters/setting/warehouse/modals/AddWarehouseModal";
import EditWarehouseModal from "@/features/masters/setting/warehouse/modals/EditWarehouseModal";
import useWarehouseData from "@/features/masters/setting/warehouse/orderData";
import { TableActionHandler } from "@/types/table";
import { errorHandler } from "@/utils/errorHandler";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "rizzui";

const pageHeader = {
  title: "Warehouse",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Warehouse",
    },
  ],
};

export default function Warehouse() {
  const deleteMutation = useDeleteWarehouse();
  const { data, isLoading, error } = useFetchWarehouse();
  const { editFormData, columns, priceDropDownItem } = useWarehouseData();

  const addModal = useModal(AddWarehouseModal);
  const editModal = useModal(EditWarehouseModal);
  const actionModal = useModal(ActionModal);

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const tableActionHandler: TableActionHandler = {
    handleEdit: (id) => {
      editModal.show({
        title: "Edit Warehouse",
        activeRowId: id,
        editFormData,
      });
    },
    handleDelete(id) {
      actionModal.show({
        handleAction: () =>
          deleteMutation.mutate(
            { id },
            {
              onSuccess: () => {
                toast.success(`Item deleted successfully`);
                actionModal.hide();
              },
              onError: () => {
                toast.error(`Error while deleting`);
              },
            }
          ),
      });
    },
  };
  const api = useCreateApi();
  const client = useQueryClient();

  const deleteMultiple = useDeleteMultipleWarehouse();
  const handleDeleteSelected = () => {
    deleteMultiple.mutate(
      { ids: selectedRowId },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["warehouse"] });
          toast.success("Successfully deleted all items");
          setSelectedRowId([]);
        },
        onError: () => {
          toast.error("Error while deleting all items");
        },
      }
    );
  };
  const exportMultiple = useExportMultipleWarehouse();
  const exportSelected = async () => {
    exportMultiple.mutate(
      { export_ids: selectedRowId },
      {
        onSuccess: (exportData) => {
          const downloadUrl = exportData.data?.url;
          if (downloadUrl) {
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute(
              "download",
              `sma_brands_${new Date().toISOString()}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Exported Successfully");
          }
          client.invalidateQueries({ queryKey: ["brands"] });
          setSelectedRowId([]);
        },
        onError: (error) => {
          errorHandler(error);
        },
      }
    );
  };

  // const exportSelected = async () => {
  //   const brandItems = data?.data[0].data || [];
  //   const itemsToExport = brandItems.filter((item) =>
  //     selectedRowId.includes(item.id)
  //   );
  //   if (itemsToExport.length === 0) {
  //     toast.error("No items to export");
  //     return;
  //   }
  //   exportToCSV(itemsToExport, "Categories", "Categories");
  //   setSelectedRowId([]);
  // };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const updatedTableData = data?.data[0].data.map((item) => {
    const priceGropuId = item.price_group_id
      ? priceDropDownItem[item.price_group_id]
      : null;
    return { ...item, price_group_id: priceGropuId };
  });

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <Button
          className=""
          onClick={() =>
            addModal.show({ key: "add warehouse", title: "Add Warehouse" })
          }
        >
          Add Warehouse
        </Button>
      </div>

      <LoadingOverlay isVisible={deleteMutation.isPending || isLoading} />

      <FilterSection />

      <TableBuilder
        actionHandler={tableActionHandler}
        columns={columns}
        tableData={updatedTableData || []}
        isLoading={isLoading}
        uniqueKey="id"
        filterFormData={filterFormData[0]}
        tableTitle={""}
        totalPageCount={data?.data[0]?.last_page || 0}
        startCountOfPage={data?.data[0]?.from || 0}
        endCountOfPage={data?.data[0]?.to || 0}
        totalData={data?.data[0]?.total || 0}
        selectedRowId={selectedRowId}
        setSelectedRowId={setSelectedRowId}
        handleSelectedDelete={handleDeleteSelected}
        handleSelectedExport={exportSelected}
      />
    </div>
  );
}

"use client";
import useExportMultipleWarehouse from "@/api/hooks/master/setting/warehouse/exportMultipleWarehouse";
import useDeleteMultipleWarehouse from "@/api/hooks/master/setting/warehouse/useDeleteMultipleWarehouse";
import useDeleteWarehouseProduct from "@/api/hooks/master/setting/warehouseProduct/useDeleteWarehouseProduct";
import useFetchWarehouseProduct from "@/api/hooks/master/setting/warehouseProduct/useFectchWarehouseProduct";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import NumberWithCommas from "@/components/NumberCommas/NumberCommas";
import PageHeader from "@/components/PageHeader/page-header";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import FilterSection from "@/features/masters/setting/warehouseProduct/FilterSection";
import AddWarehouseProductModal from "@/features/masters/setting/warehouseProduct/modals/AddWarehouseProductModal";
import EditWarehouseProductModal from "@/features/masters/setting/warehouseProduct/modals/EditWarehouseProductModal";
import useWarehouseProductData from "@/features/masters/setting/warehouseProduct/orderData";
import { TableActionHandler } from "@/types/table";
import { errorHandler } from "@/utils/errorHandler";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const pageHeader = {
  title: "Warehouse Products",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Warehouse Products",
    },
  ],
};

export default function Warehouse() {
  const deleteMutation = useDeleteWarehouseProduct();
  const { data, isLoading, error, refetch } = useFetchWarehouseProduct();
  const { columns, formData, warehouseOptions, productDropDown } =
    useWarehouseProductData();

  const addModal = useModal(AddWarehouseProductModal);
  const editModal = useModal(EditWarehouseProductModal);
  const actionModal = useModal(ActionModal);

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const tableActionHandler: TableActionHandler = {
    handleEdit: (id) => {
      editModal.show({
        title: "Edit Warehouse Products",
        activeRowId: id,
        formData,
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
                refetch();
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
          client.invalidateQueries({ queryKey: ["warehouse-product"] });
          toast.success("Successfully deleted all items");
          setSelectedRowId([]);
          refetch();
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
          } else if (!downloadUrl) {
            toast.error("Export URL not available");
            return;
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const updatedTableData = data?.data[0].data.map((item) => {
    const product_id = item.product_id
      ? productDropDown[item.product_id]
      : null;
    const warehouse_id = item.warehouse_id
      ? warehouseOptions[item.warehouse_id]
      : null;
    const quantity = item.quantity ? (
      <NumberWithCommas value={item.quantity} />
    ) : null;
    const avg_cost = item.avg_cost ? (
      <NumberWithCommas value={item.avg_cost} />
    ) : null;

    return { ...item, product_id, warehouse_id, quantity, avg_cost };
  });

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        {/* <Button
          className=""
          onClick={() =>
            addModal.show({
              key: "add warehouse products",
              title: "Add Warehouse Products",
            })
          }
        >
          Add Warehouse Product
        </Button> */}
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
        handleSelectedExport={exportSelected}
        showDeleteButton
      />
    </div>
  );
}

"use client";
import useExportMultiplePurchase from "@/api/hooks/transaction/purchase/useExportMultiplePurchase";
import useDeleteTransfer from "@/api/hooks/transaction/warehouseTransfer/useDeleteTransfer";
import useFetchTransfer from "@/api/hooks/transaction/warehouseTransfer/useFetchTransfer";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import NumberWithCommas from "@/components/NumberCommas/NumberCommas";
import PageHeader from "@/components/PageHeader/page-header";
import getApiRoute from "@/config/getApiRoutes";
import { routes } from "@/config/routes";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import FilterSection from "@/features/transactions/warehouseTransfer/FilterSection";
import UpdateTransferModal from "@/features/transactions/warehouseTransfer/modal/UpdateTransferModal";
import usePurchaseData from "@/features/transactions/warehouseTransfer/transferTableData";
import { TableActionHandler, TableColumnsClickHandler } from "@/types/table";
import { dynamicComponent } from "@/utils/dynamicComponent";
import { errorHandler } from "@/utils/errorHandler";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "rizzui";

const pageHeader = {
  title: "Warehouse Transfer",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Warehouse Transfer",
    },
  ],
};

const DynamicTransferViewModal = dynamicComponent(
  () => import("@/features/transactions/warehouseTransfer/modal/TransferViewModal"),
  { ssr: false }
);

export default function Purchase() {
  const router = useRouter();
  const deleteMutation = useDeleteTransfer();

  const { data, isLoading } = useFetchTransfer();

  const actionModal = useModal(ActionModal);
  const { columns, editFormData } = usePurchaseData();

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const transferViewModal = useModal(DynamicTransferViewModal);

  //mulitple delete logic for demo purpose only
  const [loading, setLoading] = useState(false);
  const api = useCreateApi();
  const client = useQueryClient();
  const deleteSelected = async () => {
    // setLoading(true);
    // try {
    //   const requests = selectedRowId.map((item) =>
    //     api.delete(getApiRoute("deletePurchase")(item))
    //   );
    //   await Promise.all(requests).then((res) => {
    //     client.invalidateQueries({
    //       predicate: (query) => {
    //         return ["purchase", "purchase-all"].includes(
    //           query.queryKey[0] as string
    //         );
    //       },
    //     });
    //     toast.success(`Successfully deleted ${selectedRowId.length} items`);
    //     setSelectedRowId([]);
    //   });
    // } catch (err) {
    //   toast.error("Error while deleting the data");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleRowClick = (id: string) => {
    transferViewModal.show({
      activeRowId: id,
    });
  };

  const updateStatusModal = useModal(UpdateTransferModal);

  const handleClickOnColumns: TableColumnsClickHandler = {
    status: (id: string) => {
      updateStatusModal.show({
        activeRowId: id,
        title: "Update Status",
        editFormData: editFormData,
      });
    },
  };

  const exportMultiple = useExportMultiplePurchase();

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
              `sma_purchase_${new Date().toISOString()}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Exported Successfully");
          }
          client.invalidateQueries({ queryKey: ["purchase"] });
          setSelectedRowId([]);
        },
        onError: (error) => {
          errorHandler(error);
        },
      }
    );
  };
  const tableActionHandler: TableActionHandler = {
    handleEdit: (id: any) => {
      router.push(routes.inventory.warehouseTransfer.editWarehouseTransfer(id));
    },
    handleDelete(id: any) {
      actionModal.show({
        handleAction: () =>
          deleteMutation.mutate(
            { id },
            {
              onSuccess: () => {
                toast.success(`item deleted successfully`);
                actionModal.hide();
              },
              onError: () => {
                toast.error(`Error while Deleting`);
              },
            }
          ),
      });
    },
  };
  const updatedTableData = data?.data[0]?.data?.map((item) => {
    const grand_total = item.grand_total ? (
      <NumberWithCommas value={item.grand_total} />
    ) : null;
    const to_warehouse_name = item.to_warehouse_name
      ? `${item.to_warehouse_name} (${item.to_warehouse_code})`
      : "";
    const from_warehouse_name = item.from_warehouse_name
      ? `${item.from_warehouse_name} (${item.from_warehouse_code})`
      : "";
    const total = item.total ? <NumberWithCommas value={item.total} /> : null;

    return {
      ...item,
      grand_total,
      total,
      to_warehouse_name,
      from_warehouse_name,
    };
  });

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <div className="flex flex-row gap-4">
          <Link href={routes.inventory.warehouseTransfer.createTransfer}>
            <Button>Add Transfer</Button>
          </Link>
          {/* <Link href={routes.inventory.warehouseTransfer.createTransferByCsv}>
            <Button>Add Transfer By CSV</Button>
          </Link> */}
        </div>
      </div>

      <LoadingOverlay
        isVisible={deleteMutation.isPending || isLoading || loading}
      />

      <FilterSection />

      <TableBuilder
        // @ts-ignore
        actionHandler={tableActionHandler}
        columns={columns}
        tableData={updatedTableData}
        isLoading={isLoading}
        uniqueKey="id"
        filterFormData={filterFormData[0]}
        tableTitle={""}
        totalPageCount={data?.data[0].last_page}
        startCountOfPage={data?.data[0].from || 0}
        endCountOfPage={data?.data[0].to || 0}
        totalData={data?.data[0].total || 0}
        selectedRowId={selectedRowId}
        setSelectedRowId={setSelectedRowId}
        handleSelectedDelete={deleteSelected}
        handleSelectedExport={exportSelected}
        handleRowClick={handleRowClick}
        handleClickOnColumns={handleClickOnColumns}
      />
    </div>
  );
}

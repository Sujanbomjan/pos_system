"use client";
import useDeletePurchase from "@/api/hooks/transaction/purchase/useDeletePurchase";
import useExportMultiplePurchase from "@/api/hooks/transaction/purchase/useExportMultiplePurchase";
import useFetchPurchase from "@/api/hooks/transaction/purchase/useFetchPurchase";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import NumberWithCommas from "@/components/NumberCommas/NumberCommas";
import PageHeader from "@/components/PageHeader/page-header";
import getApiRoute from "@/config/getApiRoutes";
import { routes } from "@/config/routes";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import FilterSection from "@/features/transactions/purchase/FilterSection";
import UpdatePurchaseStatusModal from "@/features/transactions/purchase/modal/UpdatePurchaseStatusModal";
import usePurchaseData from "@/features/transactions/purchase/purchaseTableData";
import { TableColumnsClickHandler } from "@/types/table";
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
  title: "Purchase",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Purchase",
    },
  ],
};

const DynamicPurchaseViewModal = dynamicComponent(
  () => import("@/features/transactions/purchase/modal/PurchaseViewModal"),
  { ssr: false }
);

export default function Purchase() {
  const router = useRouter();
  const deleteMutation = useDeletePurchase();

  const { data, isLoading } = useFetchPurchase();

  const actionModal = useModal(ActionModal);
  const { columns, editFormData } = usePurchaseData();

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const purchaseViewModal = useModal(DynamicPurchaseViewModal);

  //mulitple delete logic for demo purpose only
  const [loading, setLoading] = useState(false);
  const api = useCreateApi();
  const client = useQueryClient();
  const deleteSelected = async () => {
    setLoading(true);
    try {
      const requests = selectedRowId.map((item) =>
        api.delete(getApiRoute("deletePurchase")(item))
      );
      await Promise.all(requests).then((res) => {
        client.invalidateQueries({
          predicate: (query) => {
            return ["purchase", "purchase-all"].includes(
              query.queryKey[0] as string
            );
          },
        });
        toast.success(`Successfully deleted ${selectedRowId.length} items`);
        setSelectedRowId([]);
      });
    } catch (err) {
      toast.error("Error while deleting the data");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (id: string) => {
    purchaseViewModal.show({
      activeRowId: id,
    });
  };

  const updateStatusModal = useModal(UpdatePurchaseStatusModal);

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
  const updatedTableData = data?.data[0]?.data?.map((item) => {
    const grand_total = item.grand_total ? (
      <NumberWithCommas value={item.grand_total} />
    ) : null;
    const paid = item.paid ? <NumberWithCommas value={item.paid} /> : null;
    const total = item.paid ? <NumberWithCommas value={item.total} /> : null;

    return { ...item, grand_total, paid, total };
  });

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <div className="flex flex-row gap-4">
          <Link href={routes.purchase.createPurchase}>
            <Button>Add Purchase</Button>
          </Link>
          <Link href={routes.purchase.createPurchaseByCsv}>
            <Button>Add Purchase By CSV</Button>
          </Link>
        </div>
      </div>

      <LoadingOverlay
        isVisible={deleteMutation.isPending || isLoading || loading}
      />

      <FilterSection />

      <TableBuilder
        // @ts-ignore
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

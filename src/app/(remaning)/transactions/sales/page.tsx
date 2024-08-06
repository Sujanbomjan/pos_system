"use client";

import useDeleteSales from "@/api/hooks/transaction/sales/useDeleteSales";
import useExportMultipleSales from "@/api/hooks/transaction/sales/useExportMultipleSales";
import useFetchSales from "@/api/hooks/transaction/sales/useFetchSales";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import NumberWithCommas from "@/components/NumberCommas/NumberCommas";
import PageHeader from "@/components/PageHeader/page-header";
import getApiRoute from "@/config/getApiRoutes";
import { routes } from "@/config/routes";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import UpdateSalesStatusModal from "@/features/transactions/sales/modal/UpdateSalesStatusModal";
import SalesFilterSection from "@/features/transactions/sales/sales-filter-section";
import useSalesData from "@/features/transactions/sales/salesTableData";
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
  title: "Sales",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Sales",
    },
  ],
};

const SalesViewModal = dynamicComponent(
  () => import("@/features/transactions/sales/modal/SalesViewModal"),
  { ssr: false }
);

export default function SalesPage() {
  const router = useRouter();
  const deleteMutation = useDeleteSales();

  const { data, isLoading } = useFetchSales();

  const actionModal = useModal(ActionModal);
  const { columns, editFormData } = useSalesData();

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const salesViewModal = useModal(SalesViewModal);

  const handleRowClick = (id: string) => {
    salesViewModal.show({
      activeRowId: id,
      // returnId: data?.data[0].data?.filter(
      //   (item) => item.id === parseInt(id)
      // )[0].return_id,
    });
  };

  //mulitple delete logic for demo purpose only
  const [loading, setLoading] = useState(false);
  const api = useCreateApi();
  const client = useQueryClient();
  const deleteSelected = async () => {
    setLoading(true);
    try {
      const requests = selectedRowId.map((item) =>
        api.delete(getApiRoute("deleteSales")(item))
      );
      await Promise.all(requests).then((res) => {
        client.invalidateQueries({
          predicate: (query) => {
            return ["sales", "sales-all"].includes(query.queryKey[0] as string);
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

  const exportMultiple = useExportMultipleSales();
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
              `sma_sales_${new Date().toISOString()}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Exported Successfully");
          }
          client.invalidateQueries({ queryKey: ["sales"] });
          setSelectedRowId([]);
        },
        onError: (error) => {
          errorHandler(error);
        },
      }
    );
  };

  const updateStatusModal = useModal(UpdateSalesStatusModal);

  const handleClickOnColumns: TableColumnsClickHandler = {
    sale_status: (id: string) => {
      updateStatusModal.show({
        activeRowId: id,
        title: "Update Status",
        editFormData: editFormData,
      });
    },
  };

  const updatedTableData = data?.data[0]?.data?.map((item) => {
    const grand_total = item.grand_total ? (
      <NumberWithCommas value={item.grand_total} />
    ) : null;
    const paid = item.paid ? <NumberWithCommas value={item.paid} /> : null;
    return { ...item, grand_total, paid };
  });

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <div className="flex flex-row gap-4">
          <Link href={routes.sales.createSales}>
            <Button>Add Sales</Button>
          </Link>
          <Link href={routes.sales.createSalesByCsv}>
            <Button>Add Sales By Csv</Button>
          </Link>
        </div>
      </div>

      <LoadingOverlay
        isVisible={deleteMutation.isPending || isLoading || loading}
      />

      <SalesFilterSection />

      <TableBuilder
        handleClickOnColumns={handleClickOnColumns}
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
      />
    </div>
  );
}

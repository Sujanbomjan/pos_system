"use client";
import useExportMultipleProduct from "@/api/hooks/master/product/exportMultipleProduct";
import useDeleteMultipleProduct from "@/api/hooks/master/product/useDeleteMultipleProduct";
import useDeleteProduct from "@/api/hooks/master/product/useDeleteProduct";
import useFetchProduct from "@/api/hooks/master/product/useFetchProduct";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import useProductData from "@/features/masters/product/product-data";
import ProductFilterSection from "@/features/masters/product/product-filterSection";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import { TableActionHandler } from "@/types/table";
import { dynamicComponent } from "@/utils/dynamicComponent";
import { errorHandler } from "@/utils/errorHandler";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "rizzui";
import NumberWithCommas from "@/components/NumberCommas/NumberCommas";

const pageHeader = {
  title: "Products",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Products",
    },
  ],
};

const ProductViewModal = dynamicComponent(
  () => import("@/features/masters/product/modal/ProductViewModal"),
  { ssr: false }
);

export default function Brands() {
  const { productColumns } = useProductData();

  const deleteMutation = useDeleteProduct();

  const { data, isLoading, refetch } = useFetchProduct({ productLimit: "10" });

  const actionModal = useModal(ActionModal);
  const productViewModal = useModal(ProductViewModal);

  const deleteMultiple = useDeleteMultipleProduct();
  const handleDeleteSelected = () => {
    deleteMultiple.mutate(
      { ids: selectedRowId },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["product"] });
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
  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const tableActionHandler: TableActionHandler = {
    handleEdit: (id) => {
      router.push(routes.productMaster.edit(id));
    },
    handleDelete(id) {
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
  const [loading, setLoading] = useState(false);
  const api = useCreateApi();
  const client = useQueryClient();

  const exportMultiple = useExportMultipleProduct();
  const exportSelected = async () => {
    try {
      exportMultiple.mutate(
        { export_ids: selectedRowId },
        {
          onSuccess: (exportData) => {
            const downloadUrl = exportData.data?.url;
            if (!downloadUrl) {
              toast.error("Export URL not found");
            } else {
              const link = document.createElement("a");
              link.href = downloadUrl;
              link.setAttribute(
                "download",
                `sma_products_${new Date().toISOString()}.xlsx`
              );
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              toast.success("Exported successfully");
            }
            client.invalidateQueries({ queryKey: ["products"] });
            setSelectedRowId([]);
          },
          onError: (error) => {
            const errorMessage = error.message || "Error while exporting";
            toast.error(errorMessage);
          },
        }
      );
    } catch (error) {
      const errorMessage = "Unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  const router = useRouter();

  const handleRowClick = (id: string) => {
    productViewModal.show({ activeRowId: id });
  };
  const updatedTableData = data?.data[0].data.map((item) => {
    const cost = item.cost ? <NumberWithCommas value={item.cost} /> : null;
    const price = item.price ? <NumberWithCommas value={item.price} /> : null;
    const quantity = item.quantity ? (
      <NumberWithCommas value={item.quantity} />
    ) : null;
    return { ...item, cost, price, quantity };
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
          onClick={() => router.push(routes.productMaster.addProduct)}
        >
          Add Product
        </Button>
      </div>

      <LoadingOverlay
        isVisible={deleteMutation.isPending || isLoading || loading}
      />

      <ProductFilterSection />

      <TableBuilder
        actionHandler={tableActionHandler}
        columns={productColumns}
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
        handleSelectedDelete={handleDeleteSelected}
        handleSelectedExport={exportSelected}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}

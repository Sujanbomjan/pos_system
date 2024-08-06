"use client";
import useExportMultipleBrands from "@/api/hooks/master/setting/brands/exportMultipleBrand";
import useDeleteBrand from "@/api/hooks/master/setting/brands/useDeleteBrand";
import useFetchBrand from "@/api/hooks/master/setting/brands/useFectchBrand";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import PageHeader from "@/components/PageHeader/page-header";
import getApiRoute from "@/config/getApiRoutes";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import FilterSection from "@/features/masters/setting/brands/FilterSection";
import AddBrandModal from "@/features/masters/setting/brands/modals/AddBrandModal";
import EditBrandModal from "@/features/masters/setting/brands/modals/EditBrandModal";
import {
  columns,
  editFormData,
} from "@/features/masters/setting/brands/orderData";
import { TableActionHandler } from "@/types/table";
import { errorHandler } from "@/utils/errorHandler";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "rizzui";

const pageHeader = {
  title: "Brands",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Brands",
    },
  ],
};

export default function Brands() {
  const deleteMutation = useDeleteBrand();

  const { data, isLoading } = useFetchBrand();

  const addModal = useModal(AddBrandModal);
  const editModal = useModal(EditBrandModal);
  const actionModal = useModal(ActionModal);

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const tableActionHandler: TableActionHandler = {
    handleEdit: (id) => {
      editModal.show({
        title: "Edit Brands",
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

  //mulitple delete logic for demo purpose only
  const [loading, setLoading] = useState(false);
  const api = useCreateApi();
  const client = useQueryClient();
  const deleteSelected = async () => {
    setLoading(true);
    try {
      const requests = selectedRowId.map((item) =>
        api.delete(getApiRoute("deleteBrand")(item))
      );
      await Promise.all(requests).then((res) => {
        client.invalidateQueries({
          predicate: (query) => {
            return ["brands", "brands-all"].includes(
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
  const exportMultiple = useExportMultipleBrands();
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
            addModal.show({ key: "add brand", title: "Add Brand" })
          }
        >
          Add Brands
        </Button>
      </div>

      <LoadingOverlay
        isVisible={deleteMutation.isPending || isLoading || loading}
      />

      <FilterSection />

      <TableBuilder
        actionHandler={tableActionHandler}
        columns={columns}
        tableData={data?.data[0].data}
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
      />
    </div>
  );
}

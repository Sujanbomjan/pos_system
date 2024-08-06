"use client";
import useExportMultipleCategories from "@/api/hooks/master/setting/categories/exportMultipleCategories";
import useDeleteCategories from "@/api/hooks/master/setting/categories/useDeleteCategories";
import useDeleteMultipleCategories from "@/api/hooks/master/setting/categories/useDeleteMultipleCategories";
import useFetchCategories from "@/api/hooks/master/setting/categories/useFectchCategories";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import PageHeader from "@/components/PageHeader/page-header";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import FilterSection from "@/features/masters/setting/categories/FilterSection";
import AddCategoriesModal from "@/features/masters/setting/categories/modals/AddCategoriesModal";
import EditCategoriesModal from "@/features/masters/setting/categories/modals/EditCategoriesModal";
import useCategoriesData from "@/features/masters/setting/categories/orderData";
import { TableActionHandler } from "@/types/table";
import { errorHandler } from "@/utils/errorHandler";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "rizzui";

const pageHeader = {
  title: "Categories",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Categories",
    },
  ],
};

export default function Categories() {
  const deleteMutation = useDeleteCategories();
  const { data, isLoading, error, refetch } = useFetchCategories();
  const { formData, editFormData, importFormData, columns, parentCategoryMap } =
    useCategoriesData();
  const addModal = useModal(AddCategoriesModal);
  const editModal = useModal(EditCategoriesModal);
  const actionModal = useModal(ActionModal);

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const tableActionHandler: TableActionHandler = {
    handleEdit: (id) => {
      editModal.show({
        title: "Edit Categories",
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

  const deleteMultiple = useDeleteMultipleCategories();
  const handleDeleteSelected = () => {
    deleteMultiple.mutate(
      { ids: selectedRowId },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["categories"] });
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
  const exportMultiple = useExportMultipleCategories();
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
    const parentCategoryLabel = item.parent_id
      ? parentCategoryMap[item.parent_id]
      : null;
    return { ...item, parent_id: parentCategoryLabel };
  });
  // const updatedTableData = data?.data[0].data.map((item) => {
  //   if (item.parent_id === null) {
  //     return { ...item, parent_id: null };
  //   }
  //   return item;
  // });

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
            addModal.show({ key: "add categories", title: "Add Categories" })
          }
        >
          Add Categories
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

"use client";
import useDeleteExpenseCategory from "@/api/hooks/master/setting/expenseCategory/useDeleteExpenseCategory";
import useFetchExpenseCategory from "@/api/hooks/master/setting/expenseCategory/useFetchExpenseCategory";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import PageHeader from "@/components/PageHeader/page-header";
import getApiRoute from "@/config/getApiRoutes";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import FilterSection from "@/features/masters/setting/expense-category/FilterSection";
import AddExpenseCategoryModal from "@/features/masters/setting/expense-category/modals/AddExpenseCategoryModal";
import EditExpenseCategoryModal from "@/features/masters/setting/expense-category/modals/EditExpenseCategoryModal";
import {
  columns,
  formData,
} from "@/features/masters/setting/expense-category/orderData";
import { TableActionHandler } from "@/types/table";
import { exportToCSV } from "@/utils/export-to-csv";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "rizzui";

const pageHeader = {
  title: "Expense Category",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Expense Category",
    },
  ],
};

export default function ExpenseCategory() {
  const deleteMutation = useDeleteExpenseCategory();

  const { data, isLoading } = useFetchExpenseCategory();

  const addModal = useModal(AddExpenseCategoryModal);
  const editModal = useModal(EditExpenseCategoryModal);
  const actionModal = useModal(ActionModal);

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const tableActionHandler: TableActionHandler = {
    handleEdit: (id) => {
      editModal.show({
        title: "Edit Expense Category",
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
        api.delete(getApiRoute("deleteExpenseCategory")(item))
      );
      await Promise.all(requests).then((res) => {
        client.invalidateQueries({
          predicate: (query) => {
            return ["expensecategory", "expensecategory-all"].includes(
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

  const exportSelected = async () => {
    
    // const expenseCategoryItem = data?.data[0].data || [];
    // const itemsToExport = expenseCategoryItem.filter((item) =>
    //   selectedRowId.includes(item.id)
    // );
    // if (itemsToExport.length === 0) {
    //   toast.error("No items to export");
    //   return;
    // }
    // exportToCSV(itemsToExport, "Expense Categpry", "Expense Categpry");
    // setSelectedRowId([]);
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
            addModal.show({ key: "add expense category", title: "Add Expense Category" })
          }
        >
          Add Expense Categpry
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

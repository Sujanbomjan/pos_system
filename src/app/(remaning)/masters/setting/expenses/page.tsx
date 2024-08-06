"use client";
import useAddExpenses from "@/api/hooks/master/setting/expenses/useAddExpenses";
import useDeleteExpenses from "@/api/hooks/master/setting/expenses/useDeleteExpenses";
import useEditExpenses from "@/api/hooks/master/setting/expenses/useEditExpenses";
import useFetchExpenses from "@/api/hooks/master/setting/expenses/useFetchExpenses";
import useFetchExpensesById from "@/api/hooks/master/setting/expenses/useFetchExpensesById";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageHeader from "@/components/PageHeader/page-header";
import CustomModal from "@/components/modals/page";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import {
  columns,
  editForm,
  formData,
} from "@/features/masters/setting/expenses/orderData";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { TableActionHandler } from "@/types/table";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "rizzui";
const pageHeader = {
  title: "Expenses",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Expenses",
    },
  ],
};

export default function Page() {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [formStep, setFormStep] = useState(0);
  const {
    handleSubmit,
    getValues,
    formState: { errors },
    control,
    register,
    reset,
  } = useForm({
    defaultValues: getDefaultValues(formData[formStep]),
    resolver: yupResolver(schemaGenerator(formData[formStep])),
  });
  const [activeRowId, setActiveRowId] = useState<string>("");

  const { data: getById } = useFetchExpensesById(activeRowId);

  const {
    handleSubmit: handleEditSubmit,
    getValues: getEditValues,
    formState: { errors: editErrors },
    control: editControl,
    register: editRegister,
    reset: editReset,
  } = useForm({
    values: getById?.data,
    defaultValues: getDefaultValues(formData[formStep]),
    resolver: yupResolver(schemaGenerator(formData[formStep])),
  });

  const editMutation = useEditExpenses(activeRowId);
  const deleteMutation = useDeleteExpenses();

  const isFinalStep = formStep + 1 === formData.length;
  const isEditFinalStep = formStep + 1 === formData.length;

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  const onSubmit = (data: any) => {
    if (!isFinalStep) {
      setFormStep((prev) => ++prev);
      return;
    }
    mutation.mutate(data, {
      onSuccess() {
        toast.success("Expenses added successfully");
        setModal(false);
      },
      onError() {
        toast.error(data.message);
      },
    });
  };

  const onEditSubmit = (data: any) => {
    if (!isEditFinalStep) {
      setFormStep((prev) => ++prev);
      return;
    }
    editMutation.mutate(data, {
      onSuccess() {
        toast.success("Edit Successfully");
        closeEditModal();
      },
      onError() {
        toast.error(data.data.message);
      },
    });
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };

  const { data, isLoading } = useFetchExpenses();

  const mutation = useAddExpenses();

  const tableActionHandler: TableActionHandler = {
    handleEdit: (id) => {
      setActiveRowId(id);
      setEditModal(true);
    },
    handleDelete(id) {
      deleteMutation.mutate(
        { id },
        {
          onSuccess: () => {
            toast.success(`item deleted successfully`);
          },
          onError: () => {
            toast.error(`item error while deleting`);
          },
        }
      );
      setActiveRowId(id);
    },
  };

  const deleteSelected = async () => {
    // setLoading(true);
    // try {
    //   const requests = selectedRowId.map((item) =>
    //     api.delete(getApiRoute("deleteBrand")(item))
    //   );
    //   await Promise.all(requests).then((res) => {
    //     client.invalidateQueries({
    //       predicate: (query) => {
    //         return ["brands", "brands-all"].includes(
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

  const exportSelected = async () => {
    // const brandItems = data?.data[0].data || [];
    // const itemsToExport = brandItems.filter((item) =>
    //   selectedRowId.includes(item.id)
    // );
    // if (itemsToExport.length === 0) {
    //   toast.error("No items to export");
    //   return;
    // }
    // exportToCSV(itemsToExport, "Brands", "Brands");
    // setSelectedRowId([]);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <LoadingOverlay
        isVisible={
          mutation.isPending ||
          editMutation.isPending ||
          deleteMutation.isPending
        }
      />
      <div className="flex mb-4">
        <Button className="mr-auto" onClick={openModal}>
          Add Expenses
        </Button>
      </div>

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
      <CustomModal
        isOpen={modal}
        onClose={closeModal}
        title="Add Expenses"
        content={
          <FormBuilder
            data={formData[formStep]}
            {...{
              getValues,
              handleSubmit,
              isFinalStep,
              register,
              errors,
              onSubmit,
              control,
              reset,
              formStep,
              setFormStep,
            }}
          />
        }
      />
      <CustomModal
        isOpen={editModal}
        onClose={closeEditModal}
        title="Edit Expenses"
        content={
          <FormBuilder
            data={editForm[formStep]}
            isLoading={editMutation.isPending}
            {...{
              getValues: getEditValues,
              handleSubmit: handleEditSubmit,
              isFinalStep: isFinalStep,
              register: editRegister,
              errors: editErrors,
              onSubmit: onEditSubmit,
              control: editControl,
              reset: editReset,
              formStep,
              setFormStep,
            }}
          />
        }
      />
    </>
  );
}

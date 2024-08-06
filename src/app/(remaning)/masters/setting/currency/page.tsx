"use client";
import useAddCurrency from "@/api/hooks/master/setting/currency/useAddCurrency";
import useDeleteCurrency from "@/api/hooks/master/setting/currency/useDeleteCurrency";
import useEditCurrency from "@/api/hooks/master/setting/currency/useEditCurrency";
import useFetchCurrency from "@/api/hooks/master/setting/currency/useFetchCurrency";
import useFetchCurrencyById from "@/api/hooks/master/setting/currency/useFetchCurrencyById";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageHeader from "@/components/PageHeader/page-header";
import DeleteModal from "@/components/modals/deleteModal";
import CustomModal from "@/components/modals/page";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import { filterFormData } from "@/features/masters/product/productMaster/tableData";
import FilterSection from "@/features/masters/setting/currency/FilterSection";
import {
  columns,
  formData,
} from "@/features/masters/setting/currency/orderData";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { TableActionHandler } from "@/types/table";
import { errorHandler } from "@/utils/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "rizzui";
import { v4 as uuidv4 } from "uuid";

const pageHeader = {
  title: "Currencies",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Currencies",
    },
  ],
};

export default function Currencies() {
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
    setValue,
  } = useForm({
    defaultValues: {
      ...getDefaultValues(formData[formStep]),
      code: uuidv4().substring(0, 16),
    },
    resolver: yupResolver(schemaGenerator(formData[formStep])),
  });

  const [activeRowId, setActiveRowId] = useState<string>("");

  const { data: editData, isLoading: isEditFetchLoading } =
    useFetchCurrencyById(activeRowId);

  const {
    handleSubmit: handleEditSubmit,
    getValues: getEditValues,
    formState: { errors: editErrors },
    control: editControl,
    register: editRegister,
    reset: editReset,
  } = useForm({
    values: editData?.data,
    defaultValues: getDefaultValues(formData[formStep]),
    resolver: yupResolver(schemaGenerator(formData[formStep])),
  });

  const editMutation = useEditCurrency(activeRowId);
  const deleteMutation = useDeleteCurrency();

  const isFinalStep = formStep + 1 === formData.length;
  const isEditFinalStep = formStep + 1 === formData.length;

  const onSubmit = async (data: any) => {
    if (!isFinalStep) {
      setFormStep((prev) => ++prev);
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Currencies added successfully");
        setModal(false);
        reset({ code: uuidv4().substring(0, 16) });
      },
      onError: (error) => {
        errorHandler(error);
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
        reset();
      },
      onError() {
        toast.error(data.message);
      },
    });
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    reset();
    setModal(false);
  };
  const closeEditModal = () => {
    reset();
    setEditModal(false);
  };

  const { data, isLoading } = useFetchCurrency();

  const mutation = useAddCurrency();

  const tableActionHandler: TableActionHandler = {
    handleEdit: (id) => {
      setActiveRowId(id);
      setEditModal(true);
    },
    handleDelete(id) {
      setDeleteModal(true);
      setActiveRowId(id);
    },
  };

  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <Button className="" onClick={openModal}>
          Add Currencies
        </Button>
      </div>

      <LoadingOverlay
        isVisible={
          mutation.isPending ||
          editMutation.isPending ||
          deleteMutation.isPending ||
          isEditFetchLoading
        }
      />

      <FilterSection />

      <TableBuilder
        actionHandler={tableActionHandler}
        columns={columns}
        tableData={data?.data}
        isLoading={isLoading}
        uniqueKey="id"
        filterFormData={filterFormData[0]}
        tableTitle={""}
        totalPageCount={data?.last_page}
        startCountOfPage={0}
        endCountOfPage={0}
        totalData={0}
        selectedRowId={[]}
        setSelectedRowId={undefined}
      />

      <CustomModal
        isOpen={modal}
        onClose={closeModal}
        title="Add Currencies"
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
        title="Edit Currencies"
        content={
          <FormBuilder
            data={formData[formStep]}
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

      <DeleteModal
        isOpen={deleteModal}
        handleDelete={() =>
          deleteMutation.mutate(
            { id: activeRowId },
            {
              onSuccess: () => {
                toast.success(`item deleted successfully`);
                setDeleteModal(false);
              },
              onError: () => {
                toast.error(`Error while Deleting`);
              },
            }
          )
        }
        onClose={() => setDeleteModal(false)}
        title="Are you sure you want to delete this ?"
      />
    </div>
  );
}

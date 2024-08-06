import useEditUpdateStatus from "@/api/hooks/transaction/warehouseTransfer/useEditUpdateStatus";
import useFetchTransferById from "@/api/hooks/transaction/warehouseTransfer/useFetchTransferById";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { errorHandler } from "@/utils/errorHandler";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default NiceModal.create(
  ({
    activeRowId,
    editFormData,
    title,
  }: {
    activeRowId: string;
    editFormData: any;
    title: string;
  }) => {
    const [formStep, setFormStep] = useState(0);
    const isFinalStep = true;
    const modal = useModal();

    const data = useFetchTransferById({ id: activeRowId });

    const refData = {
      Date: new Date(data.data?.data.created_at || "").toLocaleString(),
      Reference: data.data?.data.transfer_no,
      To: data.data?.data.to_warehouse_name,
      From: data.data?.data.from_warehouse_name,
    };

    const schema = schemaGenerator(editFormData[formStep]);

    const {
      handleSubmit,
      getValues,
      formState: { errors, isDirty, isSubmitSuccessful },
      control,
      register,
      reset,
    } = useForm({
      values: {
        status: data.data?.data.status,
      },
      defaultValues: getDefaultValues(editFormData[formStep]),
      resolver: yupResolver(schema),
    });

    const editMutation = useEditUpdateStatus();

    const onSubmit = (data: any) => {
      editMutation.mutate(
        { ...data, purchase_id: activeRowId },
        {
          onSuccess() {
            toast.success("Edited Successfully");
            modal.hide();
          },
          onError(error) {
            errorHandler(error);
            console.log("error", error);
          },
        }
      );
    };

    const handleCloseModal = () => {
      modal.hide();
    };

    return (
      <ModalWrapper
        isLoading={editMutation.isPending || data.isLoading}
        key={activeRowId}
        isOpen={modal.visible}
        onClose={handleCloseModal}
        title={title}
      >
        <>
          <div className="mt-6 mb-4">
            <strong className="text-lg">Transfer Details</strong>

            <div className="border-[1px] p-4 mt-4">
              {Object.entries(refData).map(([key, value]) => (
                <div
                  key={key}
                  className="py-2 px-2 odd:bg-gray-100 flex flex-row justify-between"
                >
                  <strong className="flex-1">{key}</strong>
                  <p className="flex-1">{value as string}</p>
                </div>
              ))}
            </div>
          </div>
          <FormBuilder
            disableSelect={data.data?.data.status.toLowerCase() !== "pending"}
            isFormReset={!isSubmitSuccessful && !isDirty}
            isConfirmationModalRequired
            data={editFormData[formStep]}
            buttonLabel="Update"
            isLoading={editMutation.isPending}
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
          ></FormBuilder>
        </>
      </ModalWrapper>
    );
  }
);

import useEditWarehouseProduct from "@/api/hooks/master/setting/warehouseProduct/useEditWarehouseProduct";
import useFetchWarehouseProduct from "@/api/hooks/master/setting/warehouseProduct/useFectchWarehouseProduct";
import useFetchWarehouseProductById from "@/api/hooks/master/setting/warehouseProduct/useFetchWarehouseProductById";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { errorHandler } from "@/utils/errorHandler";
import { GenerateCode } from "@/utils/generate-code";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default NiceModal.create(
  ({
    activeRowId,
    formData,
    title,
  }: {
    activeRowId: string;
    formData: any;
    title: string;
  }) => {
    const [formStep, setFormStep] = useState(0);
    const [resetCount, setResetCount] = useState(0);
    const isFinalStep = true;
    const modal = useModal();
    const { refetch } = useFetchWarehouseProduct();
    const { data: editData, isLoading } =
      useFetchWarehouseProductById(activeRowId);

    console.log("date", editData);

    const {
      handleSubmit,
      getValues,
      formState: { errors, isDirty, isSubmitSuccessful },
      control,
      register,
      reset,
      watch,
      setValue,
    } = useForm({
      values: {
        product_id: editData?.data?.product_id.toString(),
        warehouse_id: editData?.data?.warehouse_id.toString(),
        quantity: editData?.data?.quantity,
        avg_cost: editData?.data?.avg_cost,
        rack: editData?.data?.rack,
      },
      defaultValues: getDefaultValues(formData[formStep]),
      resolver: yupResolver(schemaGenerator(formData[formStep])),
    });
    const editMutation = useEditWarehouseProduct(activeRowId);

    const onSubmit = (data: any) => {
      editMutation.mutate(
        { ...data, warehouseId: activeRowId },
        {
          onSuccess() {
            toast.success("Edit Successfully");
            refetch();
            reset({
              product_id: editData?.data?.product_id.toString(),
              warehouse_id: editData?.data?.warehouse_id.toString(),
              quantity: editData?.data?.quantity,
              avg_cost: editData?.data?.avg_cost,
              rack: editData?.data?.rack,
            });
            setResetCount(resetCount + 1);
            modal.hide();
          },
          onError(error) {
            errorHandler(error);
          },
        }
      );
    };
    return (
      <ModalWrapper
        isLoading={editMutation.isPending || isLoading}
        key={activeRowId}
        isOpen={modal.visible}
        onClose={() => {
          modal.hide();
          reset({
            product_id: editData?.data?.product_id.toString(),
            warehouse_id: editData?.data?.warehouse_id.toString(),
            quantity: editData?.data?.quantity,
            avg_cost: editData?.data?.avg_cost,
            rack: editData?.data?.rack,
          });
        }}
        title={title}
      >
        <FormBuilder
          isFormReset={!isSubmitSuccessful && !isDirty}
          isConfirmationModalRequired
          data={formData[formStep]}
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
      </ModalWrapper>
    );
  }
);

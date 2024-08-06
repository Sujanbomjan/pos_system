import useEditBrands from "@/api/hooks/master/setting/brands/useEditBrand";
import useFetchBrandById from "@/api/hooks/master/setting/brands/useFetchBrandById";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ModalWrapper from "./ModalWrapper";

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

    const { data: editData, isLoading: isEditFetchLoading } =
      useFetchBrandById(activeRowId);

    const {
      handleSubmit: handleEditSubmit,
      getValues: getEditValues,
      formState: { errors: editErrors },
      control: editControl,
      register: editRegister,
      reset: editReset,
    } = useForm({
      values: {
        code: editData?.data.code,
        description: editData?.data.description,
        name: editData?.data.name,
      },
      defaultValues: getDefaultValues(editFormData[formStep]),
      resolver: yupResolver(schemaGenerator(editFormData[formStep])),
    });

    const editMutation = useEditBrands(activeRowId);

    const onEditSubmit = (data: any) => {
      editMutation.mutate(
        { ...data, brandId: activeRowId },
        {
          onSuccess() {
            toast.success("Edit Successfully");
            editReset();
          },
          onError() {
            toast.error(data.message);
          },
        }
      );
    };

    return (
      <ModalWrapper
        key={activeRowId}
        isOpen={modal.visible}
        onClose={() => modal.hide()}
        title={title}
      >
        <FormBuilder
          data={editFormData[formStep]}
          isLoading={editMutation.isPending}
          {...{
            getValues: getEditValues,
            handleSubmit: handleEditSubmit,
            isFinalStep,
            register: editRegister,
            errors: editErrors,
            onSubmit: onEditSubmit,
            control: editControl,
            reset: editReset,
            formStep,
            setFormStep,
          }}
        />
      </ModalWrapper>
    );
  }
);

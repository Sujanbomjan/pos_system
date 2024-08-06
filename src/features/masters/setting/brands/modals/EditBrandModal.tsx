import useEditBrands from "@/api/hooks/master/setting/brands/useEditBrand";
import useFetchBrandById from "@/api/hooks/master/setting/brands/useFetchBrandById";
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
    editFormData,
    title,
  }: {
    activeRowId: string;
    editFormData: any;
    title: string;
  }) => {
    const [formStep, setFormStep] = useState(0);
    const [resetCount, setResetCount] = useState(0);
    const [isNameChanged, setIsNameChanges] = useState(false);
    const isFinalStep = true;
    const modal = useModal();

    const {
      data: editData,
      isLoading,
      refetch,
    } = useFetchBrandById(activeRowId);

    const schema = schemaGenerator(editFormData[formStep]);

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
        name: editData?.data.name,
        description: editData?.data.description,
        code: editData?.data.code,
        image: [editData?.data.image],
      },
      defaultValues: getDefaultValues(editFormData[formStep]),
      resolver: yupResolver(schema),
    });

    const name = watch("name");

    useEffect(() => {
      if (name && editData?.data.name === name) {
        setIsNameChanges(true);
      }
    }, [name, editData?.data.name]);

    useEffect(() => {
      if (name && isNameChanged) {
        GenerateCode(name, setValue);
      }
    }, [name, setValue, resetCount]);

    const editMutation = useEditBrands(activeRowId);

    const onSubmit = (data: any) => {
      editMutation.mutate(
        { ...data, brandId: activeRowId },
        {
          onSuccess() {
            toast.success("Edit Successfully");
            setResetCount(resetCount + 1);
            setIsNameChanges(false);
            modal.hide();
          },
          onError(error) {
            errorHandler(error);
          },
        }
      );
    };

    const handleCloseModal = () => {
      reset(editData?.data);
      setIsNameChanges(false);
      modal.hide();
    };

    return (
      <ModalWrapper
        isLoading={editMutation.isPending || isLoading}
        key={activeRowId}
        isOpen={modal.visible}
        onClose={handleCloseModal}
        title={title}
      >
        <FormBuilder
          isFormReset={!isSubmitSuccessful && !isDirty}
          isConfirmationModalRequired
          data={editFormData[formStep]}
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

import useEditCategories from "@/api/hooks/master/setting/categories/useEditCategories";
import useFetchCategoriesById from "@/api/hooks/master/setting/categories/useFetchCategoriesById";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { errorHandler } from "@/utils/errorHandler";
import { GenerateCode } from "@/utils/generate-code";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
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
    } = useFetchCategoriesById(activeRowId);

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
        parent_id: editData?.data.parent_id?.toString(),
        code: editData?.data.code,
        image: editData?.data.image,
        description: editData?.data.description,
      },
      defaultValues: getDefaultValues(editFormData[formStep]),
      resolver: yupResolver(schemaGenerator(editFormData[formStep])),
    });

    const name = watch("name");
    const image = watch("image");

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

    const editMutation = useEditCategories(activeRowId);

    const onSubmit = (data: any) => {
      editMutation.mutate(
        { ...data, brandId: activeRowId },
        {
          onSuccess() {
            toast.success("Edit Successfully");
            reset({
              name: "",
              description: "",
              code: "",
              image: "",
            });
            setIsNameChanges(false);
            setResetCount(resetCount + 1);
            modal.hide();
          },
          onError(error) {
            errorHandler(error);
          },
        }
      );
    };

    const handleCloseModal = () => {
      if (editData?.data) {
        reset({
          name: editData.data.name,
          code: editData.data.code,
          image: editData.data.image,
          description: editData.data.description,
          parent_id: editData.data.parent_id?.toString(),
        });
      }
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

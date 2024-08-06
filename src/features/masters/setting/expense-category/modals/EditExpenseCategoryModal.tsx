import useEditExpenseCategory from "@/api/hooks/master/setting/expenseCategory/useEditExpenseCategory";
import useFetchExpenseCategoryById from "@/api/hooks/master/setting/expenseCategory/useFetchExpenseCategoryById";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { errorHandler } from "@/utils/errorHandler";
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

    const {
      data: editData,
      isLoading,
      refetch,
    } = useFetchExpenseCategoryById(activeRowId);

    const {
      handleSubmit,
      getValues,
      formState: { errors },
      control,
      register,
      reset,
      watch,
      setValue,
    } = useForm({
      values: {
        name: editData?.data.name,
        code: editData?.data.code
      },
      defaultValues: getDefaultValues(formData[formStep]),
      resolver: yupResolver(schemaGenerator(formData[formStep])),
    });

    const name = watch("name");

    useEffect(() => {
      const generateCode = () => {
        if (name) {
          const dashedName = name.split(" ").join("-").toUpperCase();
          const uuid = uuidv4().toUpperCase();
          const generatedCode = `${dashedName}-${uuid.substring(
            0,
            5
          )}`.substring(0, 20);
          setValue("code", generatedCode);
        } else {
          setValue("code", "");
        }
      };

      generateCode();
    }, [name, setValue, resetCount]);

    const editMutation = useEditExpenseCategory(activeRowId);

    const onSubmit = (data: any) => {
      editMutation.mutate(
        { ...data, expenseId: activeRowId },
        {
          onSuccess() {
            toast.success("Edit Successfully");
            reset({
              name: "",
              code: "",
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

    const handleCloseModal = () => {
      reset(editData?.data);
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
        >
        </FormBuilder>
      </ModalWrapper>
    );
  }
);

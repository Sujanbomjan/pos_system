import useAddExpenseCategory from "@/api/hooks/master/setting/expenseCategory/useAddExpenseCategory";
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
import { formData } from "../orderData";
export default NiceModal.create(
  ({ key, title }: { key: string; title: string }) => {
    const [formStep, setFormStep] = useState(0);
    const isFinalStep = formStep + 1 === formData.length;
    const modal = useModal();
    const {
      handleSubmit,
      getValues,
      formState: { errors, isDirty, isSubmitSuccessful },
      control,
      register,
      reset,
      setFocus,
      watch,
      setValue,
    } = useForm({
      defaultValues: {
        ...getDefaultValues(formData[formStep]),
      },
      resolver: yupResolver(schemaGenerator(formData[formStep])),
    });

    const name = watch("name");
    useEffect(() => {
      if (modal.visible) {
        setTimeout(() => {
          setFocus("name");
        }, 100);
      }
    }, [modal.visible, setFocus]);

    useEffect(() => {
      if (name === "") {
        setValue("code", "");
      } else {
        let dashed_name = name.split(" ").join("-").toUpperCase();
        const uuid = uuidv4().toUpperCase();
        const generatedCode = `${dashed_name}-${uuid.substring(
          0,
          5
        )}`.substring(0, 20);
        setValue("code", generatedCode);
      }
    }, [name, setValue]);

    const mutation = useAddExpenseCategory();
    const onSubmit = async (data: any) => {
      mutation.mutate(data, {
        onSuccess: () => {
          toast.success("Expense Category added successfully");
          reset({
            name: "",
            code: "",
          });
          modal.hide();
        },
        onError: (error) => {
          errorHandler(error);
        },
      });
    };

    return (
      <ModalWrapper
        isLoading={mutation.isPending}
        key={key}
        isOpen={modal.visible}
        onClose={() => {
          modal.hide();
          reset();
        }}
        title={title}
      >
        <>
          <FormBuilder
            isFormReset={!isSubmitSuccessful && !isDirty}
            isConfirmationModalRequired
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
        </>
      </ModalWrapper>
    );
  }
);

import useAddCategories from "@/api/hooks/master/setting/categories/useAddCategories";
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
import useCategoriesData from "../orderData";
import { GenerateCode } from "@/utils/generate-code";

export default NiceModal.create(
  ({ key, title }: { key: string; title: string }) => {
    const [formStep, setFormStep] = useState(0);
    const { formData } = useCategoriesData();
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
      GenerateCode(name, setValue);
    }, [name, setValue]);

    const mutation = useAddCategories();
    const onSubmit = async (data: any) => {
      mutation.mutate(data, {
        onSuccess: () => {
          toast.success("Categories added successfully");
          reset({
            name: "",
            description: "",
            image: null,
            code: "",
          });
          modal.hide();
        },
        onError: (error) => {
          console.log("error", error);
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

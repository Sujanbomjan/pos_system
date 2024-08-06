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
import useCategoriesData from "../orderData";
import useImportCategories from "@/api/hooks/master/setting/categories/useImportCategories";
import { useQueryClient } from "@tanstack/react-query";
import useFetchCategories from "@/api/hooks/master/setting/categories/useFectchCategories";
export default NiceModal.create(
  ({ key, title }: { key: string; title: string }) => {
    const { importFormData } = useCategoriesData();
    const [formStep, setFormStep] = useState(0);
    const isFinalStep = formStep + 1 === importFormData.length;
    const modal = useModal();
    const queryClient = useQueryClient();
    const {
      handleSubmit,
      getValues,
      formState: { errors, isDirty, isSubmitSuccessful },
      control,
      register,
      reset,
    } = useForm({
      defaultValues: {
        ...getDefaultValues(importFormData[formStep]),
      },
      resolver: yupResolver(schemaGenerator(importFormData[formStep])),
    });

    const mutation = useImportCategories();
    const { data, refetch } = useFetchCategories();
    const onSubmit = async (data: any) => {
      mutation.mutate(data, {
        onSuccess: () => {
          toast.success("Categories data imported successfully");
          modal.hide();
          refetch;
        },
        onError: (error: any) => {
          const mappedError = error.response.data.errors
            .map((err: any) => err[0])
            .join("\n");
          toast.error(mappedError);
        },
      });
    };
    const handleClick = (e: any) => {
      e.preventDefault();
      window.location.href = "/categories_sample.xlsx";
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
            data={importFormData[formStep]}
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
            <p
              onClick={handleClick}
              className="w-fit cursor-pointer hover:text-blue-600 mt-2"
            >
              Download sample file{" "}
            </p>
          </FormBuilder>
        </>
      </ModalWrapper>
    );
  }
);

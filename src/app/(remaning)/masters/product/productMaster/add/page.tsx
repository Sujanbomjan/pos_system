"use client";
import useAddProduct from "@/api/hooks/master/product/useAddProduct";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import useProductData from "@/features/masters/product/product-data";
import ProductVariantTable from "@/features/masters/product/product-variant-table";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { useAppDispatch } from "@/lib/hooks";
import { setCategoryId } from "@/lib/product/product-slice";
import { errorHandler } from "@/utils/errorHandler";
import { GenerateCode } from "@/utils/generate-code";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "rizzui";
const pageHeader = {
  title: "Product",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      href: routes.productMaster.index,
      name: "Product",
    },
    {
      name: "Product Add",
    },
  ],
};
export default function Page() {
  const { productFormData, supplierFormData } = useProductData();
  const [formDataArray, setFormDataArray] = useState<any[]>([]);
  const [formStep, setFormStep] = useState(0);
  const isFinalStep = formStep + 1 === productFormData.length;

  const baseSchema = schemaGenerator(productFormData[formStep]);
  const supplierSchema = schemaGenerator(supplierFormData[formStep]);

  const newSchema = baseSchema.concat(supplierSchema);

  const {
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isSubmitSuccessful, isLoading },
    control,
    register,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      ...getDefaultValues(productFormData[formStep]),
      ...getDefaultValues(supplierFormData[formStep]),
      weight: 0,
      supplier1price: 0,
      track_quantity: false,
      tax_method: false,
      promotion: false,
      hide: false,
      hide_pos: false,
    },
    resolver: yupResolver(newSchema),
  });

  const name = watch("name");
  const hasVariant = watch("has_variant");
  const categories = watch("category_id");

  const dispatch = useAppDispatch();
  dispatch(setCategoryId(categories));

  useEffect(() => {
    setFormDataArray([]);
  }, [hasVariant]);

  useEffect(() => {
    setValue("variant", formDataArray);
  }, [formDataArray, setValue]);

  useEffect(() => {
    GenerateCode(name, setValue);
  }, [name, setValue]);

  const mutation = useAddProduct();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Product added successfully");
        reset();
        router.push(routes.productMaster.index);
      },
      onError: (error) => {
        errorHandler(error);
        console.log("error", error);
      },
    });
  };

  const [modalOpen, setModalOpen] = useState(false);

  //final confirmation after clicked yes on modal
  const handleSubmitConfirmation = () => {
    setModalOpen(true);
  };

  const handleSubmitConfirmationCancel = () => {
    setModalOpen(false);
  };

  const handleSubmitConfirmationConfirm = () => {
    handleSubmit(onSubmit)();
    setModalOpen(false);
  };

  return (
    <>
      <LoadingOverlay isVisible={mutation.isPending} />
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex justify-around gap-10 relative">
        <div className="w-[52%]">
          <FormBuilder
            hideButton
            isFormReset={!isSubmitSuccessful && !isDirty}
            isConfirmationModalRequired
            data={productFormData[formStep]}
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
        </div>

        <div className="w-[48%]">
          <FormBuilder
            isFormReset={!isSubmitSuccessful && !isDirty}
            hideButton
            isConfirmationModalRequired
            data={supplierFormData[formStep]}
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
            {hasVariant && (
              <ProductVariantTable
                setTableData={setFormDataArray}
                tableData={formDataArray}
              />
            )}
          </FormBuilder>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-3">
          <ConfirmationModal
            isOpen={modalOpen}
            onClose={handleSubmitConfirmationCancel}
            handleAction={handleSubmitConfirmationConfirm}
          />
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onClick={handleSubmit(handleSubmitConfirmation)}
            className="flex items-center justify-center gap-1 py-1"
            type="submit"
          >
            Submit
          </Button>
          <Button
            variant="outline"
            onClick={() => reset()}
            className="bg-[#E3E3E3] py-1 flex items-center justify-center gap-1"
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}

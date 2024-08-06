"use client";
import useEditProduct from "@/api/hooks/master/product/useEditProduct";
import useFetchProductById from "@/api/hooks/master/product/useFetchProductById";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import useProductData from "@/features/masters/product/product-data";
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
      name: "Product Edit",
    },
  ],
};
const EditProduct = ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
  const { productId } = params;
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const [formDataArray, setFormDataArray] = useState<any[]>([]);
  const [isNameChanged, setIsNameChanges] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const isFinalStep = true;

  const { productFormData, editFormData } = useProductData();
  const { data: editData, isLoading, refetch } = useFetchProductById(productId);
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
      unit: editData?.data.unit?.id?.toString(),
      price: editData?.data.price
        ? parseFloat(editData?.data.price).toFixed(2)
        : null,
      cost: editData?.data.cost
        ? parseFloat(editData?.data.cost).toFixed(2)
        : null,
      alert_quantity: editData?.data.alert_quantity
        ? parseFloat(editData?.data.alert_quantity).toFixed(2)
        : null,
      image: editData?.data.image,
      product_photos: editData?.data.photos[0]?.photo || [],
      category_id:
        editData?.data.category_id?.parent_id?.toString() ||
        editData?.data.category_id.toString(),
      subcategory_id:
        editData?.data.subcategory_id?.id?.toString() ||
        editData?.data.subcategory_id?.toString(),
      quantity: editData?.data.quantity,
      tax_rate: editData?.data.tax_rate?.toString(),
      track_quantity: editData?.data.track_quantity,
      barcode_symbology_id: editData?.data.barcode_symbology_id?.toString(),
      product_details: editData?.data.product_details,
      tax_method: editData?.data.tax_method === 1,
      file: editData?.data.file ? editData.data.file : "",
      type: editData?.data.type?.toString(),
      promotion: editData?.data.promotion,
      promo_price: editData?.data.promo_price
        ? parseFloat(editData?.data.promo_price).toFixed(2)
        : null,
      sale_unit: editData?.data.sale_unit || 0,
      purchase_unit: editData?.data.purchase_unit || 0,
      brand:
        editData?.data.brand?.id?.toString() ||
        editData?.data.brand?.toString(),
      featured: editData?.data.featured === 1 ? 1 : 0,
      weight: editData?.data.weight
        ? parseFloat(editData?.data.weight).toFixed(2)
        : 0,
      second_name: editData?.data.second_name,
      code: editData?.data.code,
      hide_pos: editData?.data.hide_pos === 1,
      hide: editData?.data.hide === 1,
      supplier1:
        editData?.data.supplier1?.toString() || editData?.data?.supplier1 || "",
      supplier1price: editData?.data.supplier1price || 0,
      supplier1_part_no: editData?.data.supplier1_part_no,
      product_variants: editData?.data?.product_variants?.map((variant) => ({
        id: variant.id,
        name: variant.name,
        variant_code: variant.variant_code,
        cost: variant.cost,
        price: variant.price,
        quantity: variant.quantity,
      })),
    },
    defaultValues: getDefaultValues(productFormData[formStep]),
    resolver: yupResolver(schemaGenerator(productFormData[formStep])),
  });

  const hasVariant = watch("product_variants");
  const categories = watch("category_id");

  const dispatch = useAppDispatch();
  dispatch(setCategoryId(categories));
  useEffect(() => {
    if (hasVariant) {
      setFormDataArray(editData?.data?.product_variants || []);
    } else {
      setFormDataArray([]);
    }
  }, [hasVariant, editData]);

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

  const editMutation = useEditProduct(productId);

  const onSubmit = (data: any) => {
    editMutation.mutate(
      { ...data, id: productId },
      {
        onSuccess() {
          toast.success("Edited Successfully");
          router.push(routes.productMaster.index);
          reset(editData?.data);
          setIsNameChanges(false);
          setResetCount(resetCount + 1);
        },
        onError(error) {
          errorHandler(error);
        },
      }
    );
  };

  return (
    <>
      <LoadingOverlay
        isVisible={
          isLoading || editMutation.isSuccess || editMutation.isPending
        }
      />
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex justify-around gap-10">
        <div className="w-[52%]">
          <FormBuilder
            isFormReset={!isSubmitSuccessful && !isDirty}
            isConfirmationModalRequired
            data={productFormData[formStep]}
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
        </div>
        <div className="w-[48%]">
          <FormBuilder
            hideButton
            isFormReset={!isSubmitSuccessful && !isDirty}
            isConfirmationModalRequired
            data={editFormData[formStep]}
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
      </div>
    </>
  );
};

export default EditProduct;

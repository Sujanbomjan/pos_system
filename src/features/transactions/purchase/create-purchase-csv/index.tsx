"use client";
import useAddPurchaseByCSV from "@/api/hooks/transaction/purchase/useAddPurchaseByCSV";
import { routes } from "@/config/routes";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { errorHandler } from "@/utils/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import usePurchaseData from "../purchaseTableData";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { useAppSelector } from "@/lib/hooks";

const CreatePurchase = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const { DataByCSV, formDataByCsv, moreOptionsData, quillEditorData } =
    usePurchaseData();
  const isFinalStep = formStep + 1 === formDataByCsv.length;

  const baseSchema = schemaGenerator(formDataByCsv[formStep]);
  const quillSchema = schemaGenerator(quillEditorData[formStep]);
  const dataSchema = schemaGenerator(DataByCSV[formStep]);
  const moreOptionsSchema = schemaGenerator(moreOptionsData[formStep]);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  const newSchema = baseSchema
    .concat(quillSchema)
    .concat(dataSchema)
    .concat(moreOptionsSchema);
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
      ...getDefaultValues(formDataByCsv[formStep]),
      ...getDefaultValues(quillEditorData[formStep]),
      ...getDefaultValues(DataByCSV[formStep]),
      ...getDefaultValues(moreOptionsData[formStep]),
      date: formattedDate,
      order_discount: 0,
      shipping: 0,
      order_tax: "",
    },
    resolver: yupResolver(newSchema),
  });

  const moreOptions = watch("moreOptions");

  const mutation = useAddPurchaseByCSV();
  const onSubmit = async (data: any) => {
    const payload = {
      data,
    };
    console.log("data", data);

    //@ts-ignore
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Purchase added successfully");
        router.push(routes.purchase.purchase);
      },
      onError: (error) => {
        errorHandler(error);
      },
    });
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    window.location.href = "/purchase_item_import.xlsx";
  };

  return (
    <>
      <LoadingOverlay isVisible={mutation.isPending || mutation.isSuccess} />
      <FormBuilder
        hideButton
        isFormReset={!isSubmitSuccessful && !isDirty}
        data={formDataByCsv[formStep]}
        isConfirmationModalRequired
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
        <div className="p-4 border border-gray-300 rounded-md w-full my-4">
          <div className="flex flex-row justify-between items-start">
            <div>
              <p className="mb-2">
                The first line in downloaded CSV file should remain as it is.
                Please do not change the order of columns.
              </p>
              <p className="mb-2">
                The correct column order is{" "}
                <strong>
                  (Product Code, Net Unit Cost, Quantity, Product Variant, Tax
                  Rate Name, Discount, Expiry)
                </strong>{" "}
                & you must follow this.
              </p>
              <p className="mb-2">
                Please make sure the CSV file is UTF-8 encoded and not saved
                with byte order mark (BOM).
              </p>
              <p className="mb-2">
                <strong>
                  First 3 columns are required and all others are optional.
                </strong>
              </p>
            </div>
            <button
              onClick={handleClick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Download Sample File
            </button>
          </div>
        </div>
      </FormBuilder>

      <FormBuilder
        hideButton
        isFormReset={!isSubmitSuccessful && !isDirty}
        data={DataByCSV[formStep]}
        isConfirmationModalRequired
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
      {moreOptions && (
        <FormBuilder
          hideButton
          isFormReset={!isSubmitSuccessful && !isDirty}
          data={moreOptionsData[formStep]}
          isConfirmationModalRequired
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
      )}
      <FormBuilder
        isFormReset={!isSubmitSuccessful && !isDirty}
        data={quillEditorData[formStep]}
        isConfirmationModalRequired
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
  );
};

export default CreatePurchase;

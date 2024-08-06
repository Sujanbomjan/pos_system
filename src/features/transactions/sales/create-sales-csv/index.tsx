"use client";

import useAddSalesByCsv from "@/api/hooks/transaction/sales/useAddSalesByCsv";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { routes } from "@/config/routes";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { errorHandler } from "@/utils/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSalesData from "../salesTableData";

import * as yup from "yup";

const CreateSales = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const { formDataCsv, orderFormDataCsv } = useSalesData();
  const isFinalStep = formStep + 1 === formDataCsv.length;

  const baseSchema = schemaGenerator(formDataCsv[formStep]);
  const orderSchema = schemaGenerator(orderFormDataCsv[formStep]);

  const newSchema = baseSchema.concat(orderSchema).concat(
    yup.object().shape({
      product: yup.array().min(1, "Select at least one product"),
    })
  );
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  const {
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isSubmitSuccessful, isLoading },
    control,
    register,
    reset,
    setFocus,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      ...getDefaultValues(formDataCsv[formStep]),
      ...getDefaultValues(orderFormDataCsv[formStep]),
      order_discount: 0,
      shipping: 0,
      order_tax: "",
      date: formattedDate,
    },
    resolver: yupResolver(newSchema),
  });

  const mutation = useAddSalesByCsv();
  const onSubmit = async (data: any) => {
    const payload = {
      data,
    };

    //@ts-ignore
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Sales added successfully");
        router.push(routes.sales.sales);
      },
      onError: (error) => {
        console.error("Error occurred:", error);
        errorHandler(error);
      },
    });
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    window.location.href = "/sample_sma_sale_item.xlsx";
  };

  return (
    <>
      <LoadingOverlay isVisible={mutation.isPending || mutation.isSuccess} />
      <FormBuilder
        isFormReset={!isSubmitSuccessful && !isDirty}
        isConfirmationModalRequired
        data={formDataCsv[formStep]}
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
        hideButton
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
        isFormReset={!isSubmitSuccessful && !isDirty}
        isConfirmationModalRequired
        data={orderFormDataCsv[formStep]}
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

export default CreateSales;

"use client";
import useReturnSales from "@/api/hooks/transaction/sales/useReturnSales";
import useSalesById from "@/api/hooks/transaction/sales/useSalesById";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { routes } from "@/config/routes";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { errorHandler } from "@/utils/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSalesReturnData from "./return-sales-data";
import ReturnSalesTable from "./return-sales-table";

const SalesReturnData = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useSalesById({ id });

  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const { formData, noteFormData } = useSalesReturnData();
  const isFinalStep = formStep + 1 === formData.length;
  const baseSchema = schemaGenerator(formData[formStep]);
  const secondarySchema = baseSchema.concat(
    schemaGenerator(noteFormData[formStep])
  );

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;

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
    values: {
      date: formattedDate,
      shipping: data?.data.shipping ?? 0,
      reference_no: data?.data.reference_no,
      order_discount: data?.data.order_discount,
      surcharge: data?.data.surcharge,
      warehouse_id: data?.data?.warehouse_id?.toString() || "",
      status: data?.data?.sale_status || "",
      payment_status: data?.data?.payment_status || "",
      biller_id: data?.data?.biller.id || "",
      customer_id: data?.data.customer_id || "",
      order_tax: data?.data.order_tax,
      product:
        data?.data?.sale_items?.map((product) => ({
          ...product,
        })) || [],
    },
    defaultValues: {
      ...getDefaultValues(formData[formStep]),
    },
    resolver: yupResolver(secondarySchema),
  });
  const biller_id = watch("biller_id");
  const customer_id = watch("customer_id");
  const warehouse_id = watch("warehouse_id");
  const surchargeWatch = watch("surcharge");

  const productData = watch("product");

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (productData && productData.length > 0) {
      const orderTax = data?.data?.tax;
      const products = productData.map((product: any) => ({
        ...product,
        order_tax: orderTax,
        surcharge: surchargeWatch,
        received_quantity: product.quantity,
      }));

      setSelectedProducts(products);
      console.log("products", products);
    }
  }, [productData, data, id, surchargeWatch]);

  const mutation = useReturnSales();
  const onSubmit = async (salesData: any) => {
    const sales_id = id;
    if (selectedProducts.length >= 1) {
      const payload = {
        salesData: {
          ...salesData,
          customer_id: customer_id,
          biller_id: biller_id,
          warehouse_id: warehouse_id,
          created_by: data?.data.created_by.id,
        },
        selectedProducts,
        sales_id,
      };

      //@ts-ignore
      mutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Sales Return Successfully");
          router.push(routes.sales.sales);
        },
        onError: (error) => {
          console.log("error", error);
          errorHandler(error);
        },
      });
    } else {
      toast.error("Sales Return Error");
    }
  };

  return (
    <>
      <LoadingOverlay
        isVisible={mutation.isPending || mutation.isSuccess || isLoading}
      />
      <FormBuilder
        hideButton
        isFormReset={!isSubmitSuccessful && !isDirty}
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

      <div className="mt-10">
        <p className="mb-1">
          <span className="font-semibold">Order Items</span> (Please edit the
          return quantity below. You can remove the item or set the return
          quantity to zero if it is not being returned)
        </p>
        <ReturnSalesTable
          tableData={selectedProducts}
          setTableData={setSelectedProducts}
        />
      </div>
      <div
        className={`inline-block my-4 min-w-[150px] py-3 p-3 rounded-md ${
          data?.data.payment_status === "Completed"
            ? "bg-green-200"
            : "bg-red-200"
        }`}
      >
        <p>
          Payment Status:{" "}
          <span className="font-semibold">{data?.data.payment_status}</span> &
          Amount paid <span className="font-semibold">{data?.data.paid}</span>{" "}
        </p>
        <p>Please adjust payments for the purchase manually</p>
      </div>
      <FormBuilder
        isFormReset={!isSubmitSuccessful && !isDirty}
        data={noteFormData[formStep]}
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

export default SalesReturnData;

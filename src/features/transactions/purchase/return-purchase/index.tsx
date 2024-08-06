"use client";
import usePurchaseById from "@/api/hooks/transaction/purchase/usePurchaseById";
import useReturnPurchase from "@/api/hooks/transaction/purchase/useReturnPurchase";
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
import usePurchaseReturnData from "../PurchaseReturnTable";
import PurchaseReturnTable from "../PurchaseReturnTable/PurchaseTable";

const PurchaseReturnData = () => {
  const params = useParams();
  const id = params.id as string;
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  const { data, isLoading } = usePurchaseById({ id });

  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const { formData, noteFormData } = usePurchaseReturnData();
  const isFinalStep = formStep + 1 === formData.length;
  const baseSchema = schemaGenerator(formData[formStep]);
  const secondarySchema = baseSchema.concat(
    schemaGenerator(noteFormData[formStep])
  );

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
      reference_no: data?.data.reference_no,
      order_discount: Number(data?.data.order_discount).toFixed(2),
      surcharge: Number(data?.data.surcharge).toFixed(2) || 0,
      warehouse_id: data?.data?.warehouse_id?.toString() || "",
      status: data?.data?.status || "",
      payment_status: data?.data?.payment_status || "",
      supplier_id: data?.data?.supplier_id?.toString() || "",
      customer_id: data?.data.supplier_id?.toString() || "",
      order_tax: data?.data.order_tax,
      product:
        data?.data?.purchase_items?.map((product) => ({
          ...product,
        })) || [],
    },
    defaultValues: {
      ...getDefaultValues(formData[formStep]),
      date: formattedDate,
    },
    resolver: yupResolver(secondarySchema),
  });
  const biller_id = watch("biller_id");
  const customer_id = watch("customer_id");

  const productData = watch("product");

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const surchargeWatch = watch("surcharge");

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

  const mutation = useReturnPurchase();

  const onSubmit = async (purchaseData: any) => {
    const purchase_id = id;
    if (selectedProducts.length >= 1) {
      const payload = {
        purchaseData: {
          ...purchaseData,
          customer_id: customer_id,
          biller_id: biller_id,
        },
        selectedProducts,
        purchase_id,
      };

      //@ts-ignore
      mutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Purchase Return Successfully");
          router.push(routes.purchase.purchase);
        },
        onError: (error) => {
          console.log("error", error);
          errorHandler(error);
        },
      });
    } else {
      toast.error("Purchase Return Error");
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
        <PurchaseReturnTable
          tableData={selectedProducts}
          setTableData={setSelectedProducts}
        />
      </div>
      <div
        className={`inline-block my-4 min-w-[150px] py-3 p-3 rounded-md ${
          data?.data.payment_status === "success"
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
        isConfirmationModalRequired
        data={noteFormData[formStep]}
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

export default PurchaseReturnData;

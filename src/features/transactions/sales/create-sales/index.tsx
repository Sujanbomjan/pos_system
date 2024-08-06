"use client";

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
import useSalesData from "../salesTableData";
import SalesTable from "../sales-table";
import useAddSales from "@/api/hooks/transaction/sales/useAddSales";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { setWarehouse } from "@/lib/sales/salesSlice";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

import * as yup from "yup";
import { Button } from "rizzui";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

const CreateSales = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const { formData, orderFormData } = useSalesData();
  const isFinalStep = formStep + 1 === formData.length;

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  const baseSchema = schemaGenerator(formData[formStep]);
  const orderSchema = schemaGenerator(orderFormData[formStep]);

  const newSchema = baseSchema.concat(orderSchema).concat(
    yup.object().shape({
      product: yup.array().min(1, "Select at least one product"),
    })
  );

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
      ...getDefaultValues(formData[formStep]),
      ...getDefaultValues(orderFormData[formStep]),
      date: formattedDate,
      reference_no: "",
      order_discount: 0,
      shipping: 0,
      payment_term: 0,
    },
    resolver: yupResolver(newSchema),
  });

  const dateWatch = watch("date");

  useEffect(() => {
    if (dateWatch) {
      const date = new Date(dateWatch);
      const refMonth = date.getMonth();
      const refYear = date.getFullYear();
      const randomNum = Math.floor(Math.random() * 100000);
      setValue("reference_no", `PO${refYear}/${refMonth}/${randomNum}`);
    }
  }, [dateWatch]);

  const dispatch = useAppDispatch();

  const productWatch = watch("product");

  const warehouse = watch("warehouse_id");
  dispatch(setWarehouse(warehouse));

  const watchOrderTax = watch("order_tax");

  const productData = useAppSelector((state) => state.sales.product);

  const taxData = useAppSelector((state) => state.purchase.taxData);

  const orderDiscountWatch = watch("order_discount");
  const shippingWatch = watch("shipping");

  useEffect(() => {
    if (warehouse || warehouse === undefined) {
      setValue("product", "");
    }
  }, [warehouse]);

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const initialProduct = {
    quantity: 0,
    sub_total: 0,
    order_discount: orderDiscountWatch ?? 0,
    order_tax: 0,
    shipping: shippingWatch ?? 0,
    grand_total: 0,
  };

  const [totalProduct, setTotalProduct] = useState(initialProduct);

  useEffect(() => {
    if (productWatch && productWatch.length > 0) {
      const selectedValues = productWatch.map((item: any) =>
        parseInt(item.value)
      );
      // Filter out products that are no longer in productWatch
      const updatedSelectedProducts = selectedProducts.filter((product) =>
        selectedValues.includes(product.id)
      );

      // Find products that are in productWatch but not in selectedProducts
      const newProducts = productData?.data[0].data
        .filter(
          (product: any) =>
            selectedValues.includes(product?.product?.id) &&
            !selectedProducts.some(
              (selectedProduct) => selectedProduct.id === product.product.id
            )
        )
        .map((product: any) => ({
          ...product.product,
          item_discount: 0,
          tax: 0,
          sub_total: 0,
          quantity: 1,
          total_quantity: Number(product.quantity),
        }));
      setSelectedProducts([...updatedSelectedProducts, ...newProducts]);
    } else {
      setSelectedProducts([]);
      setTotalProduct(initialProduct);
    }
  }, [productWatch, productData]);

  const mutation = useAddSales();
  const onSubmit = async (data: any) => {
    if (selectedProducts.length >= 1) {
      const payload = {
        data,
        selectedProducts,
      };

      //@ts-ignore
      mutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Sales added successfully");
          router.push(routes.sales.sales);
        },
        onError: (error) => {
          errorHandler(error);
        },
      });
    } else {
      toast.error("Select Products");
    }
  };

  useEffect(() => {
    if (orderDiscountWatch) {
      setTotalProduct((prev) => ({
        ...prev,
        order_discount: orderDiscountWatch,
      }));
    } else {
      setTotalProduct((prev) => ({
        ...prev,
        order_discount: 0,
      }));
    }
    if (shippingWatch) {
      setTotalProduct((prev) => ({
        ...prev,
        shipping: shippingWatch,
      }));
    } else {
      setTotalProduct((prev) => ({
        ...prev,
        shipping: 0,
      }));
    }
  }, [orderDiscountWatch, shippingWatch]);

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

  useEffect(() => {
    if (watchOrderTax) {
      const matchingTaxData = taxData.data.find(
        (tax: any) => parseInt(tax.id) === parseInt(watchOrderTax)
      );
      if (matchingTaxData) {
        if (matchingTaxData.type === "PERCENTAGE") {
          const taxAmount =
            (matchingTaxData.value / 100) *
            (totalProduct.sub_total - totalProduct.order_discount);
          setTotalProduct((prev) => ({
            ...prev,
            order_tax: taxAmount,
          }));
        } else {
          setTotalProduct((prev) => ({
            ...prev,
            order_tax: matchingTaxData.value,
          }));
        }
      }
    } else {
      setTotalProduct((prev) => ({
        ...prev,
        order_tax: 0,
      }));
    }
  }, [
    watchOrderTax,
    taxData,
    totalProduct.sub_total,
    totalProduct.order_discount,
  ]);

  useEffect(() => {
    const total =
      totalProduct.sub_total -
      parseInt(totalProduct.order_discount) +
      totalProduct.order_tax +
      parseInt(totalProduct.shipping);
    setTotalProduct((prev) => ({
      ...prev,
      grand_total: total,
    }));
  }, [
    totalProduct.sub_total,
    totalProduct.order_discount,
    totalProduct.order_tax,
    totalProduct.shipping,
  ]);

  return (
    <>
      <LoadingOverlay isVisible={mutation.isPending || mutation.isSuccess} />
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
        hideButton
      >
        <SalesTable
          tableData={selectedProducts}
          setTableData={setSelectedProducts}
          productWatch={productWatch}
          setValue={setValue}
          setTotalProduct={setTotalProduct}
        />
      </FormBuilder>

      <FormBuilder
        isFormReset={!isSubmitSuccessful && !isDirty}
        isConfirmationModalRequired
        data={orderFormData[formStep]}
        hideButton
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
      <div className="flex gap-3 my-3">
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

      <div>
        <table className="min-w-full divide-y divide-gray-200 font-[sans-serif]">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                <div className="flex justify-between">
                  <p>Items</p>
                  <p>
                    {selectedProducts.length} ({totalProduct.quantity})
                  </p>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>{totalProduct.sub_total.toFixed(2)}</p>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                <div className="flex justify-between">
                  <p>Order Discount</p>
                  <p>{parseInt(totalProduct.order_discount).toFixed(2)}</p>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                <div className="flex justify-between">
                  <p>Order Tax</p>
                  <p>{totalProduct.order_tax.toFixed(2)}</p>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>{parseInt(totalProduct.shipping).toFixed(2)}</p>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                <div className="flex justify-between">
                  <p>Grand Total</p>
                  <p>{totalProduct.grand_total.toFixed(2)}</p>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default CreateSales;

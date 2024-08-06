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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFromWarehouse } from "@/lib/transfer/transferSlice";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

import * as yup from "yup";
import { Button } from "rizzui";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import usePurchaseData from "../transferTableData";
import useAddTransfer from "@/api/hooks/transaction/warehouseTransfer/useAddTransfer";
import PurchaseTable from "../WarehouseTable/WarehouseTransferTable";

const CreateSales = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const { formData, secondFormData } = usePurchaseData();
  const isFinalStep = formStep + 1 === formData.length;

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  const baseSchema = schemaGenerator(formData[formStep]);
  const orderSchema = schemaGenerator(secondFormData[formStep]);

  const newSchema = baseSchema.concat(orderSchema).concat(
    yup.object().shape({
      transfer_items: yup.array().min(1, "Select at least one product"),
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
      ...getDefaultValues(secondFormData[formStep]),
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
      setValue("transfer_no", `PO${refYear}/${refMonth}/${randomNum}`);
    }
  }, [dateWatch]);

  const dispatch = useAppDispatch();

  const productWatch = watch("transfer_items");

  const FromWarehouse = watch("from_warehouse_id");
  dispatch(setFromWarehouse(FromWarehouse));

  const watchOrderTax = watch("order_tax");
  console.log(watchOrderTax);

  const productData = useAppSelector((state) => state.transfer.product);

  const taxData = useAppSelector((state) => state.purchase.taxData);

  useEffect(() => {
    if (FromWarehouse || FromWarehouse === null || undefined) {
      setValue("transfer_items", "");
    }
  }, [FromWarehouse]);
  const orderDiscountWatch = watch("order_discount");
  const shippingWatch = watch("shipping");

  const initialProduct = {
    quantity: 0,
    sub_total: 0,
    order_discount: orderDiscountWatch ?? 0,
    order_tax: 0,
    shipping: shippingWatch ?? 0,
    grand_total: 0,
  };

  const [totalProduct, setTotalProduct] = useState(initialProduct);

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  useEffect(() => {
    if (productWatch && productWatch.length > 0) {
      const selectedValues = productWatch.map((item: any) =>
        parseInt(item.value)
      );

      // Filter out products that are no longer in productWatch
      const updatedSelectedProducts = selectedProducts.filter((product) =>
        selectedValues.includes(product.id)
      );

      console.log("updatedSelectedProducts", updatedSelectedProducts);

      // Check if productData?.data[0]?.data is defined before filtering
      const newProducts = productData?.data[0]?.data
        ? productData.data[0].data
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
            }))
        : [];

      setSelectedProducts([...updatedSelectedProducts, ...newProducts]);
    } else {
      setSelectedProducts([]);
      setTotalProduct(initialProduct);
    }
  }, [productWatch, productData]);


  const mutation = useAddTransfer();
  const onSubmit = async (data: any) => {
    if (selectedProducts.length >= 1) {
      const payload = {
        data,
        selectedProducts,
      };

      console.log("data", data);

      //@ts-ignore
      mutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Warehouse Transfer added successfully");
          router.push(routes.inventory.warehouseTransfer.warehouseTransfer);
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
    if (shippingWatch === "" || shippingWatch === null) {
      setTotalProduct((prev) => ({
        ...prev,
        shipping: 0,
      }));
    } else {
      setTotalProduct((prev) => ({
        ...prev,
        shipping: shippingWatch,
      }));
    }
  }, [shippingWatch]);
  useEffect(() => {
    if (totalProduct.quantity === 0 || totalProduct.quantity === null) {
      setTotalProduct((prev) => ({
        ...prev,
        quantity: 0,
      }));
    } else {
      setTotalProduct((prev) => ({
        ...prev,
        quantiy: totalProduct.quantity,
      }));
    }
  }, [shippingWatch]);
  useEffect(() => {
    if (orderDiscountWatch) {
      setTotalProduct((prev) => ({
        ...prev,
        order_discount: orderDiscountWatch,
      }));
    }
    if (shippingWatch) {
      setTotalProduct((prev) => ({
        ...prev,
        shipping: shippingWatch,
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
            (matchingTaxData.value / 100) * totalProduct.sub_total;
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
    }
  }, [watchOrderTax, taxData, totalProduct.sub_total]);

  useEffect(() => {
    const total =
      totalProduct.order_tax +
      totalProduct.sub_total -
      parseInt(totalProduct.order_discount) +
      parseInt(totalProduct.shipping);
    setTotalProduct((prev) => ({
      ...prev,
      grand_total: total,
    }));
  }, [
    totalProduct.order_discount,
    totalProduct.order_tax,
    totalProduct.shipping,
    totalProduct.sub_total,
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
        <PurchaseTable
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
        data={secondFormData[formStep]}
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
                  <p>{totalProduct.sub_total}</p>
                </div>
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>{totalProduct.shipping}</p>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                <div className="flex justify-between">
                  <p>Grand Total</p>
                  <p>{totalProduct.grand_total}</p>
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

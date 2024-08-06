"use client";

import { routes } from "@/config/routes";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { errorHandler } from "@/utils/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next-nprogress-bar";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setWarehouse } from "@/lib/purchase/purchaseSlice";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import useEditTransfer from "@/api/hooks/transaction/warehouseTransfer/useEditTransfer";
import * as yup from "yup";
import { Button } from "rizzui";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import usePurchaseData from "../transferTableData";
import PurchaseTable from "../warehouseEditTable/WarehouseEditTable";
import useFetchTransferById from "@/api/hooks/transaction/warehouseTransfer/useFetchTransferById";
import { useParams } from "next/navigation";

const CreateSales = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [formStep, setFormStep] = useState(0);
  const { editTransferForm, secondFormData } = usePurchaseData();
  const isFinalStep = formStep + 1 === editTransferForm.length;
  const { data } = useFetchTransferById({ id });
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  const baseSchema = schemaGenerator(editTransferForm[formStep]);
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
    values: {
      ...data,
      status: data?.data.status,
      to_warehouse_id: data?.data.to_warehouse_id?.toString(),
      from_warehouse_id: data?.data?.from_warehouse_id?.toString(),
      transfer_items:
        data?.data?.transfer_items?.map((item) => ({
          ...item,
        })) || [],
    },
    defaultValues: {
      ...getDefaultValues(editTransferForm[formStep]),
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

  const warehouse = watch("warehouse_id");
  dispatch(setWarehouse(warehouse));

  const watchOrderTax = watch("order_tax");

  const productData = useAppSelector((state) => state.transfer.product);

  const taxData = useAppSelector((state) => state.purchase.taxData);

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (productWatch && productWatch.length > 0) {
      const products = productWatch.map((product: any) => ({
        ...product,
      }));

      setSelectedProducts(products);
    }
  }, [productWatch, data, id]);

  const mutation = useEditTransfer();
  const onSubmit = async (purchaseData: any) => {
    if (selectedProducts.length >= 1) {
      const payload = {
        purchaseData: {
          ...purchaseData,
        },
        selectedProducts,
        purchase_id: id,
      };

      //@ts-ignore
      mutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Warehouse Transfer edited successfully");
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

  const orderDiscountWatch = watch("order_discount");
  const shippingWatch = watch("shipping");

  const [totalProduct, setTotalProduct] = useState({
    quantity: 0,
    sub_total: 0,
    order_discount: orderDiscountWatch ?? 0,
    order_tax: 0,
    shipping: shippingWatch ?? 0,
    grand_total: 0,
  });

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
  }, [watchOrderTax, taxData, totalProduct.grand_total]);

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
    }
  }, [totalProduct.quantity]);

  useEffect(() => {
    console.log("Calculating grand total...");
    const total =
      totalProduct.sub_total -
      parseInt(totalProduct.order_discount) +
      totalProduct.order_tax +
      parseInt(totalProduct.shipping);
    setTotalProduct((prev) => ({
      ...prev,
      grand_total: total,
    }));
    console.log("Grand Total:", total);
  }, [
    totalProduct.order_discount,
    totalProduct.order_tax,
    totalProduct.shipping,
    totalProduct.sub_total,
  ]);

  useEffect(() => {
    console.log("Total Product State:", totalProduct);
  }, [totalProduct]);

  return (
    <>
      <LoadingOverlay
        isVisible={mutation.isPending || mutation.isSuccess || isLoading}
      />
      <FormBuilder
        isFormReset={!isSubmitSuccessful && !isDirty}
        isConfirmationModalRequired
        data={editTransferForm[formStep]}
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
                    {selectedProducts.length} (
                    {totalProduct.quantity === 0 ? 0 : totalProduct.quantity})
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

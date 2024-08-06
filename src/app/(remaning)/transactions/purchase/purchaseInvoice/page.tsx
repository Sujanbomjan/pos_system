"use client";
import AsyncSelectComponent, {
  ColourOption,
} from "@/components/AsyncSelect/AsyncSelect";
import CustomModal from "@/components/modals/page";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import PurchaseTable from "@/features/transactions/purchase/PurchaseTable/PurchaseTable";
import {
  formData,
  purchaseInvoice,
} from "@/features/transactions/purchase/tableData";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBarcode } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { Button } from "rizzui";

interface TableData {
  code: string;
  desc: string;
  batch_no: string;
  each: string;
  rate: string;
  amount: string;
  mrp: string;
  vat: string;
  net_amt: string;
  remarks: string;
  sno: string;
}
interface TableData {
  [key: string]: string;
}

const Page = () => {
  const [modal, setModal] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formStepModal, setFormStepModal] = useState(0);
  const [formDataArray, setFormDataArray] = useState<ColourOption[]>([]);

  const {
    handleSubmit: handleSubmitMain,
    formState: { errors: errorsMain },
    control: controlMain,
    register: registerMain,
    reset: resetMain,
    getValues: getValuesMain,
  } = useForm({
    defaultValues: getDefaultValues(purchaseInvoice[formStep]),
    resolver: yupResolver(schemaGenerator(purchaseInvoice[formStep])),
  });

  const {
    handleSubmit: handleSubmitModal,
    formState: { errors: errorsModal },
    control: controlModal,
    register: registerModal,
    reset: resetModal,
    getValues: getValuesModal,
  } = useForm({
    defaultValues: getDefaultValues(formData[formStepModal]),
    resolver: yupResolver(schemaGenerator(formData[formStepModal])),
  });

  const isFinalStepInvoice = formStep + 1 === purchaseInvoice.length;
  const isFinalStepFormData = formStepModal + 1 === formData.length;

  const onSubmitInvoice = (data: any) => {
    console.log("mec aled");
    if (!isFinalStepInvoice) {
      setFormStep((prev) => prev + 1);
      return;
    }
    console.log(data);
  };

  const onSubmitFormData = (data: any) => {
    if (!isFinalStepFormData) {
      setFormStepModal((prev) => prev + 1);
    } else {
      setFormDataArray([...formDataArray, data]);
      setModal(false);
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <FormBuilder
        size="sm"
        data={purchaseInvoice[formStep]}
        onSubmit={onSubmitInvoice}
        isFinalStep={isFinalStepInvoice}
        handleSubmit={handleSubmitMain}
        register={registerMain}
        errors={errorsMain}
        control={controlMain}
        reset={resetMain}
        formStep={formStep}
        setFormStep={setFormStep}
        getValues={getValuesMain}
      />

      {/* add product button */}
      <div className="flex flex-row gap-4 !w-full mb-6 items-center justify-center">
        <FaBarcode size={22} />
        <AsyncSelectComponent
          setValue={setFormDataArray}
        ></AsyncSelectComponent>
        <Button className="w-fit" onClick={openModal}>
          <IoMdAdd />
        </Button>
      </div>

      {/* <PurchaseTable
        tableData={formDataArray}
        setTableData={setFormDataArray}
      /> */}

      <CustomModal
        isOpen={modal}
        onClose={closeModal}
        title="Add Product"
        content={
          <FormBuilder
            size="sm"
            isFinalStep={isFinalStepInvoice}
            onSubmit={onSubmitFormData}
            data={formData[formStepModal]}
            handleSubmit={handleSubmitModal}
            register={registerModal}
            errors={errorsModal}
            control={controlModal}
            reset={resetModal}
            formStep={formStepModal}
            setFormStep={setFormStepModal}
            getValues={getValuesModal}
          />
        }
      />
    </>
  );
};

export default Page;

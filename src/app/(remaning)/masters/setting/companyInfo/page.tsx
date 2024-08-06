"use client";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import formData from "@/features/masters/setting/companyInfo/formData";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const pageHeader = {
  title: "Company Info",
  breadcrumb: [
    {
      href: routes.masters.setting.companyInfo,
      name: "Master",
    },
    {
      href: routes.masters.setting.companyInfo,
      name: "Setting",
    },
    {
      name: "Company Info",
    },
  ],
};

const Page = () => {
  const [formStep, setFormStep] = useState(0);

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
    getValues,
  } = useForm({
    defaultValues: getDefaultValues(formData[formStep]),
    resolver: yupResolver(schemaGenerator(formData[formStep])),
  });

  const isFinalStep = formStep + 1 === formData.length;

  const onSubmit = (data: any) => {
    if (!isFinalStep) {
      setFormStep((prev) => ++prev);
      return;
    }
  };

  return (
    <>
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    <FormBuilder
      data={formData[formStep]}
      {...{
        handleSubmit,
        isFinalStep,
        register,
        errors,
        onSubmit,
        control,
        reset,
        formStep,
        setFormStep,
        getValues,
      }}
    />
    </>
  );
};

export default Page;

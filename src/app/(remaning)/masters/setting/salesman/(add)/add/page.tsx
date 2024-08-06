"use client";
import formData from "@/features/masters/setting/salesman/formData";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
    console.log(data);
  };

  return (
    <>
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

"use client";
import FormBuilder from "@/features/FormBuilder/FormBuilder";
import getDefaultValues from "@/features/getDefaultValues";
import schemaGenerator from "@/features/schemaGenerator/schemaGenerator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import {
  tableData,
  columns,
  filterFormData,
} from "@/features/reports/salesReport/channelDistribution/tableData";

const pageHeader = {
  title: "Vat Sales Report",
  breadcrumb: [
    {
      href: "/",
      name: "Report",
    },
    {
      name: "Tax Report",
    },
    {
      name: "Vat Sales Report",
    },
  ],
};

const Page = () => {
  const [formStep, setFormStep] = useState(0);
  const [stage, setStage] = useState(1);

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
    getValues,
  } = useForm({
    defaultValues: getDefaultValues(filterFormData[formStep]),
    resolver: yupResolver(schemaGenerator(filterFormData[formStep])),
  });

  const isFinalStep = formStep + 1 === filterFormData.length;

  const onSubmit = (data: any) => {
    if (!isFinalStep) {
      setFormStep((prev) => ++prev);
    } else {
      console.log("submitted data", data);
      setStage(2);
    }
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
      </div>
      {stage === 1 && (
        <FormBuilder
          data={filterFormData[formStep]}
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
      )}
      {stage === 2 && (
        <TableBuilder
          startCountOfPage={0}
          endCountOfPage={0}
          tableData={tableData}
          tableTitle={""}
          columns={columns}
          uniqueKey={""}
          selectedRowId={[]}
          setSelectedRowId={"DATE"}
          totalData={0}
        />
      )}
    </>
  );
};

export default Page;

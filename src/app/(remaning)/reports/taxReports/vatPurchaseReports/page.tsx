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
} from "@/features/reports/salesReport/netSales/tableData";

const pageHeader = {
  title: "VAT Purchase Register Report",
  breadcrumb: [
    {
      href: "/",
      name: "Reports",
    },
    {
      name: "Tax Report",
    },
    {
      name: "VAT Purchase Report",
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
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
        <div className="my-6">
          <TableBuilder
            columns={columns}
            tableData={tableData}
            uniqueKey="ProductCode"
            startCountOfPage={0}
            endCountOfPage={0}
            totalData={0}
            tableTitle={""}
            selectedRowId={[]}
            setSelectedRowId={undefined}
          />
        </div>
      )}
    </>
  );
};

export default Page;

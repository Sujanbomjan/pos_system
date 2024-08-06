"use client";
import TabContainer from "@/components/TabContainer/TabContainer";
import React, { useState } from "react";
import { routes } from "@/config/routes";
import { Select, Input, CheckboxGroup, Checkbox, Button } from "rizzui";
import PageHeader from "@/components/PageHeader/page-header";

const pageHeader = {
  title: "Edit",
  breadcrumb: [
    {
      href: routes.productMaster,
      name: "Dashboard",
    },
    {
      name: "Edit",
    },
  ],
};
const TabItems = [
  {
    path: routes.masters.setting.routeMaster.routeMasterEdit,
    name: "General Info",
  },
];
const options = [
  { label: "Apple 🍎", value: "apple" },
  { label: "Banana 🍌", value: "banana" },
  { label: "Cherry 🍒", value: "cherry" },
];
const Page = () => {
  const [value, setValue] = useState(null);
  const [values, setValues] = useState(["apple"]);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div>
        <TabContainer tabItem={TabItems} />
      </div>
      <div className="flex flex-row items-center gap-3 justify-center mb-[100px]">
        <Select
          className="[&>label>span]:font-medium !flex flex-1 flex-col"
          label="Status"
          options={options}
          value={value}
          onChange={setValue}
        />
        <Input className="flex flex-1" type="text" label="Name" />
        <Button className="mt-[25px]">Edit</Button>
      </div>
      <CheckboxGroup
        values={values}
        setValues={setValues}
        className="grid grid-cols-4 gap-6"
      >
        <Checkbox label="Sunday" value="sunday" />
        <Checkbox label="Monday" value="monday" />
        <Checkbox label="Tuesday" value="tuesday" />
        <Checkbox label="Wednesday" value="Wednesday" />

        <Checkbox label="Thrusday" value="Thrusday" />
        <Checkbox label="Friday" value="Friday" />
        <Checkbox label="Saturday" value="Saturday" />
      </CheckboxGroup>
    </>
  );
};

export default Page;

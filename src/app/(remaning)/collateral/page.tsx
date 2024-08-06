"use client";
import { useState } from "react";
import { Button, FileInput, Select } from "rizzui";

const CollateralPage = () => {
  const options = [
    { label: "Real State", value: "real-state" },
    { label: "Vechile", value: "vechile" },
    { label: "Investment", value: "investment" },
    { label: "Vechile", value: "vechile" },
    { label: "Jewelery", value: "jewelery" },
  ];

  const [value, setValue] = useState(null);
  return (
    <div>
      <h1>Colletral Assets</h1>

      <div className="mt-10 space-y-10">
        <Select
          label="Select Assets Type"
          options={options}
          value={value}
          onChange={setValue}
        />
        <FileInput label="Assets" />

        <FileInput label="Front-side Citizenship" />
        <FileInput label="Back-side Citizenship" />

        <Button>Submit Collateral</Button>
      </div>
    </div>
  );
};

export default CollateralPage;

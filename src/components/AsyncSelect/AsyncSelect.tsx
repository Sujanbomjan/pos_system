import { SetStateAction } from "jotai";
import { Dispatch, useRef } from "react";
import AsyncSelect from "react-select/async";
import { v4 as uuidv4 } from "uuid";

export interface ColourOption {
  readonly label: string;
  readonly description: string;
  readonly batchNo: string;
  readonly each: number;
  readonly rate: number;
  readonly remarks: string;
  case: string;
  expDate: string;
}

const colourOptions: readonly ColourOption[] = [
  {
    label: "F3343",
    description: "lorem",
    batchNo: "12",
    each: 1,
    rate: 100,
    remarks: "remarks",
    case: "dsfds",
    expDate: "Mar 2024",
  },
  {
    label: "D3343",
    description: "lorem",
    batchNo: "12",
    each: 1,
    rate: 100,
    remarks: "remarks",
    case: "dsfds",
    expDate: "Mar 2024",
  },
  {
    label: "T3343",
    description: "lorem",
    batchNo: "12",
    each: 1,
    rate: 100,
    remarks: "remarks",
    case: "dsfds",
    expDate: "Mar 2024",
  },
];

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string) =>
  new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

const AsyncSelectComponent = ({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<any[]>>;
}) => {
  const ref = useRef() as any;

  const handleChange = (value: any, action: any) => {
    setValue((prev) => [...prev, { ...value, id: uuidv4() }]);
    action.clearValue();
    ref.current.focus();
  };

  return (
    <AsyncSelect
      styles={{
        control: (baseStyles, _) => ({
          ...baseStyles,
          minWidth: 400,
        }),
      }}
      cacheOptions
      defaultOptions
      ref={ref}
      loadOptions={promiseOptions}
      placeholder="Please add products to order list"
      onChange={(value, action) => handleChange(value, action)}
      noOptionsMessage={({ inputValue }) =>
        `Product Code "${inputValue}" doesn't exist`
      }
    />
  );
};

export default AsyncSelectComponent;

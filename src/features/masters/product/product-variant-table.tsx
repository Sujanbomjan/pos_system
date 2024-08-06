import useFetchWarehouse from "@/api/hooks/master/setting/warehouse/useFectchWarehouse";
import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
} from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreatableSelect from "react-select/creatable";

const header = [
  { label: "", id: 13 },
  { label: "S.N", id: 0 },
  { label: "Name", id: 1 },
  { label: "Warehouse Name", id: 3 },
  { label: "Price", id: 2 },
];

const TableRow = ({
  item,
  sn,
  handleRowDelete,
  setTableData,
}: {
  item: any;
  sn: number;
  handleRowDelete: (id: string) => void;
  setTableData: Dispatch<SetStateAction<any[]>>;
}) => {
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTableData((prev: any) => {
      return prev.map((tableItem: any) =>
        item.id === tableItem.id
          ? { ...tableItem, price_addition: e.target.value }
          : tableItem
      );
    });
  };

  return (
    <tr key={item.label} className="relative">
      <td className="px-6 py-0 text-sm">
        <RiDeleteBin6Line
          className="text-red-500 cursor-pointer"
          onClick={() => handleRowDelete(item.id)}
        />
      </td>
      <td className="px-6 py-0 text-sm">{sn}</td>
      <td className="px-6 py-0 text-sm">{item.name}</td>
      <td className="px-6 py-0 text-sm">{item.warehouse_name}</td>
      <td className="px-6 py-0 text-sm">
        <input
          type="text"
          name=""
          id=""
          className="border-gray-100 rounded-sm !py-1 ring-gray-300 border-none outline-none ring-1 focus:ring-primary bg-transparent"
          defaultValue={item.price_addition}
          onChange={handlePriceChange}
        />
      </td>
    </tr>
  );
};

const ProductVariantTable = ({
  tableData,
  setTableData,
}: {
  tableData: any;
  setTableData: Dispatch<SetStateAction<any[]>>;
}) => {
  const { data: warehouseData } = useFetchWarehouse();

  const handleRowDelete = (id: string) => {
    setTableData((prev) => prev.filter((item) => item.id !== id));
  };

  const components = {
    DropdownIndicator: null,
  };

  const createOption = (label: string) => {
    let maxId = tableData.reduce(
      (max: number, item: any) => (item.id > max ? item.id : max),
      -1
    );
    console.log("warehouse", warehouseData);
    return (
      warehouseData?.data[0].data?.map(({ id: warehouse_id, name }) => {
        return {
          id: ++maxId,
          warehouse_id: warehouse_id.toString(),
          price_addition: "10",
          name: label,
          warehouse_name: name,
        };
      }) || [
        {
          id: "",
          warehouse_id: "",
          price_addition: "",
          name: "",
          warehouse_name: "",
        },
      ]
    );
  };

  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState<any[]>([]);

  const createLabelValue = (label: string) => ({
    label,
    value: label,
  });

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createLabelValue(inputValue)]);
        setTableData((prev) => [...prev, ...createOption(inputValue)]);

        setInputValue("");
        event.preventDefault();
    }
  };
  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
    }),
    input: (provided: any) => ({
      ...provided,
      "input:focus": {
        boxShadow: "none",
      },
      color: "inherit",
    }),
  };

  return (
    <div>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => {
          if (newValue.length === 0) {
            setTableData([]);
          }
          setValue(newValue as any);
        }}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a variant and press enter"
        className="mt-3  focus:[box-shadow:none] bg-inherit"
        value={value}
        styles={customStyles}
      />

      <div
        className={`overflow-x-auto ${
          tableData.length === 0 ? "hidden" : "flex"
        }`}
      >
        <table className="min-w-full divide-y divide-gray-200 font-[sans-serif]">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              {header.map(({ id, label }) => (
                <th
                  key={id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200 whitespace-nowrap">
            {tableData.map((item: any, index: number) => (
              <TableRow
                item={item}
                sn={index + 1}
                key={index}
                handleRowDelete={handleRowDelete}
                setTableData={setTableData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductVariantTable;

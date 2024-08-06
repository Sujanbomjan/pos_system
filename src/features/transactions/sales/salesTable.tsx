import { Dispatch, SetStateAction, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
const header = [
  { label: "", id: 13 },
  { label: "S.N", id: 0 },
  { label: "Code", id: 1 },
  { label: "Description", id: 2 },
  { label: "BatchNo", id: 3 },
  { label: "Exp Date", id: 4 },
  { label: "Case", id: 5 },
  { label: "Rate", id: 7 },
  { label: "Amount", id: 8 },
  { label: "Dis%", id: 13 },
  { label: "Dis Amt", id: 14 },
  { label: "MRP", id: 9 },
  { label: "VAT", id: 10 },
  { label: "Net Amt", id: 11 },
  { label: "Remarks", id: 12 },
];

const TableRow = ({
  item,
  sn,
  handleRowDelete,
}: {
  item: any;
  sn: number;
  handleRowDelete: (id: string) => void;
}) => {
  const [caseValue, setCaseValue] = useState<number>(1);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const amount = item.rate * caseValue;
  const discountAmount = (discountPercentage * amount) / 100;
  const mrp = amount - discountAmount;
  const vatAmount = 0.13 * mrp;
  const netAmount = mrp + vatAmount;

  return (
    <tr key={item.label} className="relative">
      <td className="px-6 py-2 text-sm">
        <RiDeleteBin6Line
          className="text-red-500 cursor-pointer"
          onClick={() => handleRowDelete(item.id)}
        />
      </td>
      <td className="px-6 py-2 text-sm">{sn}</td>
      <td className="px-6 py-2 text-sm">{item.label}</td>
      <td className="px-6 py-2 text-sm">
        <input
          type="text"
          name=""
          id=""
          className="border-gray-100 rounded-sm !py-1 ring-gray-300 border-none outline-none ring-1 focus:ring-primary"
          defaultValue={item.description}
        />
      </td>
      <td className="px-6 py-2 text-sm">{item.batchNo}</td>
      <td className="px-6 py-2 text-sm">{item.expDate}</td>
      <td className="px-6 py-2 text-sm">
        <input
          type="number"
          name="case"
          id="case"
          min={1}
          value={caseValue}
          onChange={(e) => setCaseValue(parseInt(e.target.value))}
          className="border-gray-100 rounded-sm !py-1 ring-gray-300 border-none outline-none ring-1 focus:ring-primary w-20"
        />
      </td>
      <td className="px-6 py-2 text-sm">{item.rate}</td>
      <td className="px-6 py-2 text-sm">{amount}</td>
      <td className="px-6 py-2 text-sm">
        <input
          type="number"
          name="disPercent"
          id="disPercent"
          value={discountPercentage}
          min={0}
          onChange={(e) => setDiscountPercentage(parseFloat(e.target.value))}
          className="border-gray-100 rounded-sm !py-1 ring-gray-300 border-none outline-none ring-1 focus:ring-primary w-20"
        />
      </td>
      <td className="px-6 py-2 text-sm">{discountAmount.toFixed(2)}</td>
      <td className="px-6 py-2 text-sm">{mrp.toFixed(2)}</td>
      <td className="px-6 py-2 text-sm">{vatAmount.toFixed(2)}</td>
      <td className="px-6 py-2 text-sm">{netAmount.toFixed(2)}</td>
      <td className="px-6 py-2 text-sm">
        <input
          type="text"
          name=""
          id=""
          className="border-gray-100 rounded-sm !py-1 ring-gray-300 border-none outline-none ring-1 focus:ring-primary"
        />
      </td>
    </tr>
  );
};

const PurchaseTable = ({
  tableData,
  setTableData,
}: {
  tableData: any;
  setTableData: Dispatch<SetStateAction<any[]>>;
}) => {
  const handleRowDelete = (id: string) => {
    setTableData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="overflow-x-auto">
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;

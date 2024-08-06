import NumberWithCommas from "@/components/NumberCommas/NumberCommas";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Input } from "rizzui";

const header = [
  { label: "" },
  { label: "Product(Code-Name)" },
  { label: "Net Unit Cost" },
  { label: "Quantity" },
  { label: "Return Quantity" },
  { label: "Discount" },
  { label: "Subtotal" },
];

const TableRow = ({
  item,
  onRowDelete,
  onQuantityChange,
}: {
  item: any;
  onRowDelete: (id: any) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
}) => {
  const [localQuantity, setLocalQuantity] = useState(
    item.received_quantity || 0
  );
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseFloat(e.target.value) || 0;
    if (newQuantity > parseInt(item.quantity)) {
      toast.error("Return Quantity cannot be greater than Received Quantity");
      return;
    }
    setLocalQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  return (
    <tr key={item.id} className="p-2">
      <td className="px-6 py-0 text-sm">
        <RiDeleteBin6Line
          className="text-red-500 cursor-pointer"
          onClick={() => onRowDelete(item.id)}
        />
      </td>
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {item.product_code} - {item.product_name}
      </td>
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {" "}
        {parseFloat(item.net_unit_price).toFixed(2)}
      </td>
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {parseFloat(item.quantity).toFixed(2)}
      </td>
      {/* <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {parseFloat(item.received_quantity).toFixed(2)}
      </td> */}
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <Input
          typeof="number"
          value={localQuantity.toString()}
          onChange={handleQuantityChange}
          min={0}
          type="number"
        />
      </td>
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {parseFloat(item.item_discount).toFixed(2)}
      </td>
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {
          <NumberWithCommas
            value={
              Number(item.received_quantity || "") * Number(item.net_unit_price)
            }
          />
        }
      </td>
    </tr>
  );
};

const ReturnSalesTable = ({
  tableData,
  setTableData,
}: {
  tableData: any[];
  setTableData: Dispatch<SetStateAction<any[]>>;
}) => {
  const handleRowDelete = (id: string) => {
    setTableData((prevData) => prevData.filter((item) => item.id !== id));
  };
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
            ...item,
            received_quantity: isNaN(newQuantity) ? 0 : newQuantity,
            subtotal: newQuantity * parseInt(item.net_unit_price),
          }
          : item
      )
    );
  };

  const totalItems = tableData.length;

  const totalProductTax = tableData.reduce(
    (acc, item) => acc + (parseFloat(item.tax) || 0),
    0
  );
  const totalSurcharges = tableData.reduce(
    (acc, item) => acc + (parseFloat(item.surcharge) || 0),
    0
  );
  const totalOrderTax = tableData.reduce(
    (acc, item) => acc + (parseFloat(item.order_tax) || 0),
    0
  );

  const totalReturnAmount = tableData.reduce((acc, item) => {
    const receivedQuantity = Number(item.received_quantity) || 0;
    const netUnitCost = Number(item.net_unit_price) || 0;
    const orderTax = Number(item.order_tax) || 0;
    const surcharge = Number(item.surcharge) || 0;

    if (receivedQuantity === 0) {
      return acc;
    }

    return acc + (receivedQuantity * netUnitCost + orderTax - surcharge);
  }, 0);
  // (
  //   (acc, item) =>
  //     acc +
  //     item.received_quantity * item.net_unit_price -
  //     (item.received_quantity * item.net_unit_price * item.item_discount) /
  //       100 +
  //     (item.received_quantity * item.net_unit_price * item.tax) / 100
  // );

  const calculateTax = (tax: any, amount: number) => {
    let taxAmount;
    if (!tax) {
      return 0;
    }
    if (tax.type === "PERCENTAGE") {
      taxAmount = (tax?.value * amount) / 100;
    }
    if (tax.type === "FLAT") {
      taxAmount = tax.value;
    }
    return Number(taxAmount);
  };

  const totalTax = calculateTax(tableData[0]?.order_tax, totalReturnAmount);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 font-[sans-serif]">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            {header.map(({ label }: { label: string }) => (
              <th
                key={label}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 whitespace-nowrap">
          {tableData.map((item: any) => (
            <TableRow
              item={item}
              key={item.id}
              onRowDelete={handleRowDelete}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </tbody>
        <tfoot className="bg-gray-100 whitespace-nowrap">
          <tr>
            <td colSpan={2}></td>
            <td className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items ({totalItems})
            </td>
            <td className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              SubTotal: <NumberWithCommas value={totalReturnAmount} />
            </td>
            <td className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Tax: <NumberWithCommas value={totalTax} />
            </td>
            <td className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Surcharges:{" "}
              {isNaN(totalSurcharges) ? (
                "0.00"
              ) : (
                <NumberWithCommas value={totalSurcharges} />
              )}
            </td>
            <td className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Return Total: <NumberWithCommas value={(totalReturnAmount + totalTax).toFixed(2)} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ReturnSalesTable;

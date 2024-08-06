import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Input } from "rizzui";

const header = [
  { label: "" },
  { label: "Product(Code-Name)" },
  { label: "Cost Price" },
  { label: "Quantity" },
  { label: "Subtotal" },
];

const TableRow = ({
  item,
  onQuantityChange,
  onHandleRowDelete,
  onSubTotalChange,
}: {
  item: any;
  onQuantityChange: (id: any, value: any) => void;
  onSubTotalChange: (id: any, value: any) => void;
  onHandleRowDelete: (id: any) => void;
}) => {
  const [costItems, setCostItems] = useState({
    cost: item.cost || 0,
    quantity: item.quantity || 1,
    discount: item.item_discount || 0,
    sub_total: item.sub_total || 0,
  });

  useEffect(() => {
    const { cost, quantity, discount } = costItems;
    const amount = cost * quantity;
    const discountAmount = (amount * discount) / 100;
    const subtotal = amount - discountAmount;

    onSubTotalChange(item.id, subtotal);
    setCostItems((prev) => ({
      ...prev,
      sub_total: subtotal,
    }));
  }, [costItems.cost, costItems.quantity]);
  const [localQuantity, setLocalQuantity] = useState(
    item.quantity ? parseFloat(item.quantity) : 0
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseFloat(e.target.value);
    // if (newQuantity > parseInt(item.quantity)) {
    //   toast.error("Return Quantity cannot be greater than Received Quantity");
    //   return;
    // }
    const validQuantity = isNaN(newQuantity) ? 0 : newQuantity;
    setLocalQuantity(validQuantity);
    onQuantityChange(item.id, validQuantity);
  };

  return (
    <tr key={item.label} className="p-2">
      <td className="px-6 py-0 text-sm">
        <RiDeleteBin6Line
          className="text-red-500 cursor-pointer"
          onClick={() => onHandleRowDelete(item.id)}
        />
      </td>
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {item.code} - {item.name}
      </td>
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {parseFloat(costItems.cost).toFixed(2)}
      </td>
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <Input
            value={localQuantity.toString()}
            onChange={handleQuantityChange}
            min={0}
            type="number"
          />
        </td>
      </td>
      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {costItems.sub_total ? costItems.sub_total.toFixed(2) : 0}
      </td>
    </tr>
  );
};

interface TotalProductProps {
  quantity: number;
  sub_total: number;
  order_discount: number;
  order_tax: number;
  shipping: number;
  grand_total: number;
}

const PurchaseTable = ({
  tableData,
  setTableData,
  productWatch,
  setValue,
  setTotalProduct,
}: {
  tableData: any;
  setTableData: Dispatch<SetStateAction<any[]>>;
  productWatch: any;
  setValue: UseFormSetValue<any>;
  setTotalProduct: Dispatch<SetStateAction<TotalProductProps>>;
}) => {
  const handleRowDelete = (id: string) => {
    const updatedProductWatch = productWatch.filter(
      (item: any) => item.value !== id.toString()
    );
    setValue("product", updatedProductWatch);
  };

  const handleQuantityChange = (productId: any, newQuantity: any) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleSubTotalChange = (productId: any, newTotal: any) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === productId ? { ...item, sub_total: newTotal } : item
      )
    );
  };

  const totalQuantity = tableData.reduce(
    (acc: any, product: any) => acc + parseInt(product.quantity ?? 0),
    0
  );

  const totalDiscount = tableData.reduce(
    (acc: any, product: any) => acc + parseInt(product.discount ?? 0),
    0
  );

  const totalPrice = tableData.reduce(
    (acc: any, product: any) => acc + parseFloat(product.sub_total ?? 0),
    0
  );

  useEffect(() => {
    if (totalPrice) {
      setTotalProduct((prev) => ({
        ...prev,
        sub_total: totalPrice,
      }));
    }
    if (totalQuantity) {
      setTotalProduct((prev) => ({
        ...prev,
        quantity: totalQuantity,
      }));
    }
  }, [totalPrice, totalQuantity]);

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
        <tbody className=" divide-y divide-gray-200 whitespace-nowrap">
          {tableData.map((item: any, index: number) => (
            <TableRow
              item={item}
              key={item.id}
              onQuantityChange={handleQuantityChange}
              onHandleRowDelete={handleRowDelete}
              onSubTotalChange={handleSubTotalChange}
            />
          ))}
        </tbody>
        <tfoot className="bg-gray-100 whitespace-nowrap">
          <tr className="p-2">
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {}
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {}
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {totalQuantity.toFixed(2) ?? 0}
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {totalPrice.toFixed(2) ?? 0}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PurchaseTable;

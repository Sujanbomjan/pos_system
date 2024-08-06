import useSalesById from "@/api/hooks/transaction/sales/useSalesById";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import { routes } from "@/config/routes";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { IoPrint } from "react-icons/io5";
//@ts-ignore
import Html2Pdf from "js-html2pdf";
import { useRouter } from "next-nprogress-bar";
import { ReactInstance, useRef } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { MdKeyboardDoubleArrowLeft, MdOutlineMail } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { Button } from "rizzui";
import DataCodes from "./DataCodes";
import NumberWithCommas from "@/components/NumberCommas/NumberCommas";

export default NiceModal.create(
  ({
    activeRowId,
    title,
    returnId,
  }: {
    activeRowId: string;
    returnId: number;
    title: string;
  }) => {
    const router = useRouter();
    const modal = useModal();

    const data = useSalesById({ id: activeRowId });

    const handleCloseModal = () => {
      modal.hide();
    };

    const refData = {
      Date: new Date(data.data?.data.created_at || "").toLocaleString(),
      Reference: data.data?.data.reference_no,
      "Return Reference": data.data?.data.return_id,
      "Sale Status": data.data?.data.sale_status,
      "Payment Status": data.data?.data.payment_status,
    };

    const returnedItems = data.data?.data.return?.return_items;

    const componentRef = useRef<ReactInstance>(null);

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: `jhattai-rms-sales-${activeRowId}`,
    });

    const handleReturn = () => {
      modal.hide();
      router.push(routes.sales.salesReturn(activeRowId));
    };

    const handleDownloadPDF = useReactToPrint({
      content: () => componentRef.current,
      print: async (printIframe) => {
        const document = printIframe.contentDocument;
        if (document) {
          const html = document.getElementsByClassName("App")[0];
          const options = {
            margin: 10,
            filename: `jhattai-rms-sales-${activeRowId}.pdf`,
          };
          const exporter = new Html2Pdf(html, options);
          await exporter.getPdf(options);
        }
      },
    });

    const marginTop = "10px";
    const marginRight = "30px";
    const marginBottom = "10px";
    const marginLeft = "30px";
    const getPageMargins = () => {
      return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
    };

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

    const totalAmount =
      Number(data.data?.data.total || "") -
      Number(data.data?.data.return?.total || "");

    const discount = Number(data.data?.data.order_discount) ?? 0;
    const shipping = Number(data.data?.data.shipping) ?? 0;

    const tax = calculateTax(data.data?.data.tax, totalAmount - discount);

    return (
      <ModalWrapper
        containerClassName="max-w-5xl relative"
        key={activeRowId}
        isOpen={modal.visible}
        onClose={handleCloseModal}
        title={title}
        isLoading={data.isLoading}
      >
        <>
          <div className="App" ref={componentRef as any}>
            <div>
              <style>{getPageMargins()}</style>
              <div className="flex flex-row items-center justify-between border-[1px] px-4 py-2 bg-gray-50">
                <div>
                  {Object.entries(refData).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {value as string}
                    </div>
                  ))}
                </div>
                <DataCodes
                  barcodeData={data.data?.data.reference_no || ""}
                  qrcodeData={data.data?.data.reference_no || ""}
                />
              </div>
            </div>

            {/* to and from details */}
            <div className="flex flex-row justify-between mt-6">
              <div className="flex-1">
                <p className="mb-2">From:</p>
                <strong className="text-lg">
                  {data.data?.data.biller.name}
                </strong>
                <p className="mb-2">{data.data?.data.biller.address}</p>
                <p>Tel: {data.data?.data.biller.phone}</p>
                <p>Email: {data.data?.data.biller.email}</p>
              </div>
              <div className="flex-1">
                <p className="mb-2">To:</p>
                <strong className="text-lg">
                  {data.data?.data.customer.name}
                </strong>
                <p className="mb-2">{data.data?.data.customer.address}</p>
                <p>Tel: {data.data?.data.customer.phone}</p>
                <p>Email: {data.data?.data.customer.email}</p>
              </div>
            </div>

            {/* table */}

            <div className="mt-6">
              <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-left text-xs text-gray-500 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.data?.data.sale_items.map(
                    (
                      {
                        id,
                        quantity,
                        subtotal,
                        product_name,
                        unit_price,
                        net_unit_price,
                      },
                      index
                    ) => (
                      <tr className="hover:bg-gray-100" key={id}>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                          {index + 1}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                          {product_name}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                          {Number(quantity).toFixed(2)} PC
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                          {Number(unit_price).toFixed(2)}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                          {Number(subtotal).toFixed(2)}
                        </td>
                      </tr>
                    )
                  )}

                  <tr>
                    <td
                      colSpan={4}
                      align="right"
                      className="px-6 py-2 font-semibold whitespace-nowrap text-sm text-gray-500 border-r-[1px]"
                    >
                      Sale Total (NRS)
                    </td>
                    <td className="px-6 font-semibold py-2 whitespace-nowrap text-sm text-gray-500">
                      <NumberWithCommas
                        value={Number(data.data?.data.total || "").toFixed(2)}
                      />
                    </td>
                  </tr>
                  {/* for returned items */}
                  {returnedItems && (
                    <>
                      <tr>
                        <td
                          colSpan={6}
                          align="left"
                          className="px-6 py-2 font-semibold whitespace-nowrap bg-amber-50 text-sm text-gray-500 border-r-[1px]"
                        >
                          Returned Items
                        </td>
                      </tr>
                      {returnedItems.map(
                        (
                          {
                            id,
                            quantity,
                            subtotal,
                            product_name,
                            unit_price,
                            net_unit_price,
                          },
                          index
                        ) => (
                          <tr
                            className="hover:bg-amber-100 bg-amber-50"
                            key={id}
                          >
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                              {index + 1}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                              {product_name}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                              -{Number(quantity).toFixed(2)} PC
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                              {Number(unit_price).toFixed(2)}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                              -
                              {(Number(quantity) * Number(unit_price)).toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        )
                      )}
                      <tr>
                        <td
                          colSpan={4}
                          align="right"
                          className="px-6 py-2 font-semibold whitespace-nowrap text-sm text-gray-500 border-r-[1px]"
                        >
                          Total Return (NRS)
                        </td>
                        <td className="px-6 font-semibold py-2 whitespace-nowrap text-sm text-gray-500">
                          -
                          <NumberWithCommas
                            value={Number(
                              data.data?.data.return?.total || ""
                            ).toFixed(2)}
                          />
                        </td>
                      </tr>
                    </>
                  )}

                  <tr>
                    <td
                      colSpan={4}
                      align="right"
                      className="px-6 py-2 font-semibold whitespace-nowrap text-sm text-gray-500 border-r-[1px]"
                    >
                      Total Amount (NRS)
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 font-semibold">
                      <NumberWithCommas value={totalAmount.toFixed(2)} />
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      align="right"
                      className="px-6 py-2 font-semibold whitespace-nowrap text-sm text-gray-500 border-r-[1px]"
                    >
                      Tax (NRS)
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 font-semibold">
                      <NumberWithCommas value={tax.toFixed(2)} />
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan={4}
                      align="right"
                      className="px-6 py-2 font-semibold whitespace-nowrap text-sm text-gray-500 border-r-[1px]"
                    >
                      Discount (NRS)
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 font-semibold">
                      - <NumberWithCommas value={discount.toFixed(2)} />
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan={4}
                      align="right"
                      className="px-6 py-2 font-semibold whitespace-nowrap text-sm text-gray-500 border-r-[1px]"
                    >
                      Shipping (NRS)
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 font-semibold">
                      <NumberWithCommas value={shipping.toFixed(2)} />
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      align="right"
                      className="px-6 py-2 font-semibold whitespace-nowrap text-sm text-gray-500 border-r-[1px]"
                    >
                      Balance (NRS)
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 font-semibold">
                      <NumberWithCommas
                        value={(
                          totalAmount +
                          tax -
                          discount +
                          shipping
                        ).toFixed(2)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex-1 justify-end flex mt-4">
              <div className="border-[1px] bg-gray-100 w-fit flex flex-col p-3">
                <p> Created by: {data.data?.data.causer.name} </p>
                <p>
                  {" "}
                  Date:{" "}
                  {new Date(
                    data.data?.data.causer.created_at || ""
                  ).toLocaleString()}{" "}
                </p>
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className="flex flex-row justify-end gap-2 mt-6 absolute right-20 top-0">
            <Button className="inline-flex gap-1" size="sm">
              <MdOutlineMail />
              Email
            </Button>

            <Button
              onClick={handleDownloadPDF}
              size="sm"
              className="inline-flex gap-1"
            >
              <AiOutlineFilePdf />
              PDF
            </Button>
            {!data.data?.data.return_id && (
              <Button
                onClick={handleReturn}
                size="sm"
                className="inline-flex gap-1"
              >
                <MdKeyboardDoubleArrowLeft />
                Return
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="flex flex-row gap-1"
              onClick={handlePrint}
            >
              <IoPrint />
              Print
            </Button>
          </div>
        </>
      </ModalWrapper>
    );
  }
);

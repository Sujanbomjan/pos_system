import useDeleteProduct from "@/api/hooks/master/product/useDeleteProduct";
import useFetchProductById from "@/api/hooks/master/product/useFetchProductById";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import { routes } from "@/config/routes";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { IoPrint } from "react-icons/io5";
//@ts-ignore
import Html2Pdf from "js-html2pdf";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { ReactInstance, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete, MdOutlineMail } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { Button } from "rizzui";
import DataCodes from "./DataCodes";

export default NiceModal.create(
  ({ activeRowId, title }: { activeRowId: string; title: string }) => {
    const router = useRouter();
    const modal = useModal();

    // confirmation modal

    const [modalOpen, setModalOpen] = useState(false);

    const data = useFetchProductById(activeRowId);

    const handleCloseModal = () => {
      modal.hide();
    };

    const refData = {
      Type: data.data?.data?.type,
      Name: data.data?.data?.name,
      Code: data.data?.data?.code,
      Brand: data.data?.data?.brand?.name,
      Category: data.data?.data?.category?.name,
      Unit: data.data?.data?.unit?.name,
      Cost: Number(data.data?.data?.cost).toFixed(2),
      Price: Number(data.data?.data?.price).toFixed(2),
      ...(data.data?.data.tax && {
        "Tax Rate": `${data.data?.data?.tax?.title} (${
          data.data?.data?.tax?.type === "FLAT"
            ? `Rs ${data.data?.data?.tax?.value}`
            : `${data.data?.data?.tax?.value}%`
        })`,
      }),
      "Tax Method": "Exclusive",
      "Alert Quantity": Number(data.data?.data?.alert_quantity).toFixed(2),
    };

    const deleteMutation = useDeleteProduct();

    //final confirmation after clicked yes on modal
    const handleSubmitConfirmationConfirm = () => {
      deleteMutation.mutate(
        { id: activeRowId },
        {
          onSuccess: () => {
            toast.success(`item deleted successfully`);
            handleCloseModal();
          },
          onError: () => {
            toast.error(`Error while Deleting`);
          },
        }
      ),
        setModalOpen(false);
    };

    const handleSubmitConfirmationCancel = () => {
      setModalOpen(false);
    };

    const componentRef = useRef<ReactInstance>(null);

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: `jhattai-rms-product-${activeRowId}`,
    });

    const handleDownloadPDF = useReactToPrint({
      content: () => componentRef.current,
      print: async (printIframe) => {
        const document = printIframe.contentDocument;
        if (document) {
          const html = document.getElementsByClassName("App")[0];
          const options = {
            margin: 10,
            filename: `jhattai-rms-product-${activeRowId}.pdf`,
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

    return (
      <ModalWrapper
        containerClassName="max-w-5xl relative"
        key={activeRowId}
        isOpen={modal.visible}
        onClose={handleCloseModal}
        title={data.data?.data.name || ""}
        isLoading={data.isLoading || deleteMutation.isPending}
      >
        <>
          <ConfirmationModal
            isOpen={modalOpen}
            onClose={handleSubmitConfirmationCancel}
            handleAction={handleSubmitConfirmationConfirm}
          />

          <div className="App" ref={componentRef as any}>
            <div>
              <style>{getPageMargins()}</style>
              <div className="flex flex-row items-center justify-between px-4 py-2">
                <div>
                  <Image
                    alt="product-image"
                    className="object-contain"
                    src={data.data?.data.image || ""}
                    width={150}
                    height={100}
                  />
                </div>
                <DataCodes
                  barcodeData={data.data?.data.name || ""}
                  qrcodeData={data.data?.data.name || ""}
                />
              </div>
            </div>
            <div className="mt-6 mb-4">
              <strong className="text-lg">Product Details</strong>

              <div className="border-[1px] p-4 mt-4">
                {Object.entries(refData).map(([key, value]) => (
                  <div
                    key={key}
                    className="py-2 px-2 odd:bg-gray-100 flex flex-row justify-between"
                  >
                    <strong className="flex-1">{key}</strong>
                    <p className="flex-1">{value as string}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 mb-4">
              <strong className="text-lg">Warehouse Quantity</strong>
              <table className="min-w-full mt-2 divide-y divide-gray-200 border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-left text-xs text-gray-500 uppercase tracking-wider">
                      Warehouse Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Quantity (Racks)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Average Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.data?.data?.warehouse_products?.map(
                    (
                      { avg_cost, quantity, warehouse, warehouse_id },
                      index
                    ) => (
                      <tr className="hover:bg-gray-100" key={warehouse_id}>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                          {warehouse.name}
                        </td>

                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                          {Number(quantity).toFixed(2)} PC
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r-[1px]">
                          {Number(avg_cost).toFixed(2)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
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
            <Button
              size="sm"
              onClick={() => {
                router.push(routes.productMaster.edit(activeRowId));
                handleCloseModal();
              }}
              className="inline-flex gap-1"
            >
              <FaRegEdit />
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              className="inline-flex gap-1"
              onClick={() => setModalOpen(true)}
            >
              <MdOutlineDelete />
              Delete
            </Button>
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

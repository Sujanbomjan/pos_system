import Barcode from "react-barcode";
import QRCode from "react-qr-code";

const DataCodes = ({
  barcodeData,
  qrcodeData,
}: {
  barcodeData: string;
  qrcodeData: string;
}) => {
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <Barcode value={barcodeData} displayValue={false} />
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 100,
            width: "100%",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrcodeData}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </>
  );
};

export default DataCodes;

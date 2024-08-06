import Image from "next/image";

const LoadingOverlay = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <>
      {isVisible && (
        <div className="w-screen h-[500vh] bg-gray-700 bg-opacity-30 z-[100000] top-0 left-0 fixed">
          <div className="z-[100000] flex items-center justify-center w-screen h-screen fixed top-0 left-0">
            <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-accent-dark"></div>
            <Image
              alt="loader"
              src={require("../../../public/vercel.svg")}
              width={80}
              height={80}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;

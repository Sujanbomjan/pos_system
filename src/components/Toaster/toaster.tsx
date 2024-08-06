import { Toaster, toast } from "react-hot-toast";

const MyToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          padding: "20px",
          fontSize: "14px",
          fontWeight: "normal",
          whiteSpace: "pre-wrap", // Ensures multiline text is displayed correctly
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
        success: {
          iconTheme: {
            primary: "#45E71A",
            secondary: "#FFFAEE",
          },
        },
        error: {
          iconTheme: {
            primary: "#FF3E00",
            secondary: "#FFFAEE",
          },
        },
        loading: {
          iconTheme: {
            primary: "#1E5BF3",
            secondary: "#FFFAEE",
          },
        },
      }}
    />
  );
};

export default MyToaster;

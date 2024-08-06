import DashboardAnalytics from "@/features/dashboard";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  isAddressSame: false,
  permanentAddress: "",
  currentAddress: "",
  dob: "",
  employer: "",
  employerAddress: "",
  employerPhone: "",
  employerEmail: "",
  position: "",
};

export default function Dashboard() {
  return (
    <>
      <DashboardAnalytics />
    </>
  );
}

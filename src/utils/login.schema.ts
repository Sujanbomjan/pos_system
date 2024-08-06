import * as yup from "yup";

const loginSchema = yup.object().shape({
  mobile_no: yup.string().required("Please enter mobile number"),
  password: yup.string().required("Please enter the password"),
});

export default loginSchema;

import { IFormData, IFormItem, RowFormChildren } from "@/types/form";
import * as yup from "yup";

const emailValidation = yup
  .string()
  .matches(
    /^"?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*"?@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|edu)(\.[A-Za-z]{2})?\b$/,
    "Please enter a valid email"
  )
  .required("Email is required");

const phoneValidation = yup
  .string()
  .matches(
    /^(9(7|8)(0|1|2|7)[0-9]{7}|9(7|8)(4|6)[0-9]{7}|985[0-9]{7}|97(4|5)[0-9]{7}|9(88|6(1|2))[0-9]{7}|972[0-9]{7}|(01|02|03|04|05|06|07)[0-9]{7})$/,
    "Please enter a valid phone number"
  )
  .required("Phone number is required");

const ruleGenerator = (item: IFormItem) => {
  if (item.optional) {
    return null;
  }
  if (item.type == "file" || item.type === "single-image" || item.type === "multi-select") {
    return yup.array().min(1, "Please upload an image");
  }
  if (item.type === "fileInputType") {
    return yup.array().min(1, "Please upload an file");
  }
  if (item.type === "fileInput") {
    return yup.array().min(1, "Please upload an file");
  }
  if (item.type === "textarea") {
    return yup
      .string()
      .min(1, `Please enter ${item.label}`)
      .max(255, "Text cannot be more than 255 words");
  }
  if (item.name === "async-select") {
    return yup.string().required(`Please Select ${item.label}`);
  }
  if (item.name === "multi-select") {
    return yup.string().required(`Please Select ${item.label}`);
  }

  if (["radio", "checkbox"].includes(item.type)) {
    // return yup.boolean().required(`Please enter ${item.label}`);
    return null;
  }
  if (item.extraValidation === "email") {
    return emailValidation;
  }
  if (item.extraValidation === "phone") {
    return phoneValidation;
  }
  return yup.string().required(`Please enter ${item.label}`);
};

const schemaGenerator = (data: IFormData) => {
  const schema: any = {};
  {
    data.children.forEach((innerItem) => {
      if (innerItem.type === "title") {
        return null;
      }

      if (innerItem.type === "row") {
        (innerItem as RowFormChildren).children.forEach((rowChild) => {
          schema[rowChild.name as any] = ruleGenerator(rowChild);
        });
        return;
      }

      //if the filed is not inside the row type
      schema[innerItem.name as any] = ruleGenerator(innerItem);
    });
  }
  return yup.object().shape(schema);
};
export default schemaGenerator;

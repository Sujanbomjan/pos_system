import { IFormData, RowFormChildren } from "@/types/form";

const getDefaultValues = (data: IFormData) => {
  const defaultValues: any = {};

  {
    data.children.forEach((item) => {
      item.type === "row"
        ? (item as RowFormChildren).children.forEach((rowChild) => {
            defaultValues[rowChild.name] = [
              "file",
              "radio",
              "fileInput",
            ].includes(rowChild.type)
              ? null
              : "";
          })
        : (defaultValues[item.name] = ["file", "radio", "fileInput"].includes(
            item.type
          )
            ? null
            : "");
    });
  }

  return defaultValues;
};

export default getDefaultValues;

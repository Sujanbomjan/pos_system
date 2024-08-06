interface IFormData {
  title: string;
  children: Array<FormChildren<FormType>>;
}

type RowFormChildren = {
  type: "row";
  title: string;
  className?: string;
  children: IFormItem[];
};

type FormChildren<T extends FormType> = T extends "row"
  ? RowFormChildren
  : IFormItem;

interface IFormItem {
  type: FormType;
  title?: string;
  className?: string;
  name: string;
  folder?: string;
  extraValidation?: "email" | "phone";
  placeholder?: string;
  label: string;
  validation_regex?: string;
  dropdownItem?: {
    label: string;
    value: string;
  }[];
  checkboxItem?: {
    label: string;
    value: string;
  }[];
  radioItem?: {
    label: string;
    value: string;
  }[];
  multipleItem?: {
    label: string;
    value: string;
  }[];
  optional?: boolean;
}

type FormType =
  | "title"
  | "number"
  | "email"
  | "date"
  | "search"
  | "time"
  | "fileInput"
  | "fileInputType"
  | "fileStringUpload"
  | "text"
  | "tel"
  | "url"
  | "file"
  | "searchDropdown"
  | "quilleditor"
  | "week"
  | "month"
  | "password"
  | "row"
  | "textarea"
  | "dropdown"
  | "radio"
  | "multiple"
  | "single-image"
  | "checkbox"
  | "async-select"
  | "multi-select";

type FormInputType = { [key: string]: string | number | null | undefined };

export type { FormInputType, IFormData, IFormItem, RowFormChildren };

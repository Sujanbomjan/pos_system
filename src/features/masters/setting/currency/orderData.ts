import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";
const columns: IColumns[] = [
  { name: "Code", uid: "code" },
  { name: "Name", uid: "name" },
  { name: "Rate", uid: "rate" },
  { name: "Auto Update", uid: "auto_update", type: "boolean" },
  { name: "Symbol", uid: "symbol" },
  { name: "Created At", uid: "created_at", type: "date" },
  { name: "Updated At", uid: "updated_at", type: "date" },
  { name: "Actions", uid: "actions" },
];

const formData: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "code",
            placeholder: "Enter Code",
            validation_regex: "",
            label: "Code",
          },
        ],
      },
      {
        type: "text",
        name: "name",
        placeholder: "Enter Name",
        validation_regex: "",
        label: "Name",
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "rate",
            placeholder: "Enter Rate",
            validation_regex: "",
            label: "Rate",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "symbol",
            placeholder: "example $",
            validation_regex: "",
            label: "Symbol",
          },
        ],
      },
      {
        type: "radio",
        name: "auto_update",
        placeholder: "Select One",
        label: "Auto Update",
        validation_regex: "",
        radioItem: [
          {
            label: "True",
            value: "true",
          },
          {
            label: "False",
            value: "false",
          },
        ],
      },
      //   {
      //     type: "checkbox",
      //     name: "auto_update",
      //     placeholder: "Enter Auto Update",
      //     validation_regex: "",
      //     label: "Auto Update",
      //     dropdownItem: [
      //       {
      //         label: "True",
      //         value: "true",
      //       },
      //       {
      //         label: "False",
      //         value: "false",
      //       },
      //     ],
      //   },
    ],
  },
];
export { columns, formData };

import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";

const columns: IColumns[] = [
  { name: "Image", uid: "image", type: "image" },
  { name: "Code", uid: "code", isSortable: true },
  { name: "Name", uid: "name", isSortable: true },
  { name: "Created At", uid: "created_at", isSortable: true, type: "date" },
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
            name: "name",
            placeholder: "Enter Name",
            validation_regex: "",
            label: "Name",
          },
        ],
      },
      {
        type: "text",
        name: "code",
        placeholder: "Enter Code",
        validation_regex: "",
        label: "Code",
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "textarea",
            name: "description",
            placeholder: "Enter Description",
            validation_regex: "",
            label: "Description",
          },
        ],
      },
      {
        type: "file",
        name: "image",
        placeholder: "Enter Image",
        validation_regex: "",
        label: "Image",
        folder: "Brands",
      },
    ],
  },
];
const editFormData: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "name",
            placeholder: "Enter Name",
            validation_regex: "",
            label: "Name",
          },
        ],
      },
      {
        type: "text",
        name: "code",
        placeholder: "Enter Code",
        validation_regex: "",
        label: "Code",
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "textarea",
            name: "description",
            placeholder: "Enter Description",
            validation_regex: "",
            label: "Description",
          },
        ],
      },
      {
        type: "file",
        name: "image",
        placeholder: "Enter Image",
        validation_regex: "",
        label: "Image",
        folder: "Brands",
      },
    ],
  },
];
const importFormData: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "fileInput",
            name: "file",
            placeholder: "Enter File",
            validation_regex: "",
            label: "File",
          },
        ],
      },
    ],
  },
];
export { columns, editFormData, formData, importFormData };

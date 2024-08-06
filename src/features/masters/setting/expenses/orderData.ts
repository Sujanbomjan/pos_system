import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";
const columns: IColumns[] = [
  { name: "Reference", uid: "reference" },
  { name: "Amount", uid: "amount" },
  { name: "Note", uid: "note" },
  { name: "Created By", uid: "created_by" },
  { name: "Attachment", uid: "attachment", type: "image" },
  { name: "Created At", uid: "created_at", isSortable: true, type: "date" },
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
            name: "created_by",
            placeholder: "Enter Crreated By",
            validation_regex: "",
            label: "Created By",
          },
        ],
      },
      {
        type: "text",
        name: "reference",
        placeholder: "Enter Reference",
        validation_regex: "",
        label: "Reference",
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "category_id",
            placeholder: "Enter Category Id",
            validation_regex: "",
            label: "Category Id",
          },
        ],
      },
      {
        type: "text",
        name: "warehouse_id",
        placeholder: "Enter Warehouse Id",
        validation_regex: "",
        label: "Warehouse Id",
      },
      {
        type: "text",
        name: "note",
        placeholder: "Enter Note",
        validation_regex: "",
        label: "Note",
      },
      {
        type: "text",
        name: "amount",
        placeholder: "Enter Amount",
        validation_regex: "",
        label: "Amount",
      },

      {
        type: "file",
        name: "attachment",
        placeholder: "Enter Attachment",
        validation_regex: "",
        label: "Attachment",
      },
    ],
  },
];
const editForm: IFormData[] = [
  {
    title: "",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "created_by",
            placeholder: "Enter Crreated By",
            validation_regex: "",
            label: "Created By",
          },
        ],
      },
      {
        type: "text",
        name: "reference",
        placeholder: "Enter Reference",
        validation_regex: "",
        label: "Reference",
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "category_id",
            placeholder: "Enter Category Id",
            validation_regex: "",
            label: "Category Id",
          },
        ],
      },
      {
        type: "text",
        name: "warehouse_id",
        placeholder: "Enter Warehouse Id",
        validation_regex: "",
        label: "Warehouse Id",
      },
      {
        type: "text",
        name: "note",
        placeholder: "Enter Note",
        validation_regex: "",
        label: "Note",
      },
      {
        type: "text",
        name: "amount",
        placeholder: "Enter Amount",
        validation_regex: "",
        label: "Amount",
      },
    ],
  },
];
export { columns, formData, editForm };

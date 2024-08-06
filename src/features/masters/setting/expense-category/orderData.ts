import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";
const columns: IColumns[] = [
  { name: "Code", uid: "code", isSortable: true },
  { name: "Name", uid: "name", isSortable: true },
  { name: "Created At", uid: "created_at", type: "date", isSortable: true },
  { name: "Actions", uid: "actions" },
];

const formData: IFormData[] = [
  {
    title: "",
    children: [
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
            name: "code",
            placeholder: "Enter Code",
            validation_regex: "",
            label: "Code",
          },
        ],
      },
    ],
  },
];
export { columns, formData };

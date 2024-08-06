import type { IFormData } from "@/types/form";

const formData: IFormData[] = [
  {
    title: "Add Godown",
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
          {
            type: "dropdown",
            name: "type",
            placeholder: "select",
            label: "Type",
            validation_regex: "",
            dropdownItem: [
              {
                label: "Saleable",
                value: "Saleable",
              },
              {
                label: "Unsaleable",
                value: "Unsaleable",
              },
            ],
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "textarea",
            name: "remarks",
            placeholder: "Enter Remarks",
            validation_regex: "",
            label: "Remarks",
          },
          {
            type: "dropdown",
            name: "status",
            placeholder: "select",
            label: "Status",
            validation_regex: "",
            dropdownItem: [
              {
                label: "Active",
                value: "Active",
              },
              {
                label: "UnActive",
                value: "UnActive",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default formData;

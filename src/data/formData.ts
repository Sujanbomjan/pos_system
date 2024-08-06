import type { IFormData } from "@/types/form";

const formData: IFormData[] = [
  {
    title: "Applicant Information",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "first_name",
            placeholder: "FirstName",
            validation_regex: "",
            label: "First Name",
          },
          {
            type: "text",
            name: "last_name",
            placeholder: "Last Name",
            validation_regex: "",
            label: "Last Name",
          },
        ],
      },
      {
        type: "text",
        name: "first_name",
        placeholder: "FirstName",
        validation_regex: "",
        label: "First Name",
      },
      {
        type: "date",
        name: "dob",
        placeholder: "Date of Birth",
        validation_regex: "",
        label: "Date of Birth",
      },
      {
        type: "password",
        name: "password",
        placeholder: "pass",
        validation_regex: "",
        label: "password",
      },
      {
        type: "textarea",
        name: "review",
        placeholder: "pass",
        validation_regex: "",
        label: "password",
      },
      {
        type: "dropdown",
        name: "select",
        placeholder: "select",
        label: "select",
        validation_regex: "",
        dropdownItem: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
        ],
      },
      {
        type: "radio",
        name: "radio",
        placeholder: "select one",
        label: "select",
        validation_regex: "",
        radioItem: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
        ],
      },
      {
        type: "checkbox",
        name: "checkbox",
        placeholder: "select",
        label: "check me",
        validation_regex: "",
      },
    ],
  },
  {
    title: "Employment Information",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "company_name",
            placeholder: "FirstName",
            validation_regex: "",
            label: "First Name",
          },
          {
            type: "text",
            name: "company_last",
            placeholder: "Last Name",
            validation_regex: "",
            label: "Last Name",
          },
        ],
      },
      {
        type: "date",
        name: "dob123",
        placeholder: "Date of Birth",
        validation_regex: "",
        label: "Date of Birth",
      },
      {
        type: "textarea",
        name: "2review",
        placeholder: "pass",
        validation_regex: "",
        label: "password",
      },
      {
        type: "dropdown",
        name: "select123",
        placeholder: "select",
        label: "select",
        validation_regex: "",
        dropdownItem: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
        ],
      },
    ],
  },
];

export default formData;

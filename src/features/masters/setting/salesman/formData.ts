import type { IFormData } from "@/types/form";

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
          {
            type: "text",
            name: "email",
            placeholder: "Enter Email",
            validation_regex: "",
            label: "Email",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "date",
            name: "dob",
            placeholder: "Enter Date of Birth",
            validation_regex: "",
            label: "Date of Birth",
          },
          {
            type: "text",
            name: "address",
            placeholder: "Enter address",
            validation_regex: "",
            label: "Address",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "dropdown",
            name: "select",
            placeholder: "select",
            label: "SalesMan Type",
            validation_regex: "",
            dropdownItem: [
              {
                "label": "Full-Time Salesman",
                "value": "Full-Time Salesman"
              },
              {
                "label": "Part-Time Salesman",
                "value": "Part-Time Salesman"
              },
              {
                "label": "Commission-Based Salesman",
                "value": "Commission-Based Salesman"
              },
              {
                "label": "Territory Salesman",
                "value": "Territory Salesman"
              },
              {
                "label": "Inside Salesman",
                "value": "Inside Salesman"
              },
              {
                "label": "Outside Salesman",
                "value": "Outside Salesman"
              },
              {
                "label": "Retail Salesman",
                "value": "Retail Salesman"
              },
              {
                "label": "Wholesale Salesman",
                "value": "Wholesale Salesman"
              },
              {
                "label": "Account Manager",
                "value": "Account Manager"
              },
              {
                "label": "Technical Salesman",
                "value": "Technical Salesman"
              }
            ],
          },
          {
            type: "text",
            name: "mobile_no",
            placeholder: "Enter mobile number",
            validation_regex: "",
            label: "Mobile No",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "telephone_no",
            placeholder: "Enter telelphone Number",
            validation_regex: "",
            label: "Telephone No",
          },
        ],
      },
    ],
  },
];

export default formData;

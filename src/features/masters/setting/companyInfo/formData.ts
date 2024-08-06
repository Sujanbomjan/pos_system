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
            name: "company_id",
            placeholder: "Enter Company Id",
            validation_regex: "",
            label: "Company Id",
          },
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
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "address",
            placeholder: "Enter Address",
            validation_regex: "",
            label: "Address",
          },
          {
            type: "text",
            name: "address2",
            placeholder: "Enter Address",
            validation_regex: "",
            label: "Address 2",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "telephone",
            placeholder: "Enter Telephone Number",
            validation_regex: "",
            label: "Telephone Number",
          },
          {
            type: "text",
            name: "mobile_number",
            placeholder: "Enter Mobile Number",
            validation_regex: "",
            label: "Mobile Number",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "vat_no",
            placeholder: "Enter Vat Number",
            validation_regex: "",
            label: "Vat No,",
          },
          {
            type: "dropdown",
            name: "select_province",
            placeholder: "Select Provice",
            validation_regex: "",
            label: "Select Province",
            dropdownItem: [
              { label: "Province 1", value: "Province 1" },
              { label: "Province 2", value: "Province 2" },
              { label: "Bagmati Province", value: "Bagmati Province" },
              { label: "Gandaki Province", value: "Gandaki Province" },
              { label: "Lumbini Province", value: "Lumbini Province" },
              { label: "Karnali Province", value: "Karnali Province" },
              {
                label: "Sudurpashchim Province",
                value: "Sudurpashchim Province",
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
            type: "date",
            name: "start_date",
            placeholder: "Select Date",
            validation_regex: "",
            label: "Start Date",
          },
          {
            type: "date",
            name: "end_date",
            placeholder: "Select Date",
            validation_regex: "",
            label: "End Date",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "email",
            placeholder: "Enter Email",
            validation_regex: "",
            label: "Email",
          },
          {
            type: "date",
            name: "fiscal_year",
            placeholder: "Select Provice",
            validation_regex: "",
            label: "Fical Year",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "vat_no",
            placeholder: "Enter Vat Number",
            validation_regex: "",
            label: "Vat No.",
          },
          {
            type: "dropdown",
            name: "organization_type",
            placeholder: "Select Provice",
            validation_regex: "",
            label: "Select Organization Type",
            dropdownItem: [
              {
                label: "Public Limited Company",
                value: "Public Limited Company",
              },
              {
                label: "Private Limited Company",
                value: "Private Limited Company",
              },
              {
                label: "Nonprofit Organization",
                value: "Nonprofit Organization",
              },
              { label: "Government Agency", value: "Government Agency" },
              { label: "Partnership", value: "Partnership" },
              { label: "Sole Proprietorship", value: "Sole Proprietorship" },
              { label: "Cooperative", value: "Cooperative" },
              {
                label: "Limited Liability Company (LLC)",
                value: "Limited Liability Company (LLC)",
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
            type: "text",
            name: "place",
            placeholder: "Enter Place",
            validation_regex: "",
            label: "Place",
          },
          {
            type: "text",
            name: "postal_code",
            placeholder: "Enter Postal Code",
            validation_regex: "",
            label: "Postal Code",
          },
        ],
      },
    ],
  },
];

export default formData;

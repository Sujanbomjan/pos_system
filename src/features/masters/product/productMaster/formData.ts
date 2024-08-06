import type { IFormData } from "@/types/form";

const formData: IFormData[] = [
  {
    title: "Company Information",
    children: [
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "product_code",
            placeholder: "Enter Product Code",
            validation_regex: "",
            label: "Prodcut Code",
          },
          {
            type: "text",
            name: "product_name",
            placeholder: "Enter Product Name",
            validation_regex: "",
            label: "Prodcut Name",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "dropdown",
            name: "mother_pack",
            placeholder: "select",
            label: "Mother Pack",
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
            type: "text",
            name: "mother_pack",
            placeholder: "Enter base unit",
            validation_regex: "",
            label: "Base Unit",
          },
        ],
      },
      {
        type: "row",
        title: "",
        children: [
          {
            type: "text",
            name: "weight",
            placeholder: "Enter Weight",
            validation_regex: "",
            label: "Weight",
          },
          {
            type: "text",
            name: "shelf_life",
            placeholder: "Enter Shelf Life",
            validation_regex: "",
            label: "Shelf Life",
          },
        ],
      },
      {
        type: "text",
        name: "description",
        placeholder: "description",
        validation_regex: "",
        label: "Description",
      },
      {
        type: "text",
        name: "mrp",
        placeholder: "enter mrp",
        validation_regex: "",
        label: "MRP",
      },
      {
        type: "text",
        name: "selling_price",
        placeholder: "Enter Selling Price",
        validation_regex: "",
        label: "Selling Price",
      },
      {
        type: "text",
        name: "landing_price",
        placeholder: "Enter Landing Price",
        validation_regex: "",
        label: "Landing Price",
      },
      {
        type: "row",
        title: "",
        children: [
            {
                type: "dropdown",
                name: "status",
                placeholder: "select",
                label: "Status",
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
            type: "text",
            name: "discount",
            placeholder: "Enter Shelf Life",
            validation_regex: "",
            label: "Discount",
          },
          {
            type: "dropdown",
            name: "is_incentive",
            placeholder: "select",
            label: "Is Incentive",
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
            type: "dropdown",
            name: "house",
            placeholder: "select",
            label: "House",
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
    ],
  },
];

export default formData;

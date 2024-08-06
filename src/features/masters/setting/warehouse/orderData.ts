import useFetchPriceGroup from "@/api/hooks/master/setting/price_group/useFetchPriceGroup";
import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";
const useWarehouseData = () => {
  const { data } = useFetchPriceGroup();

  const priceDropDownItem =
    data?.data.reduce((acc, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {} as Record<string, string>) || {};

  const priceDropDown = data?.data.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));

  const columns: IColumns[] = [
    { name: "Name", uid: "name", isSortable: true },
    { name: "Code", uid: "code", isSortable: true },
    { name: "Address", uid: "address" },
    { name: "Phone", uid: "phone" },
    { name: "Email", uid: "email" },
    { name: "Price Group", uid: "price_group_id", isSortable: true },
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
          type: "async-select",
          name: "price_group_id",
          dropdownItem: priceDropDown || [],
          validation_regex: "",
          label: "Price Group",
        },
        {
          type: "row",
          title: "",
          children: [
            {
              type: "text",
              name: "address", placeholder: "Enter Address", validation_regex: "", label: "Address",
            },
          ],
        },
        {
          type: "text",
          name: "phone",
          placeholder: "Enter Phone",
          validation_regex: "",
          label: "Phone",
          extraValidation: "phone",
        },
        {
          type: "text",
          name: "email",
          placeholder: "Enter Email",
          validation_regex: "",
          label: "Email",
          extraValidation: "email",
        },
        {
          type: "text",
          name: "map",
          placeholder: "Enter Map Url",
          validation_regex: "",
          label: "Map",
          optional: true,
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
          type: "async-select",
          name: "price_group_id",
          dropdownItem: priceDropDown || [],
          validation_regex: "",
          label: "Price Group",
          optional: true,
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
          ],
        },
        {
          type: "text",
          name: "phone",
          placeholder: "Enter Phone",
          validation_regex: "",
          label: "Phone",
          extraValidation: "phone",
        },
        {
          type: "text",
          name: "email",
          placeholder: "Enter Email",
          validation_regex: "",
          label: "Email",
          extraValidation: "email",
        },
        {
          type: "text",
          name: "map",
          placeholder: "Enter Map Url",
          validation_regex: "",
          label: "Map",
          optional: true,
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
  return { formData, editFormData, columns, importFormData, priceDropDownItem };
};

export default useWarehouseData;

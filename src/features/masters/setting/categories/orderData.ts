import useFetchParentCategories from "@/api/hooks/master/setting/categories/useFetchParentCategory";
import { IFormData } from "@/types/form";
import { IColumns } from "@/types/table";
const useCategoriesData = () => {
  const { data } = useFetchParentCategories();
  const parentCategoryMap =
    data?.data[0].data.reduce((acc, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {} as Record<string, string>) || {};

  const parentDropDown = data?.data[0].data.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));
  const columns: IColumns[] = [
    { name: "Code", uid: "code", isSortable: true },
    { name: "Name", uid: "name", isSortable: true },
    { name: "Image", uid: "image", type: "image" },
    { name: "Parent Category", uid: "parent_id", isSortable: true },
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
          name: "parent_id",
          dropdownItem: parentDropDown || [],
          validation_regex: "",
          label: "Parent Category",
          optional: true,
        },
        {
          type: "textarea",
          name: "description",
          validation_regex: "",
          placeholder: "Enter Description",
          label: "Description",
        },
        {
          type: "file",
          name: "image",
          placeholder: "Enter Image",
          validation_regex: "",
          label: "Image",
          optional: true,
          folder: "Categories"
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
          type: "async-select",
          name: "parent_id",
          dropdownItem: parentDropDown || [],
          validation_regex: "",
          label: "Parent Category",
          optional: true,
        },
        {
          type: "text",
          name: "code",
          placeholder: "Enter Code",
          validation_regex: "",
          label: "Code",
        },
        {
          type: "textarea",
          name: "description",
          validation_regex: "",
          placeholder: "Enter Description",
          label: "Description",
        },
        {
          type: "file",
          name: "image",
          placeholder: "Enter Image",
          validation_regex: "",
          label: "Image",
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

  return { formData, editFormData, importFormData, columns, parentCategoryMap };
};
export default useCategoriesData;

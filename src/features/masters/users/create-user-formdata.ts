import { IFormData } from "@/types/form";

const useCreateUserData = () => {
  const formData: IFormData[] = [
    {
      title: "",
      children: [
        {
          type: "text",
          name: "name",
          placeholder: "Enter Name",
          label: "Name",
        },
        {
          type: "email",
          name: "email",
          placeholder: "Enter Email",
          label: "Email",
        },
        {
          type: "password",
          name: "password",
          placeholder: "Enter Password",
          label: "Password",
        },
        {
          type: "password",
          name: "password_confirmation",
          placeholder: "Confirm Password",
          label: "Confirm Password",
        },

        {
          type: "password",
          name: "password_confirmation",
          placeholder: "Confirm Password",
          label: "Confirm Password",
        },
      ],
    },
  ];

  return {
    formData,
  };
};

export default useCreateUserData;

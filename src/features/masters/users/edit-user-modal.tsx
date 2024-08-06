import { Form } from "@/components/ui/form";
import { UsersData } from "@/types/admin-users";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { ActionIcon, Button, Modal, Text, Title } from "rizzui";
import { z } from "zod";
import Select from "react-select";
import { useTheme } from "next-themes";
import useFetchRoles from "@/api/hooks/master/roles_permission/get-roles";
import useUpdateAdmin from "@/api/hooks/master/users/use-update-admin";
import toast from "react-hot-toast";
import { errorHandler } from "@/utils/errorHandler";

export const usersSchema = z.object({
  user_id: z.number().optional(),
  roles: z.array(z.string()).min(1, {
    message: "Roles must be selected",
  }),
});

export type UsersSchema = z.infer<typeof usersSchema>;

const EditAdminUser = ({ item }: { item: UsersData }) => {
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();

  const initialValues: UsersSchema = {
    user_id: item.id ?? "",
    roles: item.roles.map((role) => role.id.toString()) ?? [],
  };

  const { data: rolesData } = useFetchRoles();

  const rolesOptions = rolesData?.data?.data.map((role) => ({
    label: role.name,
    value: role.id.toString(),
  }));

  const mutation = useUpdateAdmin();
  const onSubmit = async (data: UsersSchema) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Successfully Edited User");
        setShowModal(false);
      },
      onError: (error) => {
        errorHandler(error);
      },
    });
  };
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Update Role</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="m-auto px-7 pb-8 pt-6">
          <div className="mb-7 flex items-center justify-between">
            <Title as="h6">Assign Role to {item.name}</Title>
            <ActionIcon
              size="sm"
              variant="text"
              onClick={() => setShowModal(false)}
            >
              <RxCross1 className="h-auto w-6" strokeWidth={1.8} />
            </ActionIcon>
          </div>
          <Form<UsersSchema>
            validationSchema={usersSchema}
            onSubmit={onSubmit}
            useFormProps={{
              mode: "onChange",
              defaultValues: initialValues,
            }}
          >
            {({ register, formState: { errors }, control }) => (
              <div className="space-y-5 lg:space-y-6">
                <Controller
                  control={control}
                  name="roles"
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-full flex w-full flex-col gap-2">
                      <Text as="strong">Roles</Text>
                      <Select
                        isMulti
                        menuPortalTarget={document.body}
                        // menuPosition="fixed"
                        placeholder="Select Roles"
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          input: (provided: any) => ({
                            ...provided,
                            "input:focus": {
                              boxShadow: "none",
                            },
                            color: "inherit",
                          }),
                          control: (provided: any) => ({
                            ...provided,
                            backgroundColor: "inherit",
                            padding: 5,
                            borderColor:
                              errors.roles && value.length == 0 && "red",
                          }),
                          menu: (provided: any) => ({
                            ...provided,
                            backgroundColor:
                              theme === "light" ? "white" : "#333333",
                          }),
                        }}
                        aria-label="Roles"
                        options={rolesOptions}
                        className="col-span-full h-fit"
                        value={rolesOptions?.filter((role) =>
                          value?.includes(role.value)
                        )}
                        onChange={(val) => {
                          onChange(val.map((c) => c.value));
                        }}
                      />
                      {errors.roles && value.length == 0 && (
                        <p className="text-red-600">{errors.roles?.message}</p>
                      )}
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  isLoading={mutation.isPending}
                  disabled={mutation.isPending}
                >
                  Update Role
                </Button>
              </div>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default EditAdminUser;

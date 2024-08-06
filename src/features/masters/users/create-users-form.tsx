"use client";
import { Form } from "@/components/ui/form";
import { Controller } from "react-hook-form";
import { Button, Input, Password, Radio, RadioGroup, Text } from "rizzui";
import { z } from "zod";
import Select from "react-select";
import { useTheme } from "next-themes";
import useFetchRoles from "@/api/hooks/master/roles_permission/get-roles";
import useCreateAdmin from "@/api/hooks/master/users/use-create-admin";
import toast from "react-hot-toast";
import { useRouter } from "next-nprogress-bar";
import { routes } from "@/config/routes";
import { errorHandler } from "@/utils/errorHandler";

import React from "react";

const CreateUsersForm = () => {
  const usersSchema = z
    .object({
      name: z.string().min(2).max(32),
      email: z.string().optional(),
      mobile_no: z.coerce
        .string()
        .min(10, {
          message: "Phone Number Must contain at least 10 digits",
        })
        .max(10, {
          message: "Phone Number Must contain at most 10 digits",
        }),
      password: z.string().min(8).max(32),
      password_confirmation: z.string().min(8).max(32),
      gender: z.string().min(1, {
        message: "Select a Gender",
      }),
      roles: z.array(z.string()).min(1, {
        message: "Roles must be selected",
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Password do not match!",
      path: ["password_confirmation"],
    });

  type UsersSchema = z.infer<typeof usersSchema>;

  const initialValues: UsersSchema = {
    email: "",
    mobile_no: "",
    name: "",
    password: "",
    password_confirmation: "",
    gender: "",
    roles: [],
  };
  const router = useRouter();
  const mutation = useCreateAdmin();
  const onSubmit = async (data: UsersSchema) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Successfully Created User");
        router.push(routes.masters.users.viewUsers);
      },
      onError: (error) => {
        errorHandler(error);
      },
    });
  };
  const { theme } = useTheme();

  const { data: rolesData, isLoading } = useFetchRoles();

  const rolesOptions = rolesData?.data?.data.map((role) => ({
    label: role.name,
    value: role.id.toString(),
  }));

  return (
    <>
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
            <Input
              type="text"
              size="lg"
              label="Name"
              placeholder="Enter Name"
              className="[&>label>span]:font-medium"
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter Email"
              className="[&>label>span]:font-medium"
              {...register("email")}
              error={errors.email?.message}
            />

            <Password
              size="lg"
              label="Password"
              placeholder="Enter Password"
              className="[&>label>span]:font-medium"
              {...register("password")}
              error={errors.password?.message}
            />

            <Password
              size="lg"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              className="[&>label>span]:font-medium"
              {...register("password_confirmation")}
              error={errors.password_confirmation?.message}
            />

            <Input
              type="number"
              size="lg"
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              className="[&>label>span]:font-medium"
              {...register("mobile_no", {
                setValueAs: (value: string) => parseFloat(value),
              })}
              error={errors.mobile_no?.message}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <div className="col-span-full flex w-full flex-col gap-2">
                  <Text as="strong">Gender</Text>
                  <RadioGroup
                    value={value}
                    setValue={(e) => {
                      onChange(e);
                    }}
                    className="flex gap-4"
                  >
                    <Radio label="Male" value="m" />
                    <Radio label="Female" value="f" />
                  </RadioGroup>
                  {errors.gender && !value && (
                    <p className="text-red-600">{errors.gender?.message}</p>
                  )}
                </div>
              )}
            />
            {rolesOptions && (
              <Controller
                control={control}
                name="roles"
                render={({ field: { onChange, value } }) => (
                  <div className="col-span-full flex w-full flex-col gap-2">
                    <Text as="strong">Roles</Text>
                    <Select
                      isMulti
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
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
            )}

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading || mutation.isPending}
              disabled={isLoading || mutation.isPending}
            >
              Create Users
            </Button>
          </div>
        )}
      </Form>
    </>
  );
};

export default CreateUsersForm;

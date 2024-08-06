import useAddRoles from "@/api/hooks/master/roles_permission/create-roles";
import useFetchPermissions from "@/api/hooks/master/roles_permission/get-all-permission";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { Form } from "@/components/ui/form";
import { routes } from "@/config/routes";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Checkbox, Input } from "rizzui";
import { z } from "zod";

const CreateRolePermission = () => {
  const rolesSchema = z.object({
    name: z.string().min(2).max(256),
    permissions: z
      .array(z.string())
      .min(1, "At least one permission must be selected"),
  });

  type RolesSchema = z.infer<typeof rolesSchema>;
  const initialValues: RolesSchema = {
    name: "",
    // permission: ["Sma Groups Restore"],
    permissions: [],
  };

  const { data, isLoading } = useFetchPermissions();

  const router = useRouter();

  const mutation = useAddRoles();

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<RolesSchema>();
  const [selectAll, setSelectAll] = useState(false);

  const handleSubmitConfirmation = (data: RolesSchema) => {
    setFormData(data);
    setOpenModal(true);
  };

  const handleSubmitConfirmationCancel = () => {
    setOpenModal(false);
  };

  const handleSubmitConfirmationConfirm = (data: RolesSchema) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Successfully Created Role");
        router.push(routes.masters.roles_permission.viewRoles);
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
    setOpenModal(false);
  };

  return (
    <>
      <LoadingOverlay isVisible={isLoading || mutation.isPending} />
      <Form<RolesSchema>
        validationSchema={rolesSchema}
        onSubmit={(data) => handleSubmitConfirmation(data)}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors }, control, setValue }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="text"
              label="Name"
              placeholder="Enter Role Name"
              className="[&>label>span]:font-medium"
              {...register("name")}
              error={errors.name?.message}
            />

            <Checkbox
              value=""
              label="Select All"
              onChange={() => {
                setSelectAll(!selectAll);
                if (!selectAll) {
                  setValue(
                    "permissions",
                    (data?.data || []).map((permission) => permission.name)
                  );
                } else {
                  setValue("permissions", []);
                }
              }}
              checked={selectAll}
            />

            <Controller
              control={control}
              name="permissions"
              render={({ field: { onChange, value: originValue } }) => (
                <div className="flex flex-col gap-3">
                  {Array.isArray(data?.data) &&
                    data?.data?.map((permission) => (
                      <Checkbox
                        key={permission.id}
                        value={permission.name}
                        label={permission.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (originValue.includes(value)) {
                            onChange(originValue.filter((v) => v !== value));
                          } else {
                            onChange([...originValue, value]);
                          }
                        }}
                        checked={originValue.includes(permission.name)}
                      />
                    ))}
                </div>
              )}
            />
            {errors.permissions && (
              <p className="text-red-500">{errors.permissions.message}</p>
            )}

            <Button
              type="submit"
              isLoading={mutation.isPending}
              disabled={mutation.isPending}
            >
              Create Role
            </Button>
          </div>
        )}
      </Form>
      <ConfirmationModal
        isOpen={openModal}
        onClose={handleSubmitConfirmationCancel}
        //@ts-ignore
        handleAction={() => handleSubmitConfirmationConfirm(formData)}
      />
    </>
  );
};

export default CreateRolePermission;

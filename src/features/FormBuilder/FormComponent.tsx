import AsyncSelect from "@/components/AsyncDropdownSelect/AsyncSelect";
import MultiSelect from "@/components/AsyncDropdownSelect/MultiSelect";
import FileInputType from "@/components/FileInput/FIleInput";
import MultipleImageUploader from "@/components/MultipleImageUploader/MulitpleImageUploader";
import SingleImageUploader from "@/components/SingleImageUploader/SingleImageUploader";
import { FormInputType, IFormItem } from "@/types/form";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import {
  Checkbox,
  FileInput,
  Input,
  NumberInput,
  Password,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "rizzui";

const FormComponent = ({
  formItem,
  register,
  errors,
  control,
  size,
  isFormReset,
  disableSelect = false,
}: {
  isFormReset?: boolean;
  formItem: IFormItem;
  register: UseFormRegister<FormInputType>;
  errors: any;
  control: Control<FormInputType>;
  size: "lg" | "sm" | "md" | "xl";
  disableSelect?: boolean;
}) => {
  return (
    <>
      {formItem.type === "password" && (
        <Password
          label={formItem.label}
          placeholder={formItem.placeholder}
          {...register(formItem.name)}
          error={errors[formItem.name]?.message}
          className="[&>label>span]:font-medium flex flex-1"
          size={size}
        />
      )}

      {formItem.type === "text" && (
        <Input
          type={formItem.type}
          size={size}
          label={
            <p>
              {formItem.label}{" "}
              {formItem.optional ? "" : <span className="text-red-500">*</span>}
            </p>
          }
          placeholder={formItem.placeholder}
          className="[&>label>span]:font-medium flex flex-1"
          inputClassName="text-sm"
          {...register(formItem.name)}
          error={errors[formItem.name]?.message}
        />
      )}
      {formItem.type === "number" && (
        <Input
          type="number"
          size={size}
          label={
            <p>
              {formItem.label}{" "}
              {formItem.optional ? "" : <span className="text-red-500">*</span>}
            </p>
          }
          placeholder={formItem.placeholder}
          className="[&>label>span]:font-medium flex flex-1"
          inputClassName="text-sm"
          {...register(formItem.name)}
          error={errors[formItem.name]?.message}
        />
      )}
      {formItem.type === "fileInput" && (
        <Controller
          name={formItem.name}
          control={control}
          render={({ field: { onChange } }) => (
            <FileInput
              size={size}
              label={
                <p>
                  {formItem.label}{" "}
                  {formItem.optional ? (
                    ""
                  ) : (
                    <span className="text-red-500">*</span>
                  )}
                </p>
              }
              placeholder={formItem.placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  onChange(Array.from(e.target.files));
                }
              }}
              className="[&>label>span]:font-medium flex flex-1"
              inputClassName="text-sm"
              error={errors[formItem.name]?.message}
            />
          )}
        />
      )}
      {formItem.type === "fileInputType" && (
        <Controller
          name={formItem.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FileInputType
              isFormReset={isFormReset}
              folder={formItem.folder}
              size={size}
              label={
                <p>
                  {formItem.label}{" "}
                  {formItem.optional ? (
                    ""
                  ) : (
                    <span className="text-red-500">*</span>
                  )}
                </p>
              }
              placeholder={formItem.placeholder}
              value={(value as string) || []}
              onChange={onChange}
              className="[&>label>span]:font-medium flex flex-1"
              inputClassName="text-sm"
              error={errors[formItem.name]?.message}
            />
          )}
        />
      )}
      {formItem.type === "date" && (
        <Input
          type={formItem.type}
          size={size}
          label={
            <p>
              {formItem.label}{" "}
              {formItem.optional ? "" : <span className="text-red-500">*</span>}
            </p>
          }
          placeholder={formItem.placeholder}
          className="[&>label>span]:font-medium flex flex-1"
          inputClassName="text-sm"
          {...register(formItem.name)}
          error={errors[formItem.name]?.message}
        />
      )}
      {formItem.type === "textarea" && (
        <Controller
          name={formItem.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Textarea
              size={size}
              label={
                <p>
                  {formItem.label}{" "}
                  {formItem.optional ? (
                    ""
                  ) : (
                    <span className="text-red-500">*</span>
                  )}
                </p>
              }
              // maxLength={255}
              // renderCharacterCount={({ maxLength }) => (
              //   <div className="text-right text-sm opacity-70 rtl:text-left">
              //     {(value as string)?.length || 0}/{maxLength}
              //   </div>
              // )}
              value={value || ""}
              placeholder={formItem.placeholder}
              className="[&>label>span]:font-medium flex flex-1"
              onChange={onChange}
              error={errors[formItem.name]?.message}
            />
          )}
        />
      )}

      {formItem.type === "dropdown" && (
        <Controller
          name={formItem.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              className="[&>label>span]:font-medium !flex flex-1 flex-col !h-full"
              label={
                <p>
                  {formItem.label}{" "}
                  {formItem.optional ? (
                    ""
                  ) : (
                    <span className="text-red-500">*</span>
                  )}
                </p>
              }
              size={size}
              options={formItem.dropdownItem || [{ label: "", value: "" }]}
              value={formItem?.dropdownItem?.find((c) => c.value === value)}
              onChange={(selected: any) => onChange(selected?.value)}
              error={errors[formItem.name]?.message}
            />
          )}
        />
      )}
      {formItem.type === "async-select" && (
        <Controller
          name={formItem.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <AsyncSelect
              disabled={disableSelect}
              className="flex flex-1 flex-col !h-full"
              options={formItem.dropdownItem || [{ label: "", value: "" }]}
              value={
                formItem?.dropdownItem?.find((c) => c.value === value) || ""
              }
              label={
                <p className="font-medium">
                  {formItem.label}{" "}
                  {formItem.optional ? (
                    ""
                  ) : (
                    <span className="text-red-500">*</span>
                  )}
                </p>
              }
              onChange={(selected: any) => {
                onChange(selected?.value);
              }}
              size={size}
              error={errors[formItem.name]?.message}
            />
          )}
        />
      )}
      {/* {formItem.type === "quilleditor" && (
        <Controller
          name={formItem.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <QuillEditor
              className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px] w-full"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              label={formItem.label}
              value={value as string}
              onChange={onChange}
              error={errors[formItem.name]?.message}
            />
          )}
        />
      )} */}

      {formItem.type === "radio" && (
        <Controller
          name={formItem.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-2">
              <label htmlFor="">{formItem.label}</label>
              <RadioGroup
                value={value as string}
                setValue={onChange}
                className="flex flex-row gap-4"
              >
                {formItem.radioItem?.map(({ label, value }) => (
                  <Radio label={label} value={value} key={value} />
                ))}
              </RadioGroup>
              {errors[formItem.name] && (
                <p className="text-xs text-red">
                  {errors[formItem.name].message}
                </p>
              )}
            </div>
          )}
        />
      )}
      {formItem.type === "file" && (
        <div className="flex flex-col gap-2">
          <label htmlFor="">
            {
              <p className="font-medium">
                {formItem.label}{" "}
                {formItem.optional ? (
                  ""
                ) : (
                  <span className="text-red-500">*</span>
                )}
              </p>
            }
          </label>

          <Controller
            name={formItem.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultipleImageUploader
                folder={formItem.folder}
                isFormReset={isFormReset}
                name={formItem.name}
                value={(value as any) || []}
                onChange={onChange}
                error={errors[formItem.name]}
              />
            )}
          />
        </div>
      )}
      {formItem.type === "single-image" && (
        <div className="flex flex-col gap-2">
          <label htmlFor="">
            {
              <p className="font-medium">
                {formItem.label}{" "}
                {formItem.optional ? (
                  ""
                ) : (
                  <span className="text-red-500">*</span>
                )}
              </p>
            }
          </label>

          <Controller
            name={formItem.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <SingleImageUploader
                folder={formItem.folder}
                isFormReset={isFormReset}
                name={formItem.name}
                value={(value as any) || []}
                onChange={onChange}
                error={errors[formItem.name]}
              />
            )}
          />
        </div>
      )}
      {formItem.type === "checkbox" && (
        <div
          className={`flex flex-col gap-2 flex-1 ${formItem.className || ""}`}
        >
          <Controller
            name={formItem.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  label={formItem.label}
                  value={value as string}
                  checked={!!value}
                  onChange={onChange}
                  error={errors[formItem.name]?.message}
                />
              </div>
            )}
          />
        </div>
      )}

      {formItem.type === "multi-select" && (
        <Controller
          name={formItem.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiSelect
              className="flex flex-1 flex-col !h-full"
              options={formItem.dropdownItem || [{ label: "", value: "" }]}
              label={
                <p className="font-medium">
                  {formItem.label}{" "}
                  {formItem.optional ? (
                    ""
                  ) : (
                    <span className="text-red-500">*</span>
                  )}
                </p>
              }
              onChange={(selected: any) => {
                onChange(selected);
              }}
              value={value}
              size={size}
              error={errors[formItem.name]?.message}
            />
          )}
        />
      )}
    </>
  );
};

export default FormComponent;

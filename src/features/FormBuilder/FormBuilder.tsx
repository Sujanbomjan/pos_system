import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { FormInputType, IFormData, RowFormChildren } from "@/types/form";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "rizzui";
import getDefaultValues from "../getDefaultValues";
import FormComponent from "./FormComponent";

interface IFormBuilderProps {
  disableSelect?: boolean;
  register: UseFormRegister<FormInputType>;
  errors: FieldErrors<FormInputType>;
  control: Control<FormInputType>;
  handleSubmit: UseFormHandleSubmit<FormInputType, undefined>;
  onSubmit: SubmitHandler<FormInputType>;
  buttonLabel?: string;
  isEditPage?: boolean;
  data: IFormData;
  isFinalStep?: boolean;
  reset: UseFormReset<any>;
  formStep: number;
  setFormStep: Dispatch<SetStateAction<number>>;
  getValues: UseFormGetValues<any>;
  children?: React.ReactNode;
  size?: "lg" | "sm" | "md" | "xl";
  isLoading?: boolean;
  isConfirmationModalRequired?: boolean;
  isFormReset?: boolean;
  hideButton?: boolean;
}

const FormBuilder = ({
  data,
  hideButton = false,
  handleSubmit,
  isFormReset,
  onSubmit,
  register,
  control,
  errors,
  buttonLabel,
  isFinalStep = false,
  reset,
  formStep,
  setFormStep,
  getValues,
  children,
  isLoading,
  size = "lg",
  isConfirmationModalRequired = false,
  disableSelect = false,
}: IFormBuilderProps) => {
  const defaultValues = getDefaultValues(data);

  const getButtonLabel = () => {
    return isFinalStep ? (
      buttonLabel || "Submit"
    ) : (
      <>
        Continue <MdKeyboardArrowRight size={18} />
      </>
    );
  };

  const [modalOpen, setModalOpen] = useState(false);

  //final confirmation after clicked yes on modal
  const handleSubmitConfirmationConfirm = () => {
    handleSubmit(onSubmit)();
    setModalOpen(false);
  };

  const handleSubmitConfirmation = () => {
    setModalOpen(true);
  };

  const handleSubmitConfirmationCancel = () => {
    setModalOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(
        isConfirmationModalRequired
          ? handleSubmitConfirmation
          : handleSubmitConfirmationConfirm
      )}
    >
      <div key={data.title} className="flex flex-col gap-2">
        <h3>{data.title}</h3>
        {data.children.map((innerItem, index) =>
          innerItem.type === "row" ? (
            <div
              className={`flex flex-row gap-4 ${innerItem.className || ""}`}
              key={index}
            >
              {(innerItem as RowFormChildren).children.map((rowChild) => (
                <FormComponent
                  disableSelect={disableSelect}
                  isFormReset={isFormReset}
                  formItem={rowChild}
                  key={rowChild.name}
                  {...{ size, register, errors, control }}
                />
              ))}
            </div>
          ) : innerItem.type === "title" ? (
            <p className="mb-2 mt-4 font-semibold text-xl">{innerItem.title}</p>
          ) : (
            <FormComponent
              disableSelect={disableSelect}
              isFormReset={isFormReset}
              formItem={innerItem}
              key={innerItem.name}
              {...{ register, size, control, errors }}
            />
          )
        )}
      </div>
      {children}
      <div
        className={`flex items-center gap-4 mt-8 ${hideButton ? "hidden" : ""}`}
      >
        <Button
          className={
            formStep === 0 ? "hidden" : "flex items-center gap-1 justify-center"
          }
          onClick={() => {
            if (formStep !== 0) {
              setFormStep((prev) => --prev);
            }
          }}
        >
          <MdKeyboardArrowLeft size={18} />
          back
        </Button>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          className="flex items-center justify-center gap-1 py-1"
          type="submit"
        >
          {getButtonLabel()}
        </Button>
        <Button
          variant="outline"
          onClick={() => reset()}
          className="bg-[#E3E3E3] py-1 flex items-center justify-center gap-1"
        >
          Reset
        </Button>
      </div>

      {isConfirmationModalRequired && (
        <ConfirmationModal
          isOpen={modalOpen}
          onClose={handleSubmitConfirmationCancel}
          handleAction={handleSubmitConfirmationConfirm}
        />
      )}
    </form>
  );
};

export default FormBuilder;

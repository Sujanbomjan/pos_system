import { useRef, useState, useEffect } from "react";
import { FileInput } from "rizzui";
import useUploadFile from "@/api/hooks/useUploadFile";
import { errorHandler } from "@/utils/errorHandler";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

export interface FileInputProps {
  size?: "sm" | "md" | "lg" | "xl";
  label: any;
  value?: any;
  onChange?: (selected: any) => void;
  className: string;
  error: any;
  placeholder: any;
  inputClassName: string;
  isFormReset?: boolean;
  folder?: string;
}

const FileInputType = ({
  size,
  label,
  value,
  onChange,
  className,
  error,
  placeholder,
  inputClassName,
  isFormReset,
  folder,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileString, setFileString] = useState<string[]>([]);
  const [isResettingForm, setIsResettingForm] = useState(false);

  useEffect(() => {
    if (isResettingForm && isFormReset) {
      setFileString([]);
      setIsResettingForm(false);
      onChange && onChange([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isResettingForm, isFormReset, onChange]);

  useEffect(() => {
    if (value) {
      if (Array.isArray(value) && value.length === 0) {
        return;
      }
      const newValue = Array.isArray(value)
        ? value.filter((v) => v !== null)
        : value !== null
        ? [value]
        : [];
      setFileString(newValue);
    }
  }, [value]);

  const fileMutation = useUploadFile();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files) as File[];
      fileMutation.mutate(
        { file: newFiles, folder: folder },
        {
          onSuccess: (data) => {
            const uploadedFiles = data.data.filter(
              (file: string) => file !== null
            );
            setFileString((prev) => [...prev, ...uploadedFiles]);
            onChange && onChange([...fileString, ...uploadedFiles]);
          },
          onError: (error) => {
            errorHandler(error);
          },
        }
      );
    }
  };

  const handleClear = () => {
    setFileString([]);
    onChange && onChange([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-1.5">
      <LoadingOverlay isVisible={fileMutation.isPending} />
      <div className="relative">
        <FileInput
          ref={fileInputRef}
          clearable={true}
          size={size}
          label={label}
          placeholder={placeholder}
          className={className}
          inputClassName={inputClassName}
          onChange={handleInputChange}
          onClear={handleClear}
        />
        {fileString.length > 0 && (
          <div className="file-downloads mt-2">
            {fileString.map((file, index) => (
              <div key={index} className="file-item">
                <a
                  href={file || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {file !== "null" || null ? file.split("/").pop() : ""}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default FileInputType;

"use client";

import useUploadFile from "@/api/hooks/useUploadFile";
import { openModal } from "@/lib/modal/modalSlice";
import Image from "next/image";
import {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  // error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  error?: any;
  isFormReset?: boolean;
  value: any[];
  name: string;
  folder?: string;
}

const MultipleImageUploader = forwardRef(
  (props: MyInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [imageString, setImageString] = useState<string[]>([]);
        // state to prevent the form from being reset in first render after the initial value from api has been set
    const [isFormReset, setIsFormReset] = useState(false);
    useEffect(() => {
      if (isFormReset && props.isFormReset) {
        setImageString([]);
        //set this value to false to prevent reset function being called twice
        setIsFormReset(false);
        props.onChange && props.onChange([] as any);
      }
    }, [isFormReset, props, props.isFormReset]);
    useEffect(() => {
      if (props.value) {
        if (Array.isArray(props.value) && props.value.length === 0) {
          return;
        }
        setImageString(
          Array.isArray(props.value) ? [...props.value] : [props.value]
        );
      } else {
        setImageString(
          Array.isArray(props.value) ? [...props.value] : [props.value]
        );
      }
    }, [props.value]);

    const dispatch = useDispatch();
    const imageMutation = useUploadFile();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        imageMutation.mutate(
          { file: [...Array.from(files)], folder: props.folder },
          {
            onSuccess: (data) => {
              setImageString((prev) => [...prev, ...data.data]);
              props.onChange &&
                props.onChange([...imageString, ...data.data] as any);
              //set this to true so that the form can be reset when the input value is changed
              setIsFormReset(true);
            },
          }
        );
      }
    };

    const handleImageRemove = (e: any, indexToRemove: number) => {
      setImageString((prevImages) =>
        prevImages.filter((_, index) => index !== indexToRemove)
      );
      props.onChange &&
        props.onChange(
          imageString.filter((_, index) => index !== indexToRemove) as any
        );
      e.stopPropagation();
    };

    return (
      <div>
        <LoadingOverlay isVisible={imageMutation.isPending} />
        {imageString.length === 0 && (
          <label
            htmlFor={props.name}
            className={`bg-gray-100 border-[1px] border-black border-dashed flex flex-col items-center cursor-pointer py-4 gap-1 ${
              props.error && "border-red-500"
            }`}
          >
            <Image
              src="/add-image.png"
              width={60}
              height={60}
              className=""
              alt="add image"
            />
            <span>Upload Image</span>
          </label>
        )}
        {/* error message */}
        <p className="text-sm text-red-400 mt-2">{props.error?.message}</p>
        <input
          ref={ref}
          type="file"
          id={props.name}
          name={props.name}
          multiple
          onChange={handleInputChange}
          accept="image/*"
          className="hidden"
        />
        <div className="flex flex-wrap mt-4 gap-6">
          {imageString?.map((file: any, index: number) => (
            <div
              className="relative aspect-square w-32 group hover:ring-1 ring-accent transition"
              onClick={() => {
                dispatch(
                  openModal({
                    content: (
                      <div className="flex items-center justify-center bg-transparent">
                        <div className="relative h-[calc(100vh-10rem)] w-full flex">
                          <Image
                            alt="featured_image"
                            className="object-contain"
                            fill
                            src={URL.createObjectURL(file)}
                          />
                        </div>
                      </div>
                    ),
                  })
                );
              }}
              key={index}
            >
              <Image
                alt="featured_image"
                className="object-contain"
                fill
                src={file}
              />
              <MdDelete
                onClick={(e: any) => handleImageRemove(e, index)}
                className="absolute right-2 top-2 text-body cursor-pointer hidden group-hover:flex transition"
              />
            </div>
          ))}
          {imageString.length !== 0 && (
            <label
              htmlFor={props.name}
              className="bg-gray-100 border-[1px] border-black border-dashed flex flex-col justify-center items-center cursor-pointer gap-2 px-10 py-2"
            >
              <Image
                src="/add-image.png"
                width={60}
                height={60}
                className=""
                alt="add image"
              />
              <span className="text-accent-dark">Add Image</span>
            </label>
          )}
        </div>
      </div>
    );
  }
);

MultipleImageUploader.displayName = "MultipleImageUploader";
export default MultipleImageUploader;

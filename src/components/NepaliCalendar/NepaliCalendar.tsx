"use client";
import { IoCloseCircleOutline } from "react-icons/io5";
//@ts-ignore
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { useEffect, useRef } from "react";

interface INepaliCalendarProps {
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
  onClear: () => void;
  minDate?: String | undefined;
}

const NepaliCalendar = ({
  onChange,
  placeholder,
  value,
  onClear,
  minDate,
}: INepaliCalendarProps) => {
  const handleDate = ({
    bsDate,
    adDate,
  }: {
    bsDate: any;
    adDate: any;
  }): void => {
    if (calendarRef.current) {
      (calendarRef.current as any).inputRef.current.value = bsDate;
    }
    onChange(bsDate);
  };

  useEffect(() => {
    if (calendarRef.current) {
      (calendarRef.current as any).inputRef.current.value = value;
    }
  }, [value]);

  const calendarRef = useRef();

  const handleClear = () => {
    if (calendarRef.current) {
      (calendarRef.current as any).inputRef.current.value = "";
    }
    onClear();
  };

  return (
    <div className="relative">
      <Calendar
        onChange={handleDate}
        language="en"
        hideDefaultValue
        placeholder={placeholder || "Select date"}
        className="rounded-md border-gray-300 bg-transparent placeholder:!text-gray-400 placeholder:!text-sm !h-[38px] text-sm"
        ref={calendarRef}
        minDate={minDate ?? undefined}
      />
      {value && (
        <button
          className="absolute right-3 bottom-3"
          onClick={() => handleClear()}
        >
          <IoCloseCircleOutline color="gray" />
        </button>
      )}
    </div>
  );
};

export default NepaliCalendar;

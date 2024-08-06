"use client";

//@ts-ignore
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { useRef, useState } from "react";

const Page = () => {
  const [date, setDate] = useState<any>("");

  const handleDate = ({ bsDate, adDate }: { bsDate: any; adDate: any }) => {
    setDate({ date: bsDate });
    if (calendarRef.current) {
      (calendarRef.current as any).inputRef.current.value = bsDate;
    }
    console.log(adDate, bsDate, "date");
  };

  const calendarRef = useRef();

  const handleClear = () => {
    if (calendarRef.current) {
      (calendarRef.current as any).inputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="w-fit">
        <Calendar
          onChange={handleDate}
          language="en"
          hideDefaultValue
          placeholder="select start date"
          className="rounded-md border-gray-300 bg-none placeholder:!text-gray-400"
          ref={calendarRef}
        />
      </div>
      <button onClick={() => handleClear()}>clear date</button>
    </>
  );
};

export default Page;

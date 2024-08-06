import { format } from "date-fns";

//convert given date into the format accepted by the api query params
const dateString = (date: string, isBS: boolean) => {
  return encodeURIComponent(
    JSON.stringify([
      {
        date: isBS ? date : format(date, "yyyy-MM-dd"),
        nepali: isBS,
      },
    ])
  );
};

export { dateString };

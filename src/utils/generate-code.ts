import { UseFormSetValue } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export const GenerateCode = (name: string, setValue: UseFormSetValue<any>) => {
  if (name === "") {
    setValue("code", "");
  } else {
    let dashed_name = name.split(" ").join("-").toUpperCase().substring(0, 15);

    const uuid = uuidv4().toUpperCase();
    const uuidSubstring = uuid.substring(0, 5);
    const maxLength = 20;
    const trimmedDashedName = dashed_name.substring(
      0,
      maxLength - (uuidSubstring.length + 1)
    );
    const generatedCode = `${trimmedDashedName}-${uuidSubstring}`;

    setValue("code", generatedCode);
  }
};

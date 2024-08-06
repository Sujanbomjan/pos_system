"use client";

import { Button, Input } from "rizzui";
import { SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useMedia } from "@/hooks/use-media";

type FormValues = {
  mobile: string;
};

export default function OtpForm() {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  const isMedium = useMedia("(max-width: 1200px)", false);

  return (
    <Form<FormValues> onSubmit={onSubmit} className="w-full">
      {({ register }) => (
        <div className="space-y-5 lg:space-y-7">
          <Input
            size={isMedium ? "lg" : "xl"}
            label="Mobile Number"
            className="[&>label>span]:font-medium"
            placeholder="Enter your mobile number"
            error="Enter your mobile number"
            {...register("mobile")}
          />
          <Button className="w-full" type="submit" size="xl" rounded="pill">
            GET VERIFICATION CODE
          </Button>
        </div>
      )}
    </Form>
  );
}

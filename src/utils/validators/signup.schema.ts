import { messages } from "@/config/messages";
import { z } from "zod";

// form zod validation schema
export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: messages.firstNameRequired }),
    lastName: z.string().optional(),
    email: z
      .string()
      .min(1, { message: messages.emailIsRequired })
      .email({ message: "Please enter a valid email" }),
    mobileNumber: z
      .string()
      .refine((val) => /^(\+?977)?[9][6-9]\d{8}$/.test(val), {
        message: "Please enter a valid mobile number",
      }),
    permanentAddress: z
      .string()
      .min(1, { message: "Please enter your permanent address" }),
    isAddressSame: z.boolean(),
    currentAddress: z.string(),
    dob: z.string().date().min(1, { message: "Please enter your DOB" }),
    employer: z
      .string()
      .min(1, { message: "Please enter your current employer" }),
    employerAddress: z
      .string()
      .min(1, { message: "Please enter your current employer address" }),
    employerPhone: z
      .string()
      .min(1, { message: "Please enter the phone of employer" }),
    employerEmail: z
      .string()
      .min(1, { message: messages.emailIsRequired })
      .email({ message: "Please enter a valid email" }),
    position: z
      .string()
      .min(1, { message: "Please enter your current position in the company" }),
  })
  .superRefine((values, ctx) => {
    if (!values.isAddressSame && !values.currentAddress) {
      ctx.addIssue({
        message: "Please enter your current address",
        code: z.ZodIssueCode.custom,
        path: ["currentAddress"],
      });
    }
  });
// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;

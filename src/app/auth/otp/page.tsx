"use client";
import { Text } from "rizzui";
import OtpForm from "./otp-form";
import AuthWrapperThree from "@/app/shared/auth-layout/auth-wrapper-three";
import { useState } from "react";
import VerifyOtp from "./verifyOtp";

export default function ForgotPassword() {
  const [otp, setOtp] = useState(true);

  return (
    <AuthWrapperThree
      title={
        <>
          <span className=" text-black bg-clip-text">Create your account</span>
        </>
      }
      className="md:px-20 lg:px-36 lg:py-40"
    >
      {otp ? (
        <>
          <Text className="pb-7 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:-mt-1">
            Enter your mobile number to register
          </Text>
          <OtpForm />
        </>
      ) : (
        <>
          <Text className="pb-7 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:-mt-1">
            Enter your otp code
          </Text>
          <VerifyOtp />
        </>
      )}
    </AuthWrapperThree>
  );
}

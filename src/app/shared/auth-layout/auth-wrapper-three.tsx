"use client";

import Link from "next/link";
import { Button, Title } from "rizzui";
import cn from "@/utils/class-names";
import { PiArrowLeftBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import OrSeparation from "./or-separation";

export default function AuthWrapperThree({
  children,
  title,
  isSocialLoginActive = false,
  isSignIn = false,
  className = "",
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  className?: string;
}) {
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col justify-center shadow-md p-4 md:p-12 lg:p-28">
        <div
          className={cn(
            "mx-auto w-full max-w-md rounded-xl shadow-xl px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl dark:bg-gray-50",
            className
          )}
        >
          <div className="flex flex-col items-center">
            <p className="mb-7 inline-block max-w-[400px] lg:mb-9 md:text-3xl md:!leading-normal lg:text-4xl lg:leading-normal">
              JHATTAI RMS
            </p>
            <Title
              as="h3"
              className="mb-7 text-center text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl lg:leading-normal"
            >
              {title}
            </Title>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

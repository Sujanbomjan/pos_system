"use client";
import useLogin from "@/api/hooks/auth/useLogin";
import { useMedia } from "@/hooks/use-media";
import { useAuth } from "@/providers/AuthProvider";
import loginSchema from "@/utils/login.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Password } from "rizzui";

const defaultValues = {
  mobile_no: "9802011002",
  password: "password",
};

export default function SignInForm() {
  const [isPassword, setIsPassword] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(loginSchema),
  });
  const { login } = useAuth();

  const mutation = useLogin();
  const isMedium = useMedia("(max-width: 1200px)", false);

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        login(data.user, data.access_token, "/");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        }
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5 lg:space-y-6">
          <Input
            type="text"
            size={isMedium ? "lg" : "xl"}
            label="Mobile Number"
            placeholder="Enter your mobile number"
            className="[&>label>span]:font-medium"
            {...register("mobile_no")}
            error={errors.mobile_no?.message}
          />
          <Password
            label="Password"
            placeholder="Enter your password"
            size={isMedium ? "lg" : "xl"}
            className="[&>label>span]:font-medium"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button
            isLoading={mutation.isPending}
            disabled={mutation.isSuccess || mutation.isPending}
            className="w-full"
            type="submit"
            size={isMedium ? "lg" : "xl"}
          >
            Sign In
          </Button>
        </div>
      </form>
    </>
  );
}

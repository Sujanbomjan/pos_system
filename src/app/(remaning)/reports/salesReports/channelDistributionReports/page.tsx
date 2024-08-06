"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const toastId = "premium-user-toast-2";
    toast.dismiss(toastId);
    toast.error("This feature is only for premium users", { id: toastId });

    const timer = setTimeout(() => {
      router.push("/");
    }, 200);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <p>Only for Premium Users</p>
    </div>
  );
};

export default Page;

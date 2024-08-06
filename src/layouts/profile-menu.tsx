"use client";

import { routes } from "@/config/routes";
import cn from "@/utils/class-names";
import { Avatar, Button, Popover, Text, Title } from "rizzui";
// import { signOut } from 'next-auth/react';
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  {
    name: "My Profile",
    href: routes.forms.profile,
  },
  {
    name: "Password",
    href: routes.forms.profileSettings,
  },
];

function DropdownMenu() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleSignOut = () => {
    logout(routes.auth.signIn, "logged out successfully");
  };

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
          name="Albert Flores"
        />
        <div className="ms-3">
          <Title
            as="h6"
            className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-44"
          >
            {user?.name}
          </Title>
          <Text className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap w-44 !text-xs">
            {user?.email}
          </Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={routes.forms.profile}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => handleSignOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      <Popover.Trigger>
        <button
          className={cn(
            "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
            buttonClassName
          )}
        >
          <Avatar
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
            name="John Doe"
            className={cn("!h-9 w-9 sm:!h-10 sm:!w-10", avatarClassName)}
          />
          {!!username && (
            <span className="username hidden text-gray-200 md:inline-flex dark:text-gray-700">
              Hi, {user?.name}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </Popover>
  );
}

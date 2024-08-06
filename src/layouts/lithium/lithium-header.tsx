"use client";

import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";
import Logo from "@/components/ui/logo";
import HamburgerButton from "@/layouts/hamburger-button";
import Sidebar from "@/layouts/hydrogen/sidebar";
import NotificationDropdown from "@/layouts/notification-dropdown";
import ProfileMenu from "@/layouts/profile-menu";
import StickyHeader from "@/layouts/sticky-header";
import cn from "@/utils/class-names";
import Link from "next/link";
import SearchWidget from "@/components/search/search";
import {
  PiBellSimpleRingingDuotone,
  PiMagnifyingGlassDuotone,
} from "react-icons/pi";
import { ActionIcon, Badge } from "rizzui";
import TruckIcon from "@/components/icons/truck";
import dynamic from "next/dynamic";

const HeaderMenuLeft = dynamic(() => import("@/layouts/lithium/lithium-menu"), {
  ssr: false,
});

function HeaderMenuRight() {
  return (
    <div className="ms-auto flex shrink-0 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <ThemeToggler />
      {/* <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className={cn(
            " relative h-[34px] w-[34px] overflow-hidden rounded-full md:h-9 md:w-9 3xl:h-10 3xl:w-10 "
          )}
        >
          <PiChatsCircleDuotone className="h-6 w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
          />
        </ActionIcon>
      </MessagesDropdown> */}
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className={cn(
            "relative h-[34px] w-[34px] overflow-hidden rounded-full md:h-9 md:w-9 3xl:h-10 3xl:w-10"
          )}
        >
          <PiBellSimpleRingingDuotone className="h-6 w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
          />
        </ActionIcon>
      </NotificationDropdown>
      {/* <SettingsButton className="rounded-full text-gray-700 shadow-none backdrop-blur-none hover:text-gray-1000 3xl:h-10 3xl:w-10 dark:bg-gray-100/0">
        <PiGearDuotone className="h-[22px] w-auto animate-spin-slow" />
      </SettingsButton> */}
      <ProfileMenu
        buttonClassName="w-auto sm:w-auto p-1 border border-gray-300"
        avatarClassName="!w-7 !h-7 sm:!h-8 sm:!w-8"
      />
    </div>
  );
}

export default function Header() {
  return (
    <StickyHeader
      className={"z-[990] justify-between 2xl:py-5 2xl:pl-6 3xl:px-8 shadow-sm"}
    >
      <div className="hidden items-center gap-3 xl:flex">
        <Link
          aria-label="Site Logo"
          href={"/"}
          className="me-4 hidden w-[205px] shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:block"
        >
          <h2 className="text-primary mt-1">Jhattai RMS</h2>
        </Link>
        <HeaderMenuLeft />
      </div>
      <div className="flex w-full items-center gap-5 xl:w-auto 3xl:gap-6">
        <div className="flex w-full max-w-2xl items-center xl:w-auto">
          <HamburgerButton
            view={<Sidebar className="static w-full 2xl:w-full" />}
          />
          <Link
            aria-label="Site Logo"
            href={"/"}
            className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
          >
            <Logo iconOnly={true} />
          </Link>
          <SearchWidget
            icon={<PiMagnifyingGlassDuotone className="h-[20px] w-[20px]" />}
            className={cn(
              "text-gray-700 hover:text-gray-900 focus-visible:outline-0 active:translate-y-0 xl:border-0 xl:p-0 xl:shadow-none xl:backdrop-blur-none xl:hover:border-0 xl:hover:outline-0 xl:focus:outline-0 xl:focus-visible:outline-0 [&_.magnifying-glass]:me-0 [&_.placeholder-text]:hidden [&_.search-command]:ms-2 [&_.search-command]:hidden [&_.search-command]:lg:text-gray-0"
            )}
          />
        </div>
        <HeaderMenuRight />
      </div>
    </StickyHeader>
  );
}

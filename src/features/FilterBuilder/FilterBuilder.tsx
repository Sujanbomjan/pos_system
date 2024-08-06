"use client";

import { useMedia } from "@/hooks/use-media";
import useQueryParams from "@/hooks/use-pararms";
import cn from "@/utils/class-names";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { PiFunnel, PiMagnifyingGlassBold, PiXBold } from "react-icons/pi";
import { ActionIcon, Button, Input, Title } from "rizzui";

const Drawer = dynamic(() => import("rizzui").then((module) => module.Drawer), {
  ssr: false,
});

function FilterDrawerView({
  isOpen,
  drawerTitle,
  setOpenDrawer,
  children,
}: React.PropsWithChildren<{
  drawerTitle?: string;
  hasSearched?: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}>) {
  return (
    <Drawer
      size="sm"
      isOpen={isOpen ?? false}
      onClose={() => setOpenDrawer(false)}
      overlayClassName="dark:bg-opacity-40"
      containerClassName="dark:bg-gray-100"
      className="z-[9999]"
    >
      <div className="flex h-full flex-col p-5">
        <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-5 pb-4">
          <Title as="h5">{drawerTitle}</Title>
          <ActionIcon
            size="sm"
            rounded="full"
            variant="text"
            title={"Close Filter"}
            onClick={() => setOpenDrawer(false)}
          >
            <PiXBold className="h-4 w-4" />
          </ActionIcon>
        </div>
        <div className="flex-grow">
          <div className="grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
            {children}
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => setOpenDrawer(false)}
          className="mt-5 h-11 w-full text-sm"
        >
          Show Results
        </Button>
      </div>
    </Drawer>
  );
}

export type TableFilterProps = {
  children?: React.ReactNode;
  drawerTitle?: string;
  hasSearched?: boolean;
  showSearchOnTheRight?: boolean;
  enableDrawerFilter?: boolean;
  menu?: React.ReactNode;
  handleReset: () => void;
  searchKey: string;
  hideSearchInput?: boolean;
  searchPlaceholder?: string;
};

export default function FilterBuilder({
  drawerTitle = "Table Filters",
  hasSearched,
  enableDrawerFilter = false,
  showSearchOnTheRight = false,
  menu,
  children,
  handleReset,
  searchKey,
  hideSearchInput = false,
  searchPlaceholder,
}: TableFilterProps) {
  const isMediumScreen = useMedia("(max-width: 1280px)", false);
  const [showFilters, setShowFilters] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const { clearQueryParams, setQueryParams } = useQueryParams();

  const onSearchClear = () => {
    setSearchTerm("");
    setQueryParams(searchKey, "");
  };

  useEffect(() => {
    clearQueryParams();
  }, []);

  const { setMultipleQueryParams } = useQueryParams();

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setMultipleQueryParams({
      [searchKey]: e.target.value,
      page: 1,
    });
  };

  const handleClearFilter = () => {
    handleReset();
    clearQueryParams();
    setSearchTerm(""); // Clear the search term
  };

  return (
    <div className="table-filter flex items-center justify-between flex-1">
      <div className="flex flex-wrap items-center gap-4">
        {!hideSearchInput && !showSearchOnTheRight ? (
          <Input
            type="search"
            placeholder={searchPlaceholder || "Search by anything..."}
            value={searchTerm}
            onClear={onSearchClear}
            onChange={onSearchChange}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          />
        ) : null}

        {showSearchOnTheRight && enableDrawerFilter ? (
          <>{menu ? menu : null}</>
        ) : null}

        {children && (
          <>
            {isMediumScreen || enableDrawerFilter ? (
              <FilterDrawerView
                isOpen={openDrawer}
                setOpenDrawer={setOpenDrawer}
                drawerTitle={drawerTitle}
                hasSearched={hasSearched}
              >
                {children}
              </FilterDrawerView>
            ) : (
              <>{showFilters ? children : null}</>
            )}
          </>
        )}
      </div>

      <div className="ms-4 flex flex-shrink-0 items-center">
        {showSearchOnTheRight ? (
          <Input
            type="search"
            placeholder="Search by anything..."
            value={searchTerm}
            onClear={onSearchClear}
            onChange={onSearchChange}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            className="me-2.5 placeholder:text-red-100"
          />
        ) : null}

        {children ? (
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outline"
              color="danger"
              onClick={handleClearFilter}
              className={showFilters ? "flex me-1 h-9 pe-3 ps-2.5" : "hidden"}
            >
              Clear Filter
            </Button>

            <Button
              {...(isMediumScreen || enableDrawerFilter
                ? {
                    onClick: () => {
                      setOpenDrawer(() => !openDrawer);
                    },
                  }
                : { onClick: () => setShowFilters(() => !showFilters) })}
              variant={"outline"}
              className={cn(
                "me-2.5 h-9 pe-3 ps-2.5",
                !(isMediumScreen || enableDrawerFilter) &&
                  showFilters &&
                  "border-dashed border-gray-700"
              )}
            >
              <PiFunnel
                className="me-1.5 h-[18px] w-[18px]"
                strokeWidth={1.7}
              />
              {!(isMediumScreen || enableDrawerFilter) && showFilters
                ? "Hide Filters"
                : "Filters"}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

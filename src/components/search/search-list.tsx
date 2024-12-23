"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import {
  ActionIcon,
  Empty,
  SearchNotFoundIcon,
  Button,
  Title,
  Input,
  cn,
} from "rizzui";
import {
  PiFileTextDuotone,
  PiMagnifyingGlassBold,
  PiXBold,
} from "react-icons/pi";
import { pageLinks } from "@/components/search/page-links.data";

export default function SearchList({ onClose }: { onClose?: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const router = useRouter();

  let menuItemsFiltered = pageLinks;
  if (searchText.length > 0) {
    menuItemsFiltered = pageLinks.filter((item) => {
      const label = item.name.toLowerCase();
      return label.includes(searchText.toLowerCase());
    });
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && menuItemsFiltered.length > 0) {
      e.preventDefault();
      const selectedItem = menuItemsFiltered[highlightedIndex];
      if (selectedItem?.href) {
        router.push(selectedItem.href);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < menuItemsFiltered.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : menuItemsFiltered.length - 1
      );
    }
  };

  return (
    <>
      <div className="flex items-center px-5 py-4">
        <Input
          variant="flat"
          value={searchText}
          ref={inputRef}
          onChange={(e) => {
            setSearchText(e.target.value);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search here"
          className="flex-1"
          prefix={
            <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
          }
          suffix={
            searchText && (
              <Button
                size="sm"
                variant="text"
                className="h-auto w-auto px-0"
                onClick={() => {
                  setSearchText("");
                  setHighlightedIndex(0);
                }}
              >
                Clear
              </Button>
            )
          }
        />
        <ActionIcon
          variant="text"
          size="sm"
          className="ms-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      <div className="custom-scrollbar max-h-[60vh] overflow-y-auto border-t border-gray-300 px-2 py-4">
        {searchText.length === 0 ? (
          <Empty
            className="scale-75"
            image={<SearchNotFoundIcon />}
            text="Please enter a word to search"
            textClassName="text-xl"
          />
        ) : menuItemsFiltered.length === 0 ? (
          <Empty
            className="scale-75"
            image={<SearchNotFoundIcon />}
            text="No Result Found"
            textClassName="text-xl"
          />
        ) : (
          <>
            <Title
              as="h6"
              className="mb-5 px-3 font-semibold dark:text-gray-700"
            >
              Quick Page Links
            </Title>

            {menuItemsFiltered.map((item, index) => (
              <Fragment key={item.name + "-" + index}>
                {item?.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative my-0.5 flex items-center rounded-lg px-3 py-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-50/50 dark:hover:backdrop-blur-lg",
                      highlightedIndex === index &&
                        "bg-gray-200 dark:bg-gray-200"
                    )}
                  >
                    <span className="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-500">
                      <PiFileTextDuotone className="h-5 w-5" />
                    </span>

                    <span className="ms-3 grid gap-0.5">
                      <span className="font-medium capitalize text-gray-900 dark:text-gray-700">
                        {item.name}
                      </span>
                      <span className="text-gray-500">{item.href}</span>
                    </span>
                  </Link>
                ) : (
                  <Title
                    as="h6"
                    className={cn(
                      "mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500",
                      index !== 0 && "mt-6 4xl:mt-7"
                    )}
                  >
                    {item.name}
                  </Title>
                )}
              </Fragment>
            ))}
          </>
        )}
      </div>
    </>
  );
}

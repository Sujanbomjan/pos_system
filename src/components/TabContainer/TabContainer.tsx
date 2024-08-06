"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface TabItem {
  path: any;
  name: string;
}

interface TabContainerProps {
  tabItem: TabItem[];
}

const TabContainer: React.FC<TabContainerProps> = ({ tabItem }) => {
  let pathname = usePathname() || "/";

  return (
    <div className="p-[0.4rem] rounded-lg mb-4 sticky top-4 z-[100] backdrop-blur-md w-fit">
      <nav className="flex gap-2 relative justify-start w-fit z-[100] rounded-lg">
        {tabItem.map((item, index) => {
          const isActive = item.path === pathname;

          return (
            <Link
              key={item.path}
              className={`px-4 py-2 rounded-md decoration-2 text-sm lg:text-base relative font-semibold underline-offset-8 duration-300 ease-in ${
                isActive ? "underline text-primary" : "no-underline"
              }`}
              href={item.path}
            >
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default TabContainer;

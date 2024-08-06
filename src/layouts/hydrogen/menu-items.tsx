import { routes } from "@/config/routes";
import { IoIosAdd, IoMdDesktop } from "react-icons/io";
import { Md15Mp, Md18UpRating } from "react-icons/md";
import {
  PiAddressBookBold,
  PiAirTrafficControlDuotone,
  PiCurrencyCircleDollarDuotone,
} from "react-icons/pi";

interface IMenuItems {
  name: string;
  href?: string;
  icon?: JSX.Element;
  badge?: string;
  dropdownItems?: {
    name: string;
    href: string;
    dropdownItems?: {
      name: string;
      href: string;
    }[];
  }[];
}
export const menuItems: IMenuItems[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: <IoIosAdd />,
  },
  {
    name: "Masters",
    href: "#",
    icon: <PiCurrencyCircleDollarDuotone />,
    dropdownItems: [
      {
        name: "Settings",
        href: "#",
        dropdownItems: [
          {
            name: "Scheme",
            href: routes.masters.setting.scheme,
          },
          {
            name: "Salesman",
            href: routes.masters.setting.salesman.index,
          },
          {
            name: "Route Master",
            href: routes.masters.setting.routeMaster.index,
          },
          {
            name: "Coverage Plan",
            href: routes.masters.setting.coveragePlan,
          },
          {
            name: "Go Down",
            href: routes.masters.setting.goDown.index,
          },
          {
            name: "Company Info",
            href: routes.masters.setting.companyInfo,
          },
          {
            name: "Channel Sub",
            href: routes.masters.setting.channelSub,
          },
        ],
      },
      {
        name: "Product",
        href: "#",
        dropdownItems: [
          // {
          //   name: "Product Master",
          //   href: routes.masters.product.productMaster.index,
          // },
          {
            name: "Product Hierarchy",
            href: routes.masters.product.productHierarchy,
          },
        ],
      },
    ],
  },
  {
    name: "Reports",
    href: "#",
    icon: <PiAirTrafficControlDuotone />,
    dropdownItems: [
      {
        name: "Inventory Reports",
        href: "#",
        dropdownItems: [
          {
            name: "Closing Stock",
            href: routes.reports.inventoryReports.closingStock,
          },
          {
            name: "Current Stock",
            href: routes.reports.inventoryReports.currentStock,
          },
          {
            name: "Customer Transactions Reports",
            href: routes.reports.inventoryReports.customerTransactionReports,
          },
          {
            name: "Scheme Listing Reports",
            href: routes.reports.inventoryReports.schemeReports,
          },
        ],
      },
      {
        name: "Purchase Report",
        href: "#",
        dropdownItems: [
          {
            name: "Purchase Reports",
            href: routes.reports.purchaseReports,
          },
        ],
      },
      {
        name: "Tax Report",
        href: "#",
        dropdownItems: [
          {
            name: "One lakh Above Report",
            href: routes.reports.taxReports.oneLakhAboveReports,
          },
          {
            name: "Tax Utility Report",
            href: routes.reports.taxReports.taxUtilitiesReports,
          },
          {
            name: "Vat Purchase Report",
            href: routes.reports.taxReports.vatPurchaseReports,
          },
          {
            name: "Vat Sales Report",
            href: routes.reports.taxReports.vatSalesReports,
          },
        ],
      },
    ],
  },
  {
    name: "Inventory",
    href: "#",
    icon: <PiAddressBookBold />,
    dropdownItems: [
      {
        name: "Warehouses",
        href: routes.inventory.warehouse,
      },
    ],
  },
];

import { routes } from "@/config/routes";

export type SubMenuItemType = {
  name: string;
  href: string;
  permission?: string;
};

export type DropdownItemType = {
  name: string;
  icon: string;
  description?: string;
  href?: string;
  subMenuItems?: SubMenuItemType[];
  permission?: string;
};

export type LithiumMenuItem = {
  [key: string]: {
    name: string;
    type: string;
    href?: string;
    dropdownItems: DropdownItemType[];
    permission?: string;
  };
};

export const lithiumMenuItems: LithiumMenuItem = {
  product: {
    name: "Products",
    type: "single",
    href: routes.productMaster.index,
    dropdownItems: [],
    permission: "Sma Products",
  },

  purchase: {
    name: "Purchase",
    type: "single",
    href: routes.purchase.purchase,
    dropdownItems: [],
    permission: "Sma Purchases",
  },

  sales: {
    name: "Sales",
    type: "single",
    href: routes.sales.sales,
    dropdownItems: [],
    permission: "Sma Sales",
  },
  appsKit: {
    name: "Masters",
    type: "enhance",
    dropdownItems: [
      {
        name: "Setting",
        description:
          "Centralized control panel for configuring core application settings.",
        icon: "ShipIcon",
        subMenuItems: [
          {
            name: "Scheme",
            href: routes.masters.setting.scheme,
            permission: "Sma Scheme",
          },
          {
            name: "Brands",
            href: routes.masters.setting.brands,
            permission: "Sma Brands",
          },
          {
            name: "Currencies",
            href: routes.masters.setting.currency,
            permission: "Sma Currencies",
          },
          {
            name: "Expense Category",
            href: routes.masters.setting.expenseCategory,
            permission: "Sma Expense Categories",
          },
          {
            name: "Expenses",
            href: routes.masters.setting.expenses,
            permission: "Sma Expenses",
          },
          {
            name: "Categories",
            href: routes.masters.setting.categories,
            permission: "Sma Categories",
          },
          {
            name: "SalesMan",
            href: routes.masters.setting.salesman.index,
            permission: "Sma Salesmen",
          },
          {
            name: "Route Master",
            href: routes.masters.setting.routeMaster.index,
            permission: "Sma Routes",
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
            permission: "Sma Companies",
          },
          {
            name: "Channel Sub",
            href: routes.masters.setting.channelSub,
          },
        ],
      },
      {
        name: "Roles & Permissions",
        description: "Customize Roles and Permissions",
        icon: "BulbSolidIcon",
        subMenuItems: [
          {
            name: "View Roles",
            href: routes.masters.roles_permission.viewRoles,
            permission: "Sma Assign Role",
          },
          {
            name: "Create Roles",
            href: routes.masters.roles_permission.createRoles,
            permission: "Sma Assign Role",
          },
        ],
      },
      {
        name: "Users",
        description: "Customize Users",
        icon: "BulbSolidIcon",
        subMenuItems: [
          {
            name: "View Users",
            href: routes.masters.users.viewUsers,
            permission: "Sma Assign Role",
          },
          {
            name: "Create Users",
            href: routes.masters.users.createUsers,
            permission: "Sma Assign Role",
          },
        ],
      },
    ],
  },
  reports: {
    name: "Reports",
    type: "enhance",
    dropdownItems: [
      {
        name: "Inventory Reports",
        description:
          "Summarized data on inventory levels, transactions, and related metrics.",
        icon: "BulbSolidIcon",
        subMenuItems: [
          {
            name: "Closing Stock Report",
            href: routes.reports.inventoryReports.closingStock,
          },
          {
            name: "Current Stock Report",
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
        icon: "BrushSolidIcon",
        description:
          "Summarized data on purchases, including supplier information, purchase quantities, costs, and related metrics.",
        subMenuItems: [
          {
            name: "Product Purchase Reports",
            href: routes.reports.purchaseReports,
          },
        ],
      },
      {
        name: "Sales Report",
        icon: "ChatSolidIcon",
        description:
          "Summarized data on sales transactions, including product sales, revenue, customer information, and related metrics.",
        subMenuItems: [
          {
            name: "Billwise Product Sales Report",
            href: routes.reports.salesReports.billWiseProductReports,
          },
          {
            name: "Billwise Retailers Sales Report",
            href: routes.reports.salesReports.billWiseRetailerReports,
          },
          {
            name: "Channel Distrubtion Report",
            href: routes.reports.salesReports.channelDistrubtionReports,
          },
          {
            name: "Effective Coverage Analysis Report",
            href: routes.reports.salesReports.effectiveCoverageReports,
          },
          {
            name: "Net Sales",
            href: routes.reports.salesReports.netSales,
          },
          {
            name: "Product Bill Tax Reports",
            href: routes.reports.salesReports.productBillTaxReports,
          },
          {
            name: "Product Summary Sale",
            href: routes.reports.salesReports.productSummarySale,
          },
          {
            name: "Product wise Sales Report",
            href: routes.reports.salesReports.productWiseSaleReports,
          },
          {
            name: "RDBN By Channel",
            href: routes.reports.salesReports.rdbnByChannel,
          },
          {
            name: "RDBN Value By Channel",
            href: routes.reports.salesReports.rdbnValueByChannel,
          },
          {
            name: "Sales Return Report Detail",
            href: routes.reports.salesReports.salesReturnReports,
          },
        ],
      },
      {
        name: "Tax Report",
        icon: "BrushSolidIcon",
        description:
          "Summarized data on taxes collected or paid, including tax rates, taxable transactions, amounts, and related metrics.",
        subMenuItems: [
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
  inventory: {
    name: "Inventory",
    type: "link",
    dropdownItems: [
      {
        name: "Warehouses",
        icon: "BrushSolidIcon",
        href: routes.inventory.warehouse,
        permission: "Sma Warehouses",
      },
      {
        name: "Warehouse Products",
        icon: "ChatSolidIcon",
        href: routes.inventory.warehouseProduct,
        permission: "Sma Warehouse Products",
      },
      {
        name: "Transfers",
        icon: "ChatSolidIcon",
        href: routes.inventory.warehouseTransfer.warehouseTransfer,
        permission: "Sma Transfers",
      },
    ],
  },
};

export type LithiumMenuItemsKeys = keyof typeof lithiumMenuItems;

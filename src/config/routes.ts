"use client";

export const routes = {
  productMaster: {
    index: "/masters/product/productMaster",
    edit: (productId: string) =>
      `/masters/product/productMaster/edit/${productId}`,
    addProduct: "/masters/product/productMaster/add",
  },

  purchase: {
    purchase: "/transactions/purchase",
    createPurchase: "/transactions/purchase/create",
    createPurchaseByCsv: "/transactions/purchase/create-csv",
    editPurchase: (id: string) => `/transactions/purchase/edit/${id}`,
    purchaseInvoice: "/transactions/purchase/purchaseInvoice",
    purchaseReturn: (id: string) =>
      `/transactions/purchase/purchaseReturn/${id}`,
  },

  sales: {
    sales: "/transactions/sales",
    editSales: (id: string) => `/transactions/sales/edit/${id}`,
    createSales: "/transactions/sales/create",
    createSalesByCsv: "/transactions/sales/create-csv",
    invoiceDetails: "/transactions/sales/invoiceDetails",
    salesInvoiceCreate: "/transactions/sales/salesInvoiceCreate",
    salesReturn: (id: string) => `/transactions/sales/salesReturn/${id}`,
    selfBill: "/transactions/sales/salesReturn",
  },

  auth: {
    signIn: "/auth/sign-in",
    forgotPassword: "/auth/forgot-password",
    otp: "/auth/otp",
  },
  forms: {
    profileSettings: "/forms/profileSettings",
    profile: "/forms/profile",
  },
  masters: {
    setting: {
      scheme: "/masters/setting/scheme",
      salesman: {
        index: "/masters/setting/salesman",
        addSalesman: "/masters/setting/salesman/add",
        addWithRouteDetails: "/masters/setting/salesman/addWithRouteDetails",
      },
      currency: "/masters/setting/currency",
      brands: "/masters/setting/brands",
      expenses: "/masters/setting/expenses",
      categories: "/masters/setting/categories",
      expenseCategory: "/masters/setting/expense-category",
      routeMaster: {
        index: "/masters/setting/routeMaster",
        routeMasterEdit: "/masters/setting/routeMaster/edit",
      },
      monthlySchedule: "/masters/setting/monthlySchedule",
      coveragePlan: "/masters/setting/coveragePlan",
      goDown: {
        index: "/masters/setting/goDown",
        goDownAdd: "/masters/setting/goDown/add",
        goDownWithType: "/masters/setting/goDown/goDownWithType",
      },
      companyInfo: "/masters/setting/companyInfo",
      channelSub: "/masters/setting/channelSub",
    },
    roles_permission: {
      viewRoles: "/masters/roles-permission",
      createRoles: "/masters/roles-permission/create",
      editRoles: (id: string) => `/masters/roles-permission/edit/${id}`,
    },
    users: {
      viewUsers: "/masters/users",
      createUsers: "/masters/users/create",
    },
    product: {
      productHierarchy: "/masters/product/productHierarchy",
      priceHistory: "/masters/product/priceHistory",
    },
  },
  reports: {
    inventoryReports: {
      closingStock: "/reports/inventoryReports/closingStock",
      currentStock: "/reports/inventoryReports/currentStock",
      customerTransactionReports:
        "/reports/inventoryReports/customerTransactionReports",
      schemeReports: "/reports/inventoryReports/schemeReports",
    },
    purchaseReports: "/reports/purchaseReports",
    salesReports: {
      billWiseProductReports: "/reports/salesReports/billWiseProductReports",
      billWiseRetailerReports: "/reports/salesReports/billWiseRetailerReports",
      channelDistrubtionReports:
        "/reports/salesReports/channelDistributionReports",
      effectiveCoverageReports:
        "/reports/salesReports/effectiveCoverageReports",
      netSales: "/reports/salesReports/netSales",
      productBillTaxReports: "/reports/salesReports/productBillTaxReports",
      productSummarySale: "/reports/salesReports/productSummarySale",
      productWiseSaleReports: "/reports/salesReports/productWiseSaleReports",
      rdbnByChannel: "/reports/salesReports/rdbnByChannel",
      rdbnValueByChannel: "/reports/salesReports/rdbnValueByChannel",
      salesReturnReports: "/reports/salesReports/salesReturnReports",
    },
    taxReports: {
      oneLakhAboveReports: "/reports/taxReports/oneLakhAboveReports",
      taxUtilitiesReports: "/reports/taxReports/taxUtilitiesReports",
      vatPurchaseReports: "/reports/taxReports/vatPurchaseReports",
      vatSalesReports: "/reports/taxReports/vatSalesReports",
    },
  },
  inventory: {
    // inventory: "/transactions/inventory",
    warehouse: "/masters/setting/warehouse",
    warehouseProduct: "/masters/product/warehouse-product",
    warehouseTransfer: {
      warehouseTransfer: "/transactions/warehouse-transfer",
      createTransfer: "/transactions/warehouse-transfer/create",
      createTransferByCsv: "/transactions/warehouse-transfer/create-csv",
      editWarehouseTransfer: (id: string) =>
        `/transactions/warehouse-transfer/edit/${id}`,
    },
  },
};

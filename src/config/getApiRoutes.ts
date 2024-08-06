const routes = {
  login: () => "/login",

  getBrandById: (brandId?: string) => `/sma-brands/${brandId}`,
  editBrand: (brandId?: string) => `/sma-brands/${brandId}`,
  deleteBrand: (brandId?: string) => `sma-brands/${brandId}`,

  getCurrencyById: (currencyId?: string) => `/sma-currencies/${currencyId}`,
  editCurrency: (currencyId?: string) => `/sma-currencies/${currencyId}`,
  deleteCurrency: (currencyId?: string) => `/sma-currencies/${currencyId}`,

  getExpenseCategoryById: (expenseId?: string) =>
    `/sma-expense-categories/${expenseId}`,
  editExpenseCategory: (expenseId?: string) =>
    `/sma-expense-categories/${expenseId}`,
  deleteExpenseCategory: (expenseId?: string) =>
    `/sma-expense-categories/${expenseId}`,

  getExpensesById: (expensesId?: string) => `sma-expenses/${expensesId}`,
  editExpenses: (expensesId?: string) => `sma-expenses/${expensesId}`,
  deleteExpenses: (expensesId?: string) => `sma-expenses/${expensesId}`,

  addWarehouse: () => `/sma-warehouses`,
  deleteWarehouse: (warehouseId?: string) => `/sma-warehouses/${warehouseId}`,
  editWarehouse: (warehouseId?: string) => `/sma-warehouses/${warehouseId}`,
  getWarehouseById: (warehouseId?: string) => `/sma-warehouses/${warehouseId}`,

  addWarehouseProduct: () => `/sma-warehouse-products`,
  deleteWarehouseProduct: (warehouseProductId?: string) =>
    `/sma-warehouse-products/${warehouseProductId}`,
  editWarehouseProduct: (warehouseProductId?: string) =>
    `/sma-warehouse-products/${warehouseProductId}`,
  getWarehouseProductById: (warehouseProductId?: string) =>
    `/sma-warehouse-products/${warehouseProductId}`,

  editCategories: (categoriesId?: string) => `sma-categories/${categoriesId}`,
  getCategoriesById: (categoriesId?: string) =>
    `sma-categories/${categoriesId}`,
  deleteCategories: (categoriesId?: string) => `sma-categories/${categoriesId}`,

  deletePurchase: (purchaseId?: string) => `sma-purchases/${purchaseId}`,
  deleteTransfer: (transferId?: string) => `sma-transfers/${transferId}`,

  deleteSales: (salesId?: string) => `sma-sales/${salesId}`,

  getProducts: () => `sma-products`,
  deleteProduct: (id?: string) => `sma-products/${id}`,
  getProductById: (id?: string) => `product/${id}`,
  editProduct: (id?: string) => `sma-products/${id}`,

  uploadFile: () => "jhattai/file-upload",
};

const getApiRoute = (
  service: keyof typeof routes
): ((id?: string, id2?: string) => string) => {
  return routes[service];
};

export default getApiRoute;

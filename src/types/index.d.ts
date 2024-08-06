type Brands = {
  data: BrandItem[];
};

export interface SingleBrand {
  data: BrandItem;
}

interface BrandItem {
  id: number;
  code: string;
  name: string;
  image: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
type Currency = {
  data: Currencies[];
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};
export interface SingleCurrencies {
  data: Currencies;
}
export interface Currencies {
  id: number;
  code: string;
  name: string;
  rate: string;
  auto_update: boolean;
  symbol: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ExpenseCategories {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  data: ExpenseCategory[];
}
export interface SingleExpenseCategory {
  data: ExpenseCategory;
}

export interface ExpenseCategory {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deleted_at: Date;
  causer_id: string;
}
export interface Expenses {
  data: Expense[];
}
export interface SingleExpenses {
  data: Expense;
}
export interface Expense {
  data: ExpenseItem;
}
export interface ExpenseItem {
  id: number;
  reference: string;
  amount: string;
  note: string;
  created_by: string;
  attachment: [];
  category_id: number;
  warehouse_id: number;
  created_at: string;
  updated_at: string;
}
export interface Warehouses {
  data: SingleWarehouse[];
}
export interface SingleWarehouse {
  current_page: number;
  data: Warehouse[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
export interface WarehouseData {
  data: Warehouse;
}
export interface Warehouse {
  id: number;
  code: string;
  name: string;
  address: string;
  map: string;
  phone: string;
  email: string;
  price_group_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: date;
  causer_id: number;
}
export interface WarehouseProducts {
  data: WarehouseProduct[];
}
export interface SingleWarehouseProduct {
  data: WarehouseProduct;
}
export interface WarehouseProduct {
  data: {
    id: number;
    product_id: number;
    warehouse_id: number;
    quantity: number;
    rack: string;
    avg_cost: number;
    created_at: string;
    updated_at: string;
  };
}
export interface Categories {
  data: SingleCategories[];
}
export interface SingleCategories {
  data: Category[];
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
export interface CategoryItem {
  data: Category;
}

export interface Category {
  id: any;
  code: any;
  name: any;
  image: any;
  parent_id: any;
  slug: any;
  description: any;
  createdAt: any;
  updatedAt: any;
  deleted_at: any;
  causer_id: number;
}

export interface ProductItem {
  id: number;
  code: string;
  name: string;
  unit: { id: number; name: string; base_unit: number; code: string };
  cost: string;
  price: string;
  alert_quantity: string;
  image: string;
  category_id: { parent_id: number };
  subcategory_id: { id: number };
  category: {
    name: string;
    code: string;
    id: number;
    image: string;
  };
  cf1: string;
  cf2: null;
  cf3: null;
  cf4: null;
  cf5: null;
  cf6: null;
  quantity: string;
  tax_rate: number;
  tax: {
    id: number;
    title: string;
    type: string;
    value: number;
  };
  track_quantity: number;
  details: string;
  warehouse: number;
  barcode_symbology_id: string;
  file: string;
  product_details: string;
  tax_method: number;
  type: string;
  supplier1: any;
  supplier1price: any;
  promotion: number;
  promo_price: string;
  start_date: Date;
  end_date: Date;
  supplier1_part_no: any;
  sale_unit: number;
  purchase_unit: number;
  brand: { id: number; code: string; name: string; image: string };
  slug: string;
  featured: number;
  weight: string;
  hsn_code: number;
  views: number;
  hide: number;
  second_name: string;
  hide_pos: number;
  created_at: Date;
  causer_id: number;
  product_variants: any[];
  warehouse_product_variants: any[];
  warehouse_products: {
    warehouse_id: number;
    quantity: string;
    avg_cost: string;
    warehouse: Warehouse;
  }[];
  photos: { photo: any[] }[];
}

export interface Unit {
  id: number;
  code: string;
  name: string;
  base_unit: number;
  operator: string;
  unit_value: string;
  operation_value: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
}

export interface Company {
  id: number;
  group_id: number;
  group_name: string;
  customer_group_id: number;
  customer_group_name: string;
  name: string;
  company: string;
  vat_no: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  cf1: null;
  cf2: null;
  cf3: null;
  cf4: null;
  cf5: null;
  cf6: null;
  invoice_footer: string;
  payment_term: number;
  logo: string;
  award_points: number;
  deposit_amount: null;
  price_group_id: number;
  price_group_name: string;
  gst_no: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
}

export interface SalesItem {
  id: number;
  date: string;
  reference_no: string;
  customer_id: number;
  customer: Customer;
  biller_id: number;
  biller: Customer;
  warehouse_id: number;
  note: string;
  staff_note: any;
  total: string;
  product_discount: string;
  order_discount_id: any;
  total_discount: string;
  order_discount: string;
  product_tax: string;
  order_tax_id: any;
  order_tax: string;
  total_tax: string;
  shipping: string;
  grand_total: string;
  sale_status: string;
  payment_status: string;
  payment_term: any;
  due_date: any;
  created_by: CreatedUpdatedBy;
  updated_by: CreatedUpdatedBy;
  total_items: number;
  pos: number;
  paid: string;
  return_id: number;
  surcharge: string;
  attachment: any;
  return_sale_ref: any;
  sale_id: any;
  return_sale_total: string;
  rounding: any;
  suspend_note: any;
  api: number;
  shop: number;
  address_id: number;
  reserve_id: any;
  hash: any;
  manual_payment: any;
  cgst: any;
  sgst: any;
  igst: any;
  payment_method: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
  sale_items: SaleItem[];
  address: Address;
  warehouse: Warehouse;
  causer: Causer;
  return?: ReturnProduct;
  tax?: any;
}

interface ReturnProduct {
  id: number;
  date: Date;
  reference_no: string;
  customer_id: number;
  customer: string;
  biller_id: number;
  biller: string;
  warehouse_id: number;
  note: null;
  staff_note: null;
  total: string;
  product_discount: string;
  order_discount_id: null;
  total_discount: string;
  order_discount: string;
  product_tax: string;
  order_tax_id: null;
  order_tax: string;
  total_tax: string;
  grand_total: string;
  created_by: number;
  updated_by: null;
  total_items: number;
  paid: string;
  surcharge: string;
  attachment: null;
  hash: null;
  cgst: null;
  sgst: null;
  igst: null;
  shipping: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
  return_items: ReturnItem[];
}

interface ReturnItem {
  id: number;
  return_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  product_type: null;
  option_id: null;
  net_unit_price: string;
  unit_price: string;
  quantity: string;
  warehouse_id: number;
  item_tax: null;
  tax_rate_id: null;
  tax: string;
  discount: null;
  item_discount: string;
  subtotal: string;
  serial_no: null;
  real_unit_price: string;
  product_unit_id: number;
  product_unit_code: string;
  unit_quantity: string;
  comment: null;
  gst: null;
  cgst: null;
  sgst: null;
  igst: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
}

interface SaleItem {
  id: number;
  sale_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  product_type: null;
  option_id: null;
  net_unit_price: string;
  unit_price: string;
  quantity: string;
  warehouse_id: number;
  item_tax: string;
  tax_rate_id: number;
  tax: null;
  discount: string;
  item_discount: string;
  subtotal: string;
  serial_no: string;
  real_unit_price: string;
  sale_item_id: null;
  product_unit_id: number;
  product_unit_code: string;
  unit_quantity: string;
  comment: string;
  gst: string;
  cgst: string;
  sgst: string;
  igst: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
  options: null;
  causer: Causer;
  warehouse: Warehouse;
  unit: Unit;
}

export interface Customer {
  id: number;
  group_id: number;
  group_name: string;
  customer_group_id: number;
  customer_group_name: string;
  name: string;
  company: string;
  vat_no: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  cf1: any;
  cf2: any;
  cf3: any;
  cf4: any;
  cf5: any;
  cf6: any;
  invoice_footer: string;
  payment_term: number;
  logo: string;
  award_points: number;
  deposit_amount: any;
  price_group_id: number;
  price_group_name: string;
  gst_no: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
}

export interface CreatedUpdatedBy {
  id: number;
  client_id: number;
  name: string;
  email: string;
  email_verified_at: string;
  mobile_no: string;
  fcm_token: string;
  status: number;
  google2fa_secret: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  desktop_fcm: any;
  phone_verified_at: string;
  should_change_password: number;
  should_change_password_message: any;
  user_type_id: number;
  gender: string;
  duplicateFcmReg: any;
  special1: any;
  special2: any;
  special3: any;
  special4: any;
  should_forget_password: number;
  user_category: any;
  twofa_status: number;
}

export interface Address {
  id: number;
  company_id: number;
  line1: string;
  line2: string;
  city: string;
  postal_code: string;
  state: string;
  country: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
}

export interface Causer {
  id: number;
  client_id: number;
  name: string;
  email: string;
  email_verified_at: string;
  mobile_no: string;
  fcm_token: string;
  status: number;
  google2fa_secret: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  desktop_fcm: any;
  phone_verified_at: string;
  should_change_password: number;
  should_change_password_message: any;
  user_type_id: number;
  gender: string;
  duplicateFcmReg: any;
  special1: any;
  special2: any;
  special3: any;
  special4: any;
  should_forget_password: number;
  user_category: any;
  twofa_status: number;
}

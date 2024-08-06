export interface PurchaseItem {
  id: number;
  reference_no: string;
  supplier_id: number;
  supplier: Supplier;
  warehouse_id: number;
  note: string;
  total: string;
  product_discount: null;
  order_discount_id: null;
  order_discount: null;
  total_discount: string;
  product_tax: null;
  order_tax_id: null;
  order_tax: null;
  total_tax: string;
  shipping: string;
  grand_total: string;
  paid: string;
  status: string;
  payment_status: string;
  created_by: Causer;
  updated_by: null;
  attachment: null;
  payment_term: null;
  due_date: null;
  return_id: null;
  surcharge: string;
  return_purchase_ref: null;
  purchase_id: null;
  return_purchase_total: string;
  cgst: null;
  sgst: null;
  igst: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
  warehouse: Warehouse;
  purchase_items: SinglePurchaseItem[];
  causer: Causer;
  tax: null;
  return?: ReturnProduct;
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

interface Warehouse {
  id: number;
  code: string;
  name: string;
  address: string;
  map: null;
  phone: string;
  email: string;
  price_group_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
}

interface Supplier {
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

interface Causer {
  id: number;
  client_id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  mobile_no: string;
  fcm_token: string;
  status: number;
  google2fa_secret: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  desktop_fcm: null;
  phone_verified_at: Date;
  should_change_password: number;
  should_change_password_message: null;
  user_type_id: number;
  gender: string;
  duplicateFcmReg: null;
  special1: null;
  special2: null;
  special3: null;
  special4: null;
  should_forget_password: number;
  user_category: null;
  twofa_status: number;
}

interface Purchase {
  id: number;
  reference_no: string;
  supplier_id: number;
  supplier: string;
  warehouse_id: number;
  note: string;
  total: string;
  product_discount: null;
  order_discount_id: null;
  order_discount: null;
  total_discount: string;
  product_tax: null;
  order_tax_id: null;
  order_tax: null;
  total_tax: string;
  shipping: string;
  grand_total: string;
  paid: string;
  status: string;
  payment_status: string;
  created_by: number;
  updated_by: null;
  attachment: null;
  payment_term: null;
  due_date: null;
  return_id: null;
  surcharge: string;
  return_purchase_ref: null;
  purchase_id: null;
  return_purchase_total: string;
  cgst: null;
  sgst: null;
  igst: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
}

interface SinglePurchaseItem {
  id: number;
  purchase_id: number;
  transfer_id: null;
  product_id: number;
  option_id: null;
  net_unit_cost: string;
  quantity: string;
  warehouse_id: number;
  item_tax: null;
  tax_rate_id: null;
  tax: string;
  discount: null;
  item_discount: string;
  expiry: null;
  subtotal: string;
  quantity_balance: string;
  date: Date;
  status: string;
  unit_cost: null;
  real_unit_cost: null;
  quantity_received: string;
  supplier_part_no: null;
  purchase_item_id: null;
  product_unit_id: number;
  product_unit_code: string;
  unit_quantity: string;
  gst: null;
  cgst: null;
  sgst: null;
  igst: null;
  base_unit_cost: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
  purchase: Purchase;
  product: Product | null;
  warehouse: Warehouse;
  variant: null;
  causer: Causer;
}

interface Product {
  id: number;
  code: string;
  name: string;
  barcode_symbology_id: number;
  product_type_id: null;
  unit: number;
  cost: string;
  price: string;
  alert_quantity: string;
  image: string;
  category_id: number;
  subcategory_id: number;
  cf1: null;
  cf2: null;
  cf3: null;
  cf4: null;
  cf5: null;
  cf6: null;
  quantity: string;
  tax_rate: number;
  track_quantity: number;
  details: null;
  warehouse: null;
  file: string;
  product_details: string;
  tax_method: number;
  type: string;
  supplier1: number;
  supplier1price: string;
  promotion: number;
  promo_price: string;
  start_date: null;
  end_date: null;
  supplier1_part_no: string;
  sale_unit: number;
  purchase_unit: number;
  brand: number;
  slug: null | string;
  featured: number;
  weight: string;
  hsn_code: null;
  views: number;
  hide: number;
  second_name: string;
  hide_pos: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
}
export interface WarehouseTransfer {
  status: boolean
  state: string
  data: Data
}

export interface Data {
  id: number
  transfer_no: string
  from_warehouse_id: number
  from_warehouse_code: string
  from_warehouse_name: string
  to_warehouse_id: number
  to_warehouse_code: string
  to_warehouse_name: string
  note: string
  total: string
  total_tax: string
  grand_total: string
  created_by: number
  status: string
  shipping: string
  attachment: any
  cgst: string
  sgst: string
  igst: string
  created_at: string
  updated_at: string
  deleted_at: any
  causer_id: number
  nepali_created_at: any
  nepali_updated_at: any
  from_warehouse: FromWarehouse
  to_warehouse: ToWarehouse
  transfer_items: any[]
  causer: Causer
}

export interface FromWarehouse {
  id: number
  code: string
  name: string
  address: string
  map: string
  phone: string
  email: string
  price_group_id: number
  created_at: string
  updated_at: string
  deleted_at: any
  causer_id: number
  nepali_created_at: string
  nepali_updated_at: string
}

export interface ToWarehouse {
  id: number
  code: string
  name: string
  address: string
  map: string
  phone: string
  email: string
  price_group_id: number
  created_at: string
  updated_at: string
  deleted_at: any
  causer_id: number
  nepali_created_at: string
  nepali_updated_at: string
}

export interface Causer {
  id: number
  client_id: number
  name: string
  email: string
  email_verified_at: string
  mobile_no: string
  fcm_token: string
  status: number
  google2fa_secret: any
  created_at: string
  updated_at: string
  deleted_at: any
  desktop_fcm: any
  phone_verified_at: string
  should_change_password: number
  should_change_password_message: any
  user_type_id: number
  gender: string
  duplicateFcmReg: any
  special1: any
  special2: any
  special3: any
  special4: any
  should_forget_password: number
  user_category: any
  twofa_status: number
}


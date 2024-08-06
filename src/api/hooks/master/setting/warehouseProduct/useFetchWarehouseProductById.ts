import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface SingleWarehouseProduct {
  data: Data;
}

export interface Data {
  id: number;
  product_id: number;
  warehouse_id: number;
  quantity: string;
  rack: any;
  avg_cost: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
  product: Product;
  warehouse: Warehouse;
  causer: Causer;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  barcode_symbology_id: number;
  product_type_id: any;
  unit: number;
  cost: string;
  price: string;
  alert_quantity: string;
  image: string;
  category_id: number;
  subcategory_id: any;
  cf1: any;
  cf2: any;
  cf3: any;
  cf4: any;
  cf5: any;
  cf6: any;
  quantity: string;
  tax_rate: number;
  track_quantity: number;
  details: any;
  warehouse: any;
  file: any;
  product_details: string;
  tax_method: number;
  type: string;
  supplier1: any;
  supplier1price: string;
  promotion: number;
  promo_price: any;
  start_date: any;
  end_date: any;
  supplier1_part_no: any;
  sale_unit: number;
  purchase_unit: number;
  brand: number;
  slug: any;
  featured: any;
  weight: string;
  hsn_code: any;
  views: number;
  hide: number;
  second_name: any;
  hide_pos: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
}

export interface Warehouse {
  id: number;
  code: string;
  name: string;
  address: string;
  map: any;
  phone: string;
  email: string;
  price_group_id: number;
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

const getWarehouseProduct = async (
  api: AxiosInstance,
  warehouseId: string,
): Promise<SingleWarehouseProduct> => {
  const route = getApiRoute("getWarehouseProductById")(warehouseId);
  const result = await api.get(route);
  return result.data;
};

const useFetchWarehouseProductById = (warehouseId: string) => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["brands", warehouseId],
    queryFn: () => getWarehouseProduct(api, warehouseId),
    enabled: !!warehouseId,
  });
  return result;
};

export default useFetchWarehouseProductById;

"use client";
import useCreateApi from "@/api/useCreateApi";
import { dateString } from "@/utils/date-formatter";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";
export interface WarehouseProducts {
  data: Daum[];
}

export interface Daum {
  current_page: number;
  data: Daum2[];
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Daum2 {
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
  product?: Product;
  warehouse?: Warehouse;
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
  map?: string;
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
  limit: string,
  page: string,
  warehouse_id: string,
  product_id: string,
  from: string,
  to: string,
  sortId: string,
  sortOrder: string,
  isBS: string
): Promise<WarehouseProducts> => {
  const route = "/sma-warehouse-products";
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&warehouse_id=${warehouse_id}&product_id=${product_id}` +
      (from && `&from=${dateString(from, !!isBS)}`) +
      (to && `&to=${dateString(to, !!isBS)}`) +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};

const useFetchWarehouseProduct = (initialCount?: string) => {
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || initialCount || "10";
  const page = searchParams.get("page") || "1";
  const warehouse_id = searchParams.get("warehouse_id") || "";
  const product_id = searchParams.get("product_id") || "";
  const date = searchParams.get("date") || "";
  const sortId = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortDirection") || "";
  const isBS = searchParams.get("bs") || "";

  const bsStartDate = searchParams.get("start-date");
  const bsEndDate = searchParams.get("end-date");

  const from = date.split("-")[0] || bsStartDate || "";
  const to = date.split("-")[1] || bsEndDate || "";

  const result = useQuery({
    queryKey: [
      "warehouseproduct",
      limit,
      page,
      warehouse_id,
      product_id,
      from,
      to,
      sortId,
      sortOrder,
    ],
    queryFn: () =>
      getWarehouseProduct(
        api,
        limit,
        page,
        warehouse_id,
        product_id,
        from,
        to,
        sortId,
        sortOrder,
        isBS
      ),
    placeholderData: keepPreviousData,
  });
  return result;
};

export const useMutationFetchWarehouseProducts = ({
  productLimit = "10",
  warehouse_id,
}: {
  productLimit?: string;
  warehouse_id: string;
}) => {
  const client = useQueryClient();
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const warehouse = searchParams.get("warehouse_id") || warehouse_id || "";
  const product_id = searchParams.get("product_id") || "";
  const date = searchParams.get("date") || "";
  const sortId = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortDirection") || "";
  const isBS = searchParams.get("bs") || "";

  const bsStartDate = searchParams.get("start-date");
  const bsEndDate = searchParams.get("end-date");

  const from = date.split("-")[0] || bsStartDate || "";
  const to = date.split("-")[1] || bsEndDate || "";

  const mutation = useMutation({
    mutationFn: (data) =>
      getWarehouseProduct(
        api,
        limit,
        page,
        warehouse,
        product_id,
        from,
        to,
        sortId,
        sortOrder,
        isBS
      ),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        predicate: (query) => {
          return ["warehouse-product"].includes(query.queryKey[0] as string);
        },
      });
    },
  });
  return mutation;
};

export default useFetchWarehouseProduct;

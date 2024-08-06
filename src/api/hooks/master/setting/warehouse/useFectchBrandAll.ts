"use client";
import useCreateApi from "@/api/useCreateApi";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

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
  deleted_at: Date;
  causer_id: number;
}

const getWarehouse = async (api: AxiosInstance): Promise<Warehouses> => {
  const route = "/sma-warehouses";
  const result = await api.get(route + `?perPage=1000`);
  return result.data;
};

const useFetchWarehouseAll = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["warehouse-all"],
    queryFn: () => getWarehouse(api),
  });
  return result;
};

export default useFetchWarehouseAll;

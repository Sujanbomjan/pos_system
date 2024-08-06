"use client";
import useCreateApi from "@/api/useCreateApi";
import { Warehouses } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getWarehouse = async (api: AxiosInstance): Promise<Warehouses> => {
  const route = "/sma-warehouses";
  const result = await api.get(route + `?perPage=1000`);
  return result.data;
};

const useFetchAllWarehouse = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["warehouse-all"],
    queryFn: () => getWarehouse(api),
  });
  return result;
};

export default useFetchAllWarehouse;

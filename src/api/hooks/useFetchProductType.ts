"use client";
import useCreateApi from "@/api/useCreateApi";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

interface ProductType {
  id: number;
  code: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

const getProductType = async (
  api: AxiosInstance
): Promise<{ data: ProductType[] }> => {
  const route = "/sma-product-type";
  const result = await api.get(route);
  return result.data;
};

const useFetchProductType = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["product-type"],
    queryFn: () => getProductType(api),
  });
  return result;
};

export default useFetchProductType;

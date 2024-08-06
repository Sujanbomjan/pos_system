"use client";
import useCreateApi from "@/api/useCreateApi";
import { PurchaseItem } from "@/types/purchase";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

interface IResponse {
  data: WelcomeDatum[];
}

interface WelcomeDatum {
  current_page: number;
  data: PurchaseItem[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

const getPurchase = async (api: AxiosInstance): Promise<IResponse> => {
  const route = "/sma-purchases";
  const result = await api.get(route + `?perPage=1000`);
  return result.data;
};

const useFetchAllPurchase = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["purchase-all"],
    queryFn: () => getPurchase(api),
  });
  return result;
};

export default useFetchAllPurchase;

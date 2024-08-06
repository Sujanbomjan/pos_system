"use client";
import useCreateApi from "@/api/useCreateApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

interface WelcomeDatum {
  data: BrandItem[];
}

interface BrandItem {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  causer_id: number;
  deleted_at: Date;
}

const getPriceGroup = async (
  api: AxiosInstance,
): Promise<WelcomeDatum> => {
  const route = "/sma-price-groups";
  const result = await api.get<WelcomeDatum>(route);
  return result.data;
};

const useFetchPriceGroup = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["price_group"],
    queryFn: () =>
      getPriceGroup(api),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchPriceGroup;

"use client";
import useCreateApi from "@/api/useCreateApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

interface Price_group {
  data: Daum[];
}

interface Daum {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
}

const getPriceGroup = async (api: AxiosInstance): Promise<Price_group> => {
  const route = "/sma-price-groups";
  const result = await api.get(route);
  return result.data;
};

const useFetchPriceGroup = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["price_group"],
    queryFn: () => getPriceGroup(api),
    //shows the previous data until the new data is fetched
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchPriceGroup;

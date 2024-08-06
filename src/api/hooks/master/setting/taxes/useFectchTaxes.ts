"use client";
import useCreateApi from "@/api/useCreateApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface Taxes {
  data: Daum[]
}

export interface Daum {
  id: number
  title: string
  type: string
  value: number
  default: number
  created_at: string
  updated_at: string
  deleted_at: any
  causer_id: number
}


const getTax = async (api: AxiosInstance): Promise<Taxes> => {
  const route = "/sma-tax";
  const result = await api.get(route);
  return result.data;
};

const useFetchTax = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["taxes"],
    queryFn: () => getTax(api),
    //shows the previous data until the new data is fetched
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchTax;

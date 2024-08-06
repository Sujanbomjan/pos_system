"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { Unit } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

interface IResponse {
  data: WelcomeDatum[];
}

interface WelcomeDatum {
  current_page: number;
  data: Unit[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

const getWarehouse = async (
  api: AxiosInstance,
  limit: string,
  page: string,
  brand: string,
  from: string,
  to: string,
  sortId: string,
  sortOrder: string
): Promise<IResponse> => {
  const route = "/sma-units";
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&brand=${brand}&from=${from}&to=${to}` +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};

const useFetchUnit = (initialCount?: string) => {
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || initialCount || "10";
  const page = searchParams.get("page") || "1";
  const brand = useDebounce(searchParams.get("brand") || "", 500);
  const date = searchParams.get("date") || "";
  const sortId = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortDirection") || "";

  const from = date.split("-")[0] || "";
  const to = date.split("-")[1] || "";
  const result = useQuery({
    queryKey: ["units", limit, page, brand, from, to, sortId, sortOrder],
    queryFn: () =>
      getWarehouse(api, limit, page, brand, from, to, sortId, sortOrder),
  });
  return result;
};

export default useFetchUnit;

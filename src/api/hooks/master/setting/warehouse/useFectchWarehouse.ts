"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { Warehouses } from "@/types";
import { dateString } from "@/utils/date-formatter";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

const getWarehouse = async (
  api: AxiosInstance,
  limit: string,
  page: string,
  warehouses: string,
  from: string,
  to: string,
  sortId: string,
  sortOrder: string,
  isBS: string
): Promise<Warehouses> => {
  const route = "/sma-warehouses";
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&warehouses=${warehouses}` +
      (from && `&from=${dateString(from, !!isBS)}`) +
      (to && `&to=${dateString(to, !!isBS)}`) +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};

const useFetchWarehouse = (initialCount?: string) => {
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || initialCount || "10";
  const page = searchParams.get("page") || "1";
  const warehouses = useDebounce(searchParams.get("warehouses") || "", 500);
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
      "warehouse",
      limit,
      page,
      warehouses,
      from,
      to,
      sortId,
      sortOrder,
    ],
    queryFn: () =>
      getWarehouse(
        api,
        limit,
        page,
        warehouses,
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

export default useFetchWarehouse;

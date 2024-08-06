"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { Currency } from "@/types";
import { dateString } from "@/utils/date-formatter";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

const getCurrency = async (
  api: AxiosInstance,
  limit: string,
  page: string,
  brand: string,
  from: string,
  to: string,
  sortId: string,
  sortOrder: string,
  isBS: string
): Promise<Currency> => {
  const route = "/sma-currencies";
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&brand=${brand}` +
      (from && `&from=${dateString(from, !!isBS)}`) +
      (to && `&to=${dateString(to, !!isBS)}`) +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};

const useFetchCurrency = () => {
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const brand = useDebounce(searchParams.get("brand") || "", 500);
  const date = searchParams.get("date") || "";
  const sortId = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortDirection") || "";

  const isBS = searchParams.get("bs") || "";
  const bsStartDate = searchParams.get("start-date");
  const bsEndDate = searchParams.get("end-date");

  const from = date.split("-")[0] || bsStartDate || "";
  const to = date.split("-")[1] || bsEndDate || "";

  const result = useQuery({
    queryKey: ["currency", limit, page, brand, from, to, sortId, sortOrder],
    queryFn: () =>
      getCurrency(api, limit, page, brand, from, to, sortId, sortOrder, isBS),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchCurrency;

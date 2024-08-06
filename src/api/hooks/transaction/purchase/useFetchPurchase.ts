"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { PurchaseItem } from "@/types/purchase";
import { dateString } from "@/utils/date-formatter";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

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

const getPurchases = async (
  api: AxiosInstance,
  limit: string,
  page: string,
  referenceNo: string,
  from: string,
  to: string,
  sortId: string,
  sortOrder: string,
  isBS: string
): Promise<IResponse> => {
  const route = "/sma-purchases";
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&searchByAnything=${referenceNo}` +
      (from && `&from=${dateString(from, !!isBS)}`) +
      (to && `&to=${dateString(to, !!isBS)}`) +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );

  return result.data;
};

const useFetchPurchase = () => {
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const referenceNo = useDebounce(searchParams.get("referenceNo") || "", 500);
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
      "purchase",
      limit,
      page,
      referenceNo,
      from,
      to,
      sortId,
      sortOrder,
    ],
    queryFn: () =>
      getPurchases(
        api,
        limit,
        page,
        referenceNo,
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

export default useFetchPurchase;

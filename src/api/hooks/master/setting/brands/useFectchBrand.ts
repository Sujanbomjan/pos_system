"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { dateString } from "@/utils/date-formatter";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

interface IResponse {
  data: WelcomeDatum[];
}

interface WelcomeDatum {
  current_page: number;
  data: BrandItem[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface BrandItem {
  id: number;
  code: string;
  name: string;
  image: string;
  slug: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

const getBrands = async (
  api: AxiosInstance,
  limit: string,
  page: string,
  brand: string,
  from: string,
  to: string,
  sortId: string,
  sortOrder: string,
  isBS: string
): Promise<IResponse> => {
  const route = "/sma-brands";

  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&brand=${brand}` +
      (from && `&from=${dateString(from, !!isBS)}`) +
      (to && `&to=${dateString(to, !!isBS)}`) +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};

const useFetchBrand = () => {
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
    queryKey: ["brands", limit, page, brand, from, to, sortId, sortOrder],
    queryFn: () =>
      getBrands(api, limit, page, brand, from, to, sortId, sortOrder, isBS),
    //shows the previous data until the new data is fetched
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchBrand;

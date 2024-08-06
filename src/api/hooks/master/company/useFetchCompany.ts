"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { Categories, Company } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

interface IResponse {
  data: WelcomeDatum[];
}

interface WelcomeDatum {
  current_page: number;
  data: Company[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface IParams {
  limit: string;
  page: string;
  name: string;
  code: string;
  from: string;
  to: string;
  sortId: string;
  sortOrder: string;
  categories: string;
}

const getCompanies = async (
  api: AxiosInstance,
  params: IParams
): Promise<Categories> => {
  const route = "/sma-companies";
  const { code, from, categories, limit, name, page, sortId, sortOrder, to } =
    params;
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&name=${name}&from=${from}&to=${to}&code=${code}&categories=${categories}` +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};

const useFetchCompanies = (initialCount?: string) => {
  const api = useCreateApi();
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") || initialCount || "10";
  const page = searchParams.get("page") || "1";
  const name = searchParams.get("name") || "";
  const code = searchParams.get("code") || "";
  const date = searchParams.get("date") || "";
  const sortId = searchParams.get("sortBy") || "";
  const categories = useDebounce(searchParams.get("categories") || "", 500);
  const sortOrder = searchParams.get("sortDirection") || "";
  const from = date.split("-")[0] || "";
  const to = date.split("-")[1] || "";

  const result = useQuery({
    queryKey: [
      "companies",
      limit,
      page,
      name,
      from,
      to,
      sortId,
      sortOrder,
      categories,
      code,
    ],
    queryFn: () =>
      getCompanies(api, {
        code,
        from,
        limit,
        name,
        page,
        sortId,
        sortOrder,
        categories,
        to,
      }),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchCompanies;

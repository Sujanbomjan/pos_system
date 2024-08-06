"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { Categories } from "@/types";
import { dateString } from "@/utils/date-formatter";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";
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
  isBS: string;
}
const getCategories = async (
  api: AxiosInstance,
  params: IParams
): Promise<Categories> => {
  const route = "/sma-categories";
  const {
    isBS,
    code,
    from,
    categories,
    limit,
    name,
    page,
    sortId,
    sortOrder,
    to,
  } = params;
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&name=${name}&code=${code}&categories=${categories}` +
      (from && `&from=${dateString(from, !!isBS)}`) +
      (to && `&to=${dateString(to, !!isBS)}`) +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};
const useFetchCategories = (initialCount?: string) => {
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

  const isBS = searchParams.get("bs") || "";
  const bsStartDate = searchParams.get("start-date");
  const bsEndDate = searchParams.get("end-date");

  const from = date.split("-")[0] || bsStartDate || "";
  const to = date.split("-")[1] || bsEndDate || "";

  const result = useQuery({
    queryKey: [
      "categories",
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
      getCategories(api, {
        code,
        from,
        limit,
        name,
        page,
        sortId,
        sortOrder,
        categories,
        to,
        isBS,
      }),
    placeholderData: keepPreviousData,
  });
  return result;
};
export default useFetchCategories;

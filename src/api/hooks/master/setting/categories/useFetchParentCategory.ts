"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { Categories } from "@/types";
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
  parent_id: any;
}
const getCategories = async (
  api: AxiosInstance,
  params: IParams
): Promise<Categories> => {
  const route = "/sma-categories";
  const {
    code,
    from,
    categories,
    limit,
    name,
    page,
    sortId,
    sortOrder,
    to,
    parent_id,
  } = params;
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&parent_id=${parent_id}` +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};
const useFetchParentCategories = (parentId?: string) => {
  const api = useCreateApi();
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const parent_id = searchParams.get("parent_id") || parentId || null;
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
      "categories",
      limit,
      page,
      parent_id,
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
        parent_id,
        categories,
        to,
      }),
    placeholderData: keepPreviousData,
  });
  return result;
};
export default useFetchParentCategories;

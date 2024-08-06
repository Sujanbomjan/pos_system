"use client";
import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import useDebounce from "@/hooks/useDebounce";
import { ProductItem } from "@/types";
import { dateString } from "@/utils/date-formatter";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

interface IResponse {
  data: WelcomeDatum[];
}

interface WelcomeDatum {
  current_page: number;
  data: ProductItem[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

const getProducts = async (
  api: AxiosInstance,
  limit: string,
  page: string,
  products: string,
  from: string,
  to: string,
  sortId: string,
  sortOrder: string,
  isBS: string,
  warehouse_id?: string
): Promise<IResponse> => {
  const route = getApiRoute("getProducts")();
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&products=${products}&warehouse_id=${warehouse_id}` +
      (from && `&from=${dateString(from, !!isBS)}`) +
      (to && `&to=${dateString(to, !!isBS)}`) +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};

const useFetchProduct = ({
  productLimit = "10",
  warehouse_id,
}: {
  productLimit?: string;
  warehouse_id?: string;
}) => {
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || productLimit;
  const page = searchParams.get("page") || "1";
  const products = useDebounce(searchParams.get("products") || "", 500);
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
      "products",
      limit,
      page,
      products,
      from,
      to,
      sortId,
      sortOrder,
      warehouse_id,
    ],
    queryFn: () =>
      getProducts(
        api,
        limit,
        page,
        products,
        from,
        to,
        sortId,
        sortOrder,
        isBS,
        warehouse_id
      ),
    //shows the previous data until the new data is fetched
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchProduct;

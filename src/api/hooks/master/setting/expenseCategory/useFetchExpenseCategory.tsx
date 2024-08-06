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
  data: ExpenseItem[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface ExpenseItem {
  id: number;
  code: string;
  name: string;
  deleted_at: string;
  causer_id: number;
  created_at: Date;
  updated_at: Date;
}

const getExpenseCategory = async (
  api: AxiosInstance,
  limit: string,
  page: string,
  name: string,
  code: string,
  from: string,
  to: string,
  sortId: string,
  sortOrder: string,
  isBS: string
): Promise<IResponse> => {
  const route = "/sma-expense-categories";
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&name=${name}&code=${code}` +
      (from && `&from=${dateString(from, !!isBS)}`) +
      (to && `&to=${dateString(to, !!isBS)}`) +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );
  return result.data;
};

const useFetchExpenseCategory = () => {
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const name = useDebounce(searchParams.get("name") || "", 500);
  const code = useDebounce(searchParams.get("code") || "", 500);
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
      "expensecategory",
      limit,
      page,
      from,
      to,
      name,
      code,
      sortId,
      sortOrder,
    ],
    queryFn: () =>
      getExpenseCategory(
        api,
        limit,
        page,
        code,
        name,
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

export default useFetchExpenseCategory;

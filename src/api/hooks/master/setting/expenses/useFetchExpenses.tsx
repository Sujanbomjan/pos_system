"use client";
import useCreateApi from "@/api/useCreateApi";
import { ExpenseItem, Expenses } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

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

const getExpenses = async (api: AxiosInstance): Promise<IResponse> => {
  const route = "/sma-expenses";
  const result = await api.get(route);
  return result.data;
};

const useFetchExpenses = () => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["expenses"],
    queryFn: () => getExpenses(api),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchExpenses;

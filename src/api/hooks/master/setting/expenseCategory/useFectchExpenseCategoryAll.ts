"use client";
import useCreateApi from "@/api/useCreateApi";
import { useQuery } from "@tanstack/react-query";
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

interface ExpenseItem {
  id: number;
  code: string;
  name: string;
  deleted_at: string;
  causer_id: number;
  created_at: Date;
  updated_at: Date;
}

const getExpenseCateogory = async (api: AxiosInstance): Promise<IResponse> => {
  const route = "/sma-expense-categories";
  const result = await api.get(route + `?perPage=1000`);
  return result.data;
};

const useFetchExpenseCategory = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["expensecategory-all"],
    queryFn: () => getExpenseCateogory(api),
  });
  return result;
};

export default useFetchExpenseCategory;

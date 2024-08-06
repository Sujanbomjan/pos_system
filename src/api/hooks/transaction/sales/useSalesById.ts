"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { SalesItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

interface IPurchaseSingle {
  data: SalesItem;
}

const getSales = async (
  api: AxiosInstance,
  id: string
): Promise<IPurchaseSingle> => {
  const route = "/sma-sales";
  const result = await api.get(route + `/${id}`);
  return result.data;
};

const useSalesById = ({ id }: { id: string }) => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["sales", id],
    queryFn: () => getSales(api, id),
  });
  return result;
};

export default useSalesById;

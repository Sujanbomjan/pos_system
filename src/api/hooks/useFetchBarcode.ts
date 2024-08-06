"use client";
import useCreateApi from "@/api/useCreateApi";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

interface Barcode {
  id: number;
  code: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

const getBarcode = async (api: AxiosInstance): Promise<{ data: Barcode[] }> => {
  const route = "/sma-barcode-symbology";
  const result = await api.get(route);
  return result.data;
};

const useFetchBarcode = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["barcode"],
    queryFn: () => getBarcode(api),
  });
  return result;
};

export default useFetchBarcode;

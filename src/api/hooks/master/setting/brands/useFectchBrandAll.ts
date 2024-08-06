"use client";
import useCreateApi from "@/api/useCreateApi";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

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

const getBrands = async (api: AxiosInstance): Promise<IResponse> => {
  const route = "/sma-brands";
  const result = await api.get(route + `?perPage=1000`);
  return result.data;
};

const useFetchBrandAll = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["brands-all"],
    queryFn: () => getBrands(api),
  });
  return result;
};

export default useFetchBrandAll;

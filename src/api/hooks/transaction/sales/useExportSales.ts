"use client";
import useCreateApi from "@/api/useCreateApi";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  data: {
    url: string;
  };
}

const exportSales = async (api: AxiosInstance): Promise<IPostData> => {
  const route = "/export/sale";
  const response = await api.post<IPostData>(route);

  return response.data;
};
const useExportSales = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["sales-export"],
    queryFn: () => exportSales(api),
  });
  return result;
};

export default useExportSales;

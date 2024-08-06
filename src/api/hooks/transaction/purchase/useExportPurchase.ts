"use client";
import useCreateApi from "@/api/useCreateApi";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  data: {
    url: string;
  };
}

const exportPurchase = async (api: AxiosInstance): Promise<IPostData> => {
  const route = "/export/purchase";
  const response = await api.post<IPostData>(route);

  return response.data;
};
const useExportPurchase = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["purchase"],
    queryFn: () => exportPurchase(api),
  });
  return result;
};

export default useExportPurchase;

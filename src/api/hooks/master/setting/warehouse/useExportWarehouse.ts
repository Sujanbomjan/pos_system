"use client";
import useCreateApi from "@/api/useCreateApi";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  data: {
    url: string;
  };
}

const exportWarehouse = async (api: AxiosInstance): Promise<IPostData> => {
  const route = "/export/warehouse";
  const response = await api.post<IPostData>(route);

  return response.data;
};
const useExportWarehouse = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["warehouse-export"],
    queryFn: () => exportWarehouse(api),
  });
  return result;
};

export default useExportWarehouse;

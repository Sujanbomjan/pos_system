"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  export_ids?: number[];
}

const exportSales = async (data: IPostData, api: AxiosInstance) => {
  const route = "/export/sale";

  const result = await api.post(route, data);
  return result.data;
};

const useExportMultipleSales = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => exportSales(data, api),
  });
  return mutation;
};

export default useExportMultipleSales;

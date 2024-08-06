"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  export_ids?: number[];
}

const exportPurchase = async (data: IPostData, api: AxiosInstance) => {
  const route = "/export/purchase";

  const result = await api.post(route, data);
  return result.data;
};

const useExportMultiplePurchase = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => exportPurchase(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["purchase"] });
    },
  });
  return mutation;
};

export default useExportMultiplePurchase;

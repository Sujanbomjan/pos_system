"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  export_ids?: number[];
}

const exportBrands = async (data: IPostData, api: AxiosInstance) => {
  const route = "/export/brand";

  const result = await api.post(route, data);
  return result.data;
};

const useExportMultipleBrands = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => exportBrands(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};

export default useExportMultipleBrands;

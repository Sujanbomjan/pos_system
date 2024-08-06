"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  export_ids?: number[];
}

const exportWarehouse = async (data: IPostData, api: AxiosInstance) => {
  const route = "/export/warehouse";

  const result = await api.post(route, data);
  return result.data;
};

const useExportMultipleWarehouse = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => exportWarehouse(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};

export default useExportMultipleWarehouse;

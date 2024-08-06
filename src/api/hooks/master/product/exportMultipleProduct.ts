"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  export_ids?: number[];
}

const exportProduct = async (data: IPostData, api: AxiosInstance) => {
  const route = "/export/product";

  const result = await api.post(route, data);
  return result.data;
};

const useExportMultipleProduct = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => exportProduct(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return mutation;
};

export default useExportMultipleProduct;

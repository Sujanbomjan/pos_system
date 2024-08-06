"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export interface IPostData {
  data: {
    url: string;
  };
}

const exportProduct = async (api: AxiosInstance): Promise<IPostData> => {
  const route = "/export/product";
  const response = await api.post<IPostData>(route);

  return response.data;
};
const useExportProduct = () => {
  const api = useCreateApi();
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => exportProduct(api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};
export default useExportProduct;

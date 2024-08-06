"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  file: any[];
}

const importProduct = async (data: IPostData, api: AxiosInstance) => {
  const formData = new FormData();
  formData.append("file", data.file[0]);

  const route = "/import/product";
  const result = await api.post(route, formData);
  return result.data;
};

const useImportProduct = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => importProduct(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["product"] });
    },
  });
  return mutation;
};

export default useImportProduct;

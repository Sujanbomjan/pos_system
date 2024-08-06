"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  file: any[];
}

const importBrands = async (data: IPostData, api: AxiosInstance) => {
  const formData = new FormData();
  formData.append("file", data.file[0]);

  const route = "/import/brand";
  const result = await api.post(route, formData);
  return result.data;
};

const useImportBrands = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => importBrands(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["warehouse"] });
    },
  });
  return mutation;
};

export default useImportBrands;

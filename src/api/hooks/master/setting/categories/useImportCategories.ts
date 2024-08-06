"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  file: any[];
}

const importCategories = async (data: IPostData, api: AxiosInstance) => {
  const formData = new FormData();
  formData.append("file", data.file[0]);

  const route = "/import/category";
  const result = await api.post(route, formData);
  return result.data;
};

const useImportCategories = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => importCategories(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};

export default useImportCategories;

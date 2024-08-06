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

const exportCategories = async (api: AxiosInstance): Promise<IPostData> => {
  const route = "/export/category";
  const response = await api.post<IPostData>(route);

  return response.data;
};
const useExportCategories = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["categories"],
    queryFn: () => exportCategories(api),
  });
  return result;
};

export default useExportCategories;

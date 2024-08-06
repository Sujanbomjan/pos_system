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

const exportBrands = async (api: AxiosInstance): Promise<IPostData> => {
  const route = "/export/brand";
  const response = await api.post<IPostData>(route);

  return response.data;
};
const useExportBrands = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["categories"],
    queryFn: () => exportBrands(api),
  });
  return result;
};

export default useExportBrands;

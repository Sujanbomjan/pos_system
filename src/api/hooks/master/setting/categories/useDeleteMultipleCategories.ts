"use client";
import useCreateApi from "@/api/useCreateApi";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  delete_all?: boolean;
  ids?:number[];
}

const deleteCategories = async (data: IPostData, api: AxiosInstance) => {
  const route = "/sma-categories";

  const { delete_all,ids} = data;


  const result = await api.delete(route,{
    data: delete_all ? {
      delete_all:true
    }:{
      ids:ids
    }
  });
  return result.data;
};
const useDeleteMultipleCategories = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deleteCategories(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};
export default useDeleteMultipleCategories;

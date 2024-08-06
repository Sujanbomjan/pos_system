"use client";
import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  delete_all?: boolean;
  ids?: number[];
}

const deleteProduct = async (data: IPostData, api: AxiosInstance) => {
  const route = "/sma-products";

  const { delete_all, ids } = data;

  const result = await api.delete(route, {
    data: delete_all
      ? {
          delete_all: true,
        }
      : {
          ids: ids,
        },
  });
  return result.data;
};
const useDeleteMultipleProduct = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => deleteProduct(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return mutation;
};
export default useDeleteMultipleProduct;

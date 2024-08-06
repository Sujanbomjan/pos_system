import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  code: string;
  parent_id: string;
  name: string;
  image: any[];
  description: string;
}

const addCategories = async (data: IPostData, api: AxiosInstance) => {
  const route = "/sma-categories";

  const result = await api.post(route, {
    ...data,
    image:
      Array.isArray(data.image) && data.image.length > 0 ? data.image[0] : null,
  });
  return result.data;
};

const useAddCategories = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => addCategories(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
  return mutation;
};

export default useAddCategories;

import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  name: string;
  description: string;
  code: string;
  image: any[];
}

const addProduct = async (data: IPostData, api: AxiosInstance) => {
  const route = "/sma-brands";

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("code", data.code);
  formData.append("description", data.description);
  formData.append("image", data.image[0]);

  const result = await api.post(route, formData);
  return result.data;
};

const useAddBrands = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => addProduct(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        predicate: (query) => {
          return ["brands", "brands-all"].includes(query.queryKey[0] as string);
        },
      });
    },
  });
  return mutation;
};

export default useAddBrands;

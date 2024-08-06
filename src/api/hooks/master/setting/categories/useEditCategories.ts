import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "@/api/useCreateApi";

export interface IPostData {
  code: string;
  name: string;
  parent_id: string;
  description: string;
  image: string;
}

const editCategories = async (
  categoriesId: string,
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("editCategories")(categoriesId);

  const result = await api.post(route, data);
  return result.data;
};

const useEditCategories = (categoriesId: string) => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) =>
      editCategories(
        categoriesId,
        {
          ...data,
          image: Array.isArray(data.image) ? data.image[0] : data.image,
        },
        api
      ),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};

export default useEditCategories;

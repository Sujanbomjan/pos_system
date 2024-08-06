import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  code: string;
  name: string;
  description: string;
  image: any[];
}

const editBrands = async (
  brandId: string,
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("editBrand")(brandId);
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("code", data.code);
  formData.append("description", data.description);
  formData.append("image", data.image[0]);
  const result = await api.post(route, formData);
  return result.data;
};

const useEditBrands = (brandId: string) => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => editBrands(brandId, data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["brands"] });
    },
  });
  return mutation;
};

export default useEditBrands;

import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "../useCreateApi";

interface IPostData {
  file: any[];
  folder?: string;
}

interface IResponse {
  data: string[];
}

const addProduct = async (
  data: IPostData,
  api: AxiosInstance
): Promise<IResponse> => {
  const route = getApiRoute("uploadFile")();
  const formData = new FormData();

  for (const item of data.file) {
    formData.append("file[]", item);
  }
  formData.append("folder", data.folder || "test");

  console.log("data", data.folder);

  const result = await api.post(route, formData);
  return result.data;
};

const useUploadFile = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => addProduct(data, api),
  });
  return mutation;
};

export default useUploadFile;

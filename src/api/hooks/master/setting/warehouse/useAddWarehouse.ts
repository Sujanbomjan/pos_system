import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
export interface IPostData {
  code: string;
  name: string;
  address: string;
  map: string;
  phone: string;
  email: string;
  price_group_id: string;
}

const addWarehouse = async (data: IPostData, api: AxiosInstance) => {
  const route = getApiRoute("addWarehouse")();

  const result = await api.post(route, data);
  return result.data;
};

const useAddWarehouse = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => addWarehouse(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["warehouse"] });
    },
  });
  return mutation;
};

export default useAddWarehouse;

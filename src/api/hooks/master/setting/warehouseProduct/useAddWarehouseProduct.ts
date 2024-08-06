import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
export interface IPostData {
  product_id: number;
  warehouse_id: number;
  quantity: number;
  rack: string;
  avg_cost: number;
}

const addWarehouseProduct = async (data: IPostData, api: AxiosInstance) => {
  const route = getApiRoute("addWarehouseProduct")();

  const result = await api.post(route, data);
  return result.data;
};

const useAddWarehouseProduct = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => addWarehouseProduct(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["warehouseproduct"] });
    },
  });
  return mutation;
};

export default useAddWarehouseProduct;

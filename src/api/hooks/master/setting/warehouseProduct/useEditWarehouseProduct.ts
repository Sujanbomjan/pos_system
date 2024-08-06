import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
product_id: number;
warehouse_id: number;
quantity: number;
rack: string;
avg_cost: number;
}

const editWarehouseProduct = async (
  warehouseId: string,
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("editWarehouseProduct")(warehouseId);

  const result = await api.put(route, data);
  return result.data;
};

const useEditWarehouseProduct = (warehouseId: string) => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => editWarehouseProduct(warehouseId, data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["warehouse"] });
    },
  });
  return mutation;
};

export default useEditWarehouseProduct;

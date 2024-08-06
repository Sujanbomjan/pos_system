import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface IPostData {
  code: string;
  name: string;
  address: string;
  map: string;
  phone: string;
  email: string;
  price_group_id: string;
}

const editWarehouse = async (
  warehouseId: string,
  data: IPostData,
  api: AxiosInstance
) => {
  const route = getApiRoute("editWarehouse")(warehouseId);

  const result = await api.patch(route, data);
  return result.data;
};

const useEditWarehouse = (warehouseId: string) => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => editWarehouse(warehouseId, data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["warehouse"] });
    },
  });
  return mutation;
};

export default useEditWarehouse;

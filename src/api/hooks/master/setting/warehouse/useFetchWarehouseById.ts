import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { WarehouseData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export interface Warehouse {
  data: {
    id: number;
    code: string;
    name: string;
    address: string;
    map: string;
    phone: string;
    email: string;
    price_group_id: string;
  };
}
const getWarehouse = async (
  api: AxiosInstance,
  warehouseId: string
): Promise<WarehouseData> => {
  const route = getApiRoute("getWarehouseById")(warehouseId);
  const result = await api.get(route);
  return result.data;
};

const useFetchWarehouseById = (warehouseId: string) => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["warehouse", warehouseId],
    queryFn: () => getWarehouse(api, warehouseId),
    enabled: !!warehouseId,
  });
  return result;
};

export default useFetchWarehouseById;

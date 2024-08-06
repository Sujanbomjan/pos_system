import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { CategoryItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getCategories = async (
  api: AxiosInstance,
  warehouseId: string
): Promise<CategoryItem> => {
  const route = getApiRoute("getCategoriesById")(warehouseId);
  const result = await api.get(route);
  return result.data;
};

const useFetchCategoriesById = (warehouseId: string) => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["categories", warehouseId],
    queryFn: () => getCategories(api, warehouseId),
    enabled: !!warehouseId,
  });
  return result;
};

export default useFetchCategoriesById;

import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { ProductItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getBrands = async (
  api: AxiosInstance,
  productId: string
): Promise<{ data: ProductItem }> => {
  const route = getApiRoute("getProductById")(productId);
  const result = await api.get(route);
  return result.data;
};

const useFetchProductById = (productId: string) => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getBrands(api, productId),
    enabled: !!productId,
  });
  return result;
};

export default useFetchProductById;

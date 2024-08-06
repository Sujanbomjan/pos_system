import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { SingleBrand } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getBrands = async (
  api: AxiosInstance,
  brandId: string
): Promise<SingleBrand> => {
  const route = getApiRoute("getBrandById")(brandId);
  const result = await api.get(route);
  return result.data;
};

const useFetchBrandById = (brandId: string) => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["brands", brandId],
    queryFn: () => getBrands(api, brandId),
    enabled: !!brandId,
  });
  return result;
};

export default useFetchBrandById;

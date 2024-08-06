import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { SingleCurrencies } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getCurrency = async (
  api: AxiosInstance,
  currencyId: string
): Promise<SingleCurrencies> => {
  const route = getApiRoute("getCurrencyById")(currencyId);
  const result = await api.get(route);
  return result.data;
};

const useFetchCurrencyById = (currencyId: string) => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["currency", currencyId],
    queryFn: () => getCurrency(api, currencyId),
    enabled: !!currencyId,
  });
  return result;
};

export default useFetchCurrencyById;

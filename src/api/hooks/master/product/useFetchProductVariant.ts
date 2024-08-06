import useCreateApi from "@/api/useCreateApi";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  variant_code: string;
  cost: string;
  price: string;
  quantity: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  causer_id: number;
}

const getProductVariant = async (
  api: AxiosInstance,
  productId: string
): Promise<{ data: ProductVariant }> => {
  const route = "/sma-product-variant";
  const result = await api.get(route + `?product_id=${productId}&perPage=1000`);
  return result.data;
};

const useFetchProductVariant = (productId: string) => {
  const api = useCreateApi();
  const result = useQuery({
    queryKey: ["product-variant", productId],
    queryFn: () => getProductVariant(api, productId),
    enabled: !!productId,
  });
  return result;
};

export default useFetchProductVariant;

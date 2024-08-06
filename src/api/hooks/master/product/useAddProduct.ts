import useCreateApi from "@/api/useCreateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  name: string;
  unit: string;
  price: string;
  cost: string;
  alert_quantity: string;
  image: string;
  category_id: string;
  subcategory_id: string;
  quantity: string;
  tax_rate: string;
  track_quantity: string;
  warehouse: string;
  barcode_symbology: string;
  product_details: string;
  tax_method: string;
  type: string;
  promotion: string;
  promo_price: string;
  sale_unit: string;
  purchase_unit: string;
  brand: string;
  featured: string;
  weight: string;
  second_name: string;
  code: string;
  hide_pos: string;
  hide: string;
  file: string;
  product_photos: string;
}

const addProduct = async (data: IPostData, api: AxiosInstance) => {
  const route = "/sma-products";
  const image =
    Array.isArray(data.image) && data.image.length > 0 ? data.image[0] : null;
  const file =
    Array.isArray(data.file) && data.file.length > 0 ? data.file[0] : null;
  const result = await api.post(route, {
    ...data,
    image: image,
    file: file,
    product_photos: data.product_photos,
  });
  return result.data;
};

const useAddProduct = () => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => addProduct(data, api),
    onSuccess: () => {
      // invalidate multiple queries
      client.invalidateQueries({
        predicate: (query) => {
          return ["products"].includes(query.queryKey[0] as string);
        },
      });
    },
  });
  return mutation;
};

export default useAddProduct;

import useCreateApi from "@/api/useCreateApi";
import getApiRoute from "@/config/getApiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface IPostData {
  id: number;
  code: string;
  name: string;
  barcode_symbology_id: string;
  product_type_id: any;
  unit: string;
  cost: string;
  price: string;
  alert_quantity: string;
  image: string;
  category_id: number;
  subcategory_id: any;
  cf1: any;
  cf2: any;
  cf3: any;
  cf4: any;
  cf5: any;
  cf6: any;
  quantity: string;
  tax_rate: string;
  track_quantity: string;
  details: any;
  warehouse: string;
  file: any;
  product_details: string;
  tax_method: string;
  type: string;
  supplier1: number;
  supplier1price: string;
  promotion: string;
  promo_price: string;
  start_date: any;
  end_date: any;
  supplier1_part_no: string;
  sale_unit: any;
  purchase_unit: any;
  brand: string;
  slug: string;
  featured: string;
  weight: string;
  hsn_code: any;
  views: number;
  hide: string;
  second_name: string;
  hide_pos: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
  photos: any[];
  warehouse_products: any[];
  product_variants: any[];
  warehouse_product_variants: any[];
}

const editProduct = async (id: string, data: IPostData, api: AxiosInstance) => {
  const route = getApiRoute("editProduct")(id);
  const formData = new FormData();

  for (const key in data) {
    if (key === "image") {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    } else if (
      [
        "hide_pos",
        "hide",
        "tax_method",
        "featured",
        "promotion",
        "promo_price",
        "subcategory_id",
        "track_quantity",
      ].includes(key)
    ) {
      formData.append(key, data[key as keyof IPostData] === "true" ? "1" : "0");
    } else {
      formData.append(key, data[key as keyof IPostData] as string);
    }
  }

  const result = await api.post(route, formData);
  return result.data;
};

const useEditProduct = (id: string) => {
  const api = useCreateApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IPostData) => editProduct(id, data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return mutation;
};

export default useEditProduct;

// const editProduct = async (data: IPostData, api: AxiosInstance, id: string) => {
//   const route = getApiRoute("editProduct")(id);

//   const formData = new FormData();

//   for (const key in data) {
//     if (key === "image") {
//       formData.append(key, data[key]);
//     } else if (
//       [
//         "hide_pos",
//         "hide",
//         "tax_method",
//         "featured",
//         "promotion",
//         "track_quantity",
//       ].includes(key)
//     ) {
//       formData.append(
//         key,
//         Boolean(data[key as keyof IPostData] as string) === true ? "1" : "0"
//       );
//     } else {
//       formData.append(key, data[key as keyof IPostData] as string);
//     }
//   }

//   const result = await api.post(route, formData);
//   return result.data;
// };
// const useEditProduct = (id: string) => {
//   const api = useCreateApi();
//   const client = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: (data: IPostData) => editProduct(data, api, id),
//     onSuccess: () => {
//       client.invalidateQueries({
//         predicate: (query) => {
//           return ["products"].includes(query.queryKey[0] as string);
//         },
//       });
//     },
//   });
//   return mutation;
// };

// export default useEditProduct;

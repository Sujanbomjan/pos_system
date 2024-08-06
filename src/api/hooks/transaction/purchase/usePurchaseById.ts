"use client";
import useCreateApi from "@/api/useCreateApi";
import { PurchaseItem } from "@/types/purchase";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

interface IPurchaseSingle {
  data: PurchaseItem;
}

const getPurchase = async (
  api: AxiosInstance,
  id: string
): Promise<IPurchaseSingle> => {
  const route = "/sma-purchases";
  const result = await api.get(route + `/${id}`);
  return result.data;
};

const usePurchaseById = ({ id }: { id: string }) => {
  //supplierId:
  //warehouseId:
  //status:
  //paymentStatus:
  //createdBy:
  //returnId:
  //returnPurchaseRef:
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const result = useQuery({
    queryKey: ["purchase", id],
    queryFn: () => getPurchase(api, id),
  });
  return result;
};

export default usePurchaseById;

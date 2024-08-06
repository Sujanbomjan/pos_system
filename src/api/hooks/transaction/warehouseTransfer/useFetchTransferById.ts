"use client";
import useCreateApi from "@/api/useCreateApi";
import { WarehouseTransfer } from "@/types/purchase";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";


const getTransfer = async (
  api: AxiosInstance,
  id: string
): Promise<WarehouseTransfer> => {
  const route = "/sma-transfers";
  const result = await api.get(route + `/${id}`);
  return result.data;
};

const useFetchTransferById = ({ id }: { id: string }) => {
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
    queryKey: ["transfer", id],
    queryFn: () => getTransfer(api, id),
  });
  return result;
};

export default useFetchTransferById;

"use client";
import useCreateApi from "@/api/useCreateApi";
import useDebounce from "@/hooks/useDebounce";
import { PurchaseItem } from "@/types/purchase";
import { dateString } from "@/utils/date-formatter";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

export interface Trasnfer {
  data: Daum[];
}

export interface Daum {
  current_page: number;
  data: Daum2[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Daum2 {
  id: number;
  transfer_no: string;
  from_warehouse_id: number;
  from_warehouse_code: string;
  from_warehouse_name: string;
  to_warehouse_id: number;
  to_warehouse_code: string;
  to_warehouse_name: string;
  note: string;
  total: string;
  total_tax: string;
  grand_total: string;
  created_by: number;
  status: string;
  shipping: string;
  attachment: any;
  cgst: string;
  sgst: string;
  igst: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
  nepali_created_at: any;
  nepali_updated_at: any;
  from_warehouse: FromWarehouse;
  to_warehouse: ToWarehouse;
  transfer_items: any[];
  causer: Causer;
}

export interface FromWarehouse {
  id: number;
  code: string;
  name: string;
  address: string;
  map: string;
  phone: string;
  email: string;
  price_group_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
  nepali_created_at: string;
  nepali_updated_at: string;
}

export interface ToWarehouse {
  id: number;
  code: string;
  name: string;
  address: string;
  map: string;
  phone: string;
  email: string;
  price_group_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  causer_id: number;
  nepali_created_at: string;
  nepali_updated_at: string;
}

export interface Causer {
  id: number;
  client_id: number;
  name: string;
  email: string;
  email_verified_at: string;
  mobile_no: string;
  fcm_token: string;
  status: number;
  google2fa_secret: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  desktop_fcm: any;
  phone_verified_at: string;
  should_change_password: number;
  should_change_password_message: any;
  user_type_id: number;
  gender: string;
  duplicateFcmReg: any;
  special1: any;
  special2: any;
  special3: any;
  special4: any;
  should_forget_password: number;
  user_category: any;
  twofa_status: number;
}

const getTransfer = async (
  api: AxiosInstance,
  limit: string,
  page: string,
  searchByAnything: string,
  from: string,
  to: string,
  sortId: string,
  sortOrder: string,
  isBS: string
): Promise<Trasnfer> => {
  const route = "/sma-transfers";
  const result = await api.get(
    route +
      `?perPage=${limit}&page=${page}&searchByAnything=${searchByAnything}` +
      (from && `&from=${dateString(from, !!isBS)}`) +
      (to && `&to=${dateString(to, !!isBS)}`) +
      (sortId && `&sortBy=${sortId}&sortDirection=${sortOrder}`)
  );

  return result.data;
};

const useFetchTransfer = () => {
  const api = useCreateApi();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const searchByAnything = useDebounce(
    searchParams.get("searchByAnything") || "",
    500
  );
  const date = searchParams.get("date") || "";
  const sortId = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortDirection") || "";
  const isBS = searchParams.get("bs") || "";

  const bsStartDate = searchParams.get("start-date");
  const bsEndDate = searchParams.get("end-date");

  const from = date.split("-")[0] || bsStartDate || "";
  const to = date.split("-")[1] || bsEndDate || "";

  const result = useQuery({
    queryKey: [
      "transfer",
      limit,
      page,
      searchByAnything,
      from,
      to,
      sortId,
      sortOrder,
      isBS,
    ],
    queryFn: () =>
      getTransfer(
        api,
        limit,
        page,
        searchByAnything,
        from,
        to,
        sortId,
        sortOrder,
        isBS
      ),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchTransfer;

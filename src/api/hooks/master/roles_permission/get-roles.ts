"use client";
import useCreateApi from "@/api/useCreateApi";
import { RolesPaginatedData } from "@/types/roles";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

const getRoles = async (
  api: AxiosInstance,
  page: string
): Promise<{ data: RolesPaginatedData }> => {
  const route = "/roles";
  const result = await api.get(route + `?page=${page}`);
  return result.data;
};

const useFetchRoles = () => {
  const searchParams = useSearchParams();
  const api = useCreateApi();
  const page = searchParams.get("page") || "1";

  const result = useQuery({
    queryKey: ["role_permission", page],
    queryFn: () => getRoles(api, page),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchRoles;

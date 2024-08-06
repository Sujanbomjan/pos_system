"use client";
import useCreateApi from "@/api/useCreateApi";
import { UsersResponse } from "@/types/admin-users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSearchParams } from "next/navigation";

const getUsers = async (
  api: AxiosInstance,
  params: { page: string }
): Promise<{ data: UsersResponse }> => {
  const route = "/user-lists";
  const { page } = params;
  const result = await api.get(route + `?page=${page}`);
  return result.data;
};

const useFetchAdminUsers = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";

  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["admin_users", page],
    queryFn: () => getUsers(api, { page }),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchAdminUsers;

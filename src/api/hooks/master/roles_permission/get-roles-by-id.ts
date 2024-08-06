"use client";
import useCreateApi from "@/api/useCreateApi";
import { RolesData } from "@/types/roles";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getRolesById = async (
  api: AxiosInstance,
  id: string
): Promise<{ data: RolesData }> => {
  const route = `/roles/${id}`;
  const result = await api.get(route);
  return result.data;
};

const useFetchRolesById = (id: string) => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["role_permission", id],
    queryFn: () => getRolesById(api, id),
  });
  return result;
};

export default useFetchRolesById;

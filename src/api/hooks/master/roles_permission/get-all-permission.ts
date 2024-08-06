"use client";
import useCreateApi from "@/api/useCreateApi";
import { PermissionResponse } from "@/types/permission";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const getRoles = async (api: AxiosInstance) => {
  const route = "/get-all-permissions";
  console.log("Called");
  const result = await api.get(route);
  return result.data as PermissionResponse;
};

const useFetchPermissions = () => {
  const api = useCreateApi();

  const result = useQuery({
    queryKey: ["permission"],
    queryFn: () => getRoles(api),
  });
  return result;
};

export default useFetchPermissions;

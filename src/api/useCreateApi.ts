"use client";
import { routes } from "@/config/routes";
import { useAuth } from "@/providers/AuthProvider";
import axios from "axios";

const useCreateApi = () => {
  const { token, logout } = useAuth();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
  });

  api.interceptors.request.use(function (config) {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["App-Authorizer"] = 647061697361;

      return config;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401, 403].includes(parseInt(error?.response?.status))) {
        logout(routes.auth.signIn, "You have been logged out");
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default useCreateApi;

import { useEffect } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { api } from "../lib/api";

export default function useApi() {
  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const { "nexus.token": token } = parseCookies();

        if (token && config.headers && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,

      (error) => {
        if (error.response && error.response.status === 401) {
          destroyCookie(null, "nexus.token", { path: "/" });

          window.location.href = "/";
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return api;
}

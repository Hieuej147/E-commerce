"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";
import { API_BASE_URL } from "./client";

export function useApiClient() {
  const { getToken } = useAuth();

  return useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      const token = await getToken();
      const isDev = process.env.NODE_ENV === "development";
      const response = await fetch(API_BASE_URL + path, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(isDev ? { "ngrok-skip-browser-warning": "true" } : {}),
          ...(token ? { Authorization: "Bearer " + token } : {}),
          ...init?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(response.status + ": " + (await response.text()));
      }

      return response.json() as Promise<T>;
    },
    [getToken],
  );
}

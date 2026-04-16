"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ApiState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function useApi<T>(url: string | null) {
  const [state, setState] = useState<ApiState<T>>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  const fetch_ = useCallback(async (endpoint: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ status: "loading" });

    try {
      const res = await fetch(endpoint, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setState({ status: "success", data: json });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setState({ status: "error", message: (err as Error).message });
    }
  }, []);

  useEffect(() => {
    if (!url) return;
    fetch_(url);
    return () => abortRef.current?.abort();
  }, [url, fetch_]);

  return state;
}
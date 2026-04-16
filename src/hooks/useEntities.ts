"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import type { Game } from "../schemas/schema";
import { useApi, type PaginatedResponse } from "./useApi";

export type EntityType = "bosses" | "weapons" | "locations" | "npcs";

interface UseEntitiesOptions {
  game?: Game;
  search?: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export function useEntities<T>(type: EntityType, options: UseEntitiesOptions = {}) {
  const locale = useLocale();
  const { game, search, page = 1, limit = 20, enabled = true } = options;

  const url = useMemo(() => {
    if (!enabled) return null;

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    params.set("lang", locale);
    if (game) params.set("game", game);
    if (search) params.set("search", search);

    return `/api/${type}?${params.toString()}`;
  }, [type, game, search, page, limit, enabled, locale]);

  return useApi<PaginatedResponse<T>>(url);
}

// Hook específico para preview da homepage (menos items, sem paginação)
export function useEntityPreview<T>(type: EntityType, game?: Game) {
  return useEntities<T>(type, { game, limit: 6, page: 1 });
}
"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import { useApi } from "./useApi";
import type { EntityType } from "./useEntities";

/**
 * Hook to fetch a single entity by type and slug
 */
export function useEntity<T>(type: EntityType, slug: string | undefined) {
  const locale = useLocale();

  const url = useMemo(() => {
    if (!slug) return null;
    
    // Most detail APIs expect a slug and optional lang param
    return `/api/${type}/${slug}?lang=${locale}`;
  }, [type, slug, locale]);

  return useApi<T>(url);
}

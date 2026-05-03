"use client";

import { useEntities } from "@/src/hooks/useEntities";
import type { Game, Location } from "@/src/schemas/schema";
import { useState } from "react";
import { LocationCard } from "./LocationCard";
import { LocationsFilters } from "./LocationsFilters";
import { useTranslations } from "next-intl";

export function LocationsList() {
  const t = useTranslations('LocationsPage');
  const [search, setSearch] = useState("");
  const [game, setGame] = useState<Game | "all">("all");

  const state = useEntities<Location>("locations", {
    game: game === "all" ? undefined : game,
    search: search || undefined,
    limit: 100,
  });

  const isLoading = state.status === "loading";
  const error = state.status === "error";
  const locations = state.status === "success" ? state.data.data : [];

  return (
    <div className="flex flex-col gap-10">
      <LocationsFilters 
        search={search} 
        onSearchChange={setSearch} 
        game={game} 
        onGameChange={setGame} 
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className="h-48 rounded-sm bg-ds-surface/30 border border-ds-border-2 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 border border-dashed border-ds-border rounded-sm">
          <p className="text-red-400 font-lore italic">{t('list.error_loading')}</p>
        </div>
      ) : locations.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-ds-border rounded-sm bg-ds-surface/10">
          <p className="text-ds-muted font-lore italic">{t('list.no_results')}</p>
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="mt-4 text-xs tracking-widest uppercase font-display text-ds-gold hover:text-ds-gold-light transition-colors"
            >
              {t('list.clear_search')}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
          {locations.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
      )}

      {!isLoading && !error && locations.length > 0 && (
          <div className="flex justify-center mt-4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-display text-ds-muted">
                {t('list.showing_count', { count: locations.length })}
              </p>
          </div>
      )}
    </div>
  );
}

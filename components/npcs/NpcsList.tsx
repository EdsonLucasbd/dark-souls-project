"use client";

import { useEntities } from "@/src/hooks/useEntities";
import type { Game, Npc } from "@/src/schemas/schema";
import { useState, useMemo } from "react";
import { NpcCard } from "./NpcCard";
import { NpcsFilters } from "./NpcsFilters";
import { useTranslations } from "next-intl";

export function NpcsList() {
  const t = useTranslations('NpcsPage');
  const [search, setSearch] = useState("");
  const [game, setGame] = useState<Game | "all">("all");

  const state = useEntities<Npc>("npcs", {
    game: game === "all" ? undefined : game,
    search: search || undefined,
    limit: 100, // Show a good amount initially
  });

  const isLoading = state.status === "loading";
  const error = state.status === "error";
  const npcs = state.status === "success" ? state.data.data : [];

  return (
    <div className="flex flex-col gap-10">
      <NpcsFilters 
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
      ) : npcs.length === 0 ? (
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
          {npcs.map((npc) => (
            <NpcCard key={npc.slug} npc={npc} />
          ))}
        </div>
      )}

      {/* Basic Footer Stats */}
      {!isLoading && !error && npcs.length > 0 && (
          <div className="flex justify-center mt-4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-display text-ds-muted">
                {t('list.showing_count', { count: npcs.length })}
              </p>
          </div>
      )}
    </div>
  );
}

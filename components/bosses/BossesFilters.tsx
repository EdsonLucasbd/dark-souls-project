"use client";

import { GameSelector } from "@/components/home/GameSelector";
import type { Game } from "@/src/schemas/schema";
import { Search02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";

interface BossesFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  game: Game | "all";
  onGameChange: (val: Game | "all") => void;
}

export function BossesFilters({
  search,
  onSearchChange,
  game,
  onGameChange
}: BossesFiltersProps) {
  const t = useTranslations('BossesPage');

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border border-ds-border bg-ds-surface/20 rounded-sm">
      <div className="relative w-full md:max-w-md group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-ds-muted group-focus-within:text-ds-gold transition-colors">
          <HugeiconsIcon icon={Search02Icon} size={18} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('filters.search_placeholder')}
          className="w-full bg-ds-bg/50 border border-ds-border-2 rounded-sm py-2.5 pl-10 pr-4 text-sm text-ds-text placeholder:text-ds-muted focus:outline-none focus:border-ds-gold/50 focus:bg-ds-bg transition-all font-lore"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ds-gold-dim/30 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden lg:inline text-[10px] uppercase tracking-widest text-ds-muted font-display">
          {t('filters.filter_by_game')}
        </span>
        <GameSelector value={game} onChange={onGameChange} />
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import type { Game } from "@/src/schemas/schema";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

interface GameSelectorProps {
  value: Game | "all";
  onChange: (game: Game | "all") => void;
}

export function GameSelector({ value, onChange }: GameSelectorProps) {
  const t = useTranslations('GameSelector');

  const games: { id: Game | "all" }[] = [
    { id: "all" },
    { id: "ds1" },
    { id: "ds2" },
    { id: "ds3" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-ds-surface-2 border border-ds-border rounded-sm">
      {games.map((g) => {
        const active = value === g.id;
        return (
          <Button
            key={g.id}
            onClick={() => onChange(g.id)}
            className={cn(
              "relative px-4 cursor-pointer py-2 text-xs tracking-widest uppercase transition-all duration-200 font-display rounded-sm",
              active ? "bg-ds-gold text-ds-bg" : "bg-transparent text-ds-muted hover:text-ds-gold-dim"
            )}
          >
            <span className="hidden sm:inline">{t(g.id)}</span>
            <span className="sm:hidden">{t(`short.${g.id}`)}</span>
          </Button>
        );
      })}
    </div>
  );
}
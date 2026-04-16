"use client";

import { cn } from "@/lib/utils";
import type { Game } from "@/src/schemas/schema";
import { Button } from "../ui/button";

const GAMES: { id: Game | "all"; label: string; short: string }[] = [
  { id: "all", label: "All Games", short: "ALL" },
  { id: "ds1", label: "Dark Souls", short: "DS I" },
  { id: "ds2", label: "Dark Souls II", short: "DS II" },
  { id: "ds3", label: "Dark Souls III", short: "DS III" },
];

interface GameSelectorProps {
  value: Game | "all";
  onChange: (game: Game | "all") => void;
}

export function GameSelector({ value, onChange }: GameSelectorProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-ds-surface-2 border border-ds-border rounded-sm">
      {GAMES.map((g) => {
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
            <span className="hidden sm:inline">{g.label}</span>
            <span className="sm:hidden">{g.short}</span>
          </Button>
        );
      })}
    </div>
  );
}
"use client";

import type { Game } from "@/src/schemas/schema";
import { Castle01Icon, Crown02Icon, Sword02FreeIcons, UserGroup03Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { EntityPreviewSection } from "./EntityPreviewSection";
import { GameSelector } from "./GameSelector";
import { StatCard } from "./StatCard";

interface AllStats {
  all: EntityCounts;
  ds1: EntityCounts;
  ds2: EntityCounts;
  ds3: EntityCounts;
}

interface EntityCounts {
  bosses: number;
  weapons: number;
  locations: number;
  npcs: number;
}

interface HomeContentProps {
  stats: AllStats;
}

export function HomeContent({ stats }: HomeContentProps) {
  const [selectedGame, setSelectedGame] = useState<Game | "all">("all");

  const currentStats = stats[selectedGame];
  const gameFilter = selectedGame === "all" ? undefined : selectedGame;

  return (
    <div className="flex flex-col gap-12">
      {/* Game Selector */}
      <div className="flex justify-center">
        <GameSelector value={selectedGame} onChange={setSelectedGame} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Bosses" count={currentStats.bosses} icon={Crown02Icon} href="/bosses" />
        <StatCard label="Weapons" count={currentStats.weapons} icon={Sword02FreeIcons} href="/weapons" />
        <StatCard label="Locations" count={currentStats.locations} icon={Castle01Icon} href="/locations" />
        <StatCard label="NPCs" count={currentStats.npcs} icon={UserGroup03Icon} href="/npcs" />
      </div>

      <div className="ds-divider" />

      {/* Entity previews */}
      <div className="flex flex-col gap-14">
        <EntityPreviewSection type="bosses" label="Bosses" game={gameFilter} />
        <EntityPreviewSection type="weapons" label="Weapons" game={gameFilter} />
        <EntityPreviewSection type="locations" label="Locations" game={gameFilter} />
        <EntityPreviewSection type="npcs" label="NPCs" game={gameFilter} />
      </div>
    </div>
  );
}
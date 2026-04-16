"use client";

import { useEntityPreview } from "@/src/hooks/useEntities";
import type { Game } from "@/src/schemas/schema";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface EntityItem {
  slug: string;
  name: string;
  game: Game;
  description?: string;
  imageUrl?: string;
  location?: string;
  weaponType?: string;
}

interface EntityPreviewSectionProps {
  type: "bosses" | "weapons" | "locations" | "npcs";
  label: string;
  game?: Game;
}

function EntityItemCard({ item, type }: { item: EntityItem; type: string }) {
  const subtitle =
    type === "weapons" ? item.weaponType :
      type === "bosses" ? item.location :
        type === "npcs" ? item.location :
          item.description?.slice(0, 60);

  return (
    <Link
      href={`/${type}/${item.slug}`}
      className="group flex flex-col gap-2 p-4 transition-all duration-200 bg-ds-surface border border-ds-border rounded-sm hover:border-ds-gold"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm leading-tight transition-colors duration-200 font-display text-ds-text group-hover:text-ds-gold">
          {item.name}
        </span>
        <span className="ds-badge shrink-0">{item.game.toUpperCase()}</span>
      </div>

      {subtitle && (
        <p className="text-xs leading-relaxed line-clamp-2 font-lore text-ds-muted">
          {subtitle}
        </p>
      )}
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="p-4 flex flex-col gap-2 animate-pulse bg-ds-surface border border-ds-border rounded-sm">
      <div className="h-4 w-3/4 rounded bg-ds-faint" />
      <div className="h-3 w-1/2 rounded bg-ds-faint" />
    </div>
  );
}

export function EntityPreviewSection({ type, label, game }: EntityPreviewSectionProps) {
  const state = useEntityPreview<EntityItem>(type, game);
  const t = useTranslations('EntityPreview');

  const items =
    state.status === "success" ? state.data.data : [];

  const total =
    state.status === "success" ? state.data.total : null;

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm tracking-[0.2em] uppercase font-display text-ds-gold">
          {label}
        </h2>

        {total !== null && (
          <Link
            href={`/${type}${game ? `?game=${game}` : ""}`}
            className="text-xs tracking-widest uppercase transition-colors duration-200 font-display text-ds-muted hover:text-ds-gold-dim"
          >
            {t('viewAll', { count: total })}
          </Link>
        )}
      </div>

      <div className="ds-divider" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {state.status === "loading" &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        }
        {state.status === "error" && (
          <p className="text-xs col-span-full font-display text-ds-muted">
            {t('error')}
          </p>
        )}
        {items.map((item) => (
          <EntityItemCard key={item.slug} item={item} type={type} />
        ))}
      </div>
    </section>
  );
}
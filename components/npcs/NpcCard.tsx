"use client";

import { Link } from "@/src/i18n/routing";
import type { Npc } from "@/src/schemas/schema";
import { MapsLocation01Icon, Sword, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

interface NpcCardProps {
  npc: Npc;
}

export function NpcCard({ npc }: NpcCardProps) {
  const t = useTranslations('NpcsPage');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <Link
      href={`/${locale}/npcs/${npc.slug}`}
      className="group relative flex flex-col gap-4 p-5 rounded-sm border border-ds-border bg-ds-surface/50 hover:bg-ds-surface-2 transition-all duration-500 hover:border-ds-gold/50"
    >
      {/* Visual background effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(200,155,60,0.1),transparent_70%)]" />

      <div className="flex items-start justify-start gap-4">
        {npc.imageUrl ? (
          <Image
            src={npc.imageUrl || ""}
            alt={npc.name}
            width={50}
            height={50}
            className="rounded-sm"
          />
        ) : (
          <div className="w-10 h-10 rounded-full border border-ds-border-2 bg-ds-bg flex items-center justify-center text-ds-muted group-hover:text-ds-gold-dim transition-colors">
            <HugeiconsIcon icon={User} size={20} />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="ds-badge uppercase">{npc.game}</span>
            {npc.isHostile && (
              <span className="text-[9px] uppercase tracking-tighter text-red-500/80 font-display flex items-center gap-1">
                <HugeiconsIcon icon={Sword} size={10} />
                {t('card.hostile')}
              </span>
            )}
          </div>
          <h3 className="text-lg font-display text-ds-text group-hover:text-ds-gold transition-colors duration-300">
            {npc.name}
          </h3>
        </div>

      </div>

      <div className="flex flex-col gap-3 mt-auto">
        {npc.location && (
          <div className="flex items-center gap-2 text-xs text-ds-muted font-lore">
            <HugeiconsIcon icon={MapsLocation01Icon} size={14} className="text-ds-gold-dim" />
            <span className="truncate">{npc.location}</span>
          </div>
        )}

        <p className="text-sm text-ds-muted font-lore line-clamp-2 italic leading-relaxed">
          {npc.description || t('card.no_description')}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <div className="h-px flex-1 bg-gradient-to-r from-ds-border to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-display text-ds-gold-dim group-hover:text-ds-gold transition-colors">
            {t('card.view_details')}
          </span>
        </div>
      </div>
    </Link>
  );
}

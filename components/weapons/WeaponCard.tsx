"use client";

import { Link } from "@/src/i18n/routing";
import type { Weapon } from "@/src/schemas/schema";
import { Sword01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

interface WeaponCardProps {
  weapon: Weapon;
}

export function WeaponCard({ weapon }: WeaponCardProps) {
  const t = useTranslations('WeaponsPage');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <Link
      href={`/${locale}/weapons/${weapon.slug}`}
      className="group relative flex flex-col gap-4 p-5 rounded-sm border border-ds-border bg-ds-surface/50 hover:bg-ds-surface-2 transition-all duration-500 hover:border-ds-gold/50 h-full"
    >
      {/* Visual background effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(200,155,60,0.1),transparent_70%)]" />

      <div className="flex items-start justify-start gap-4">
        {weapon.imageUrl ? (
          <div className="relative w-16 h-16 rounded-sm overflow-hidden border border-ds-border-2 flex-shrink-0">
            <Image
              src={weapon.imageUrl}
              alt={weapon.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-sm border border-ds-border-2 bg-ds-bg flex items-center justify-center text-ds-muted group-hover:text-ds-gold-dim transition-colors flex-shrink-0">
            <HugeiconsIcon icon={Sword01Icon} size={28} />
          </div>
        )}
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="ds-badge uppercase">{weapon.game}</span>
            {weapon.weaponType && (
              <span className="text-[9px] uppercase tracking-tighter text-ds-gold-dim font-display border border-ds-gold-dim/20 px-1.5 py-0.5 rounded-sm bg-ds-gold/5">
                {weapon.weaponType}
              </span>
            )}
          </div>
          <h3 className="text-lg font-display text-ds-text group-hover:text-ds-gold transition-colors duration-300 truncate">
            {weapon.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <p className="text-sm text-ds-muted font-lore line-clamp-3 italic leading-relaxed">
          {weapon.description || t('card.no_description')}
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

"use client";

import { useTranslations } from "next-intl";
import { Embers } from "@/components/home/Embers";

export function WeaponsHero() {
  const t = useTranslations('WeaponsPage');

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden rounded-sm border border-ds-border bg-ds-surface/40 mb-10 group">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,155,60,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ds-gold/30 to-transparent" />
      
      <Embers count={15} />

      <div className="relative flex flex-col items-center text-center px-6 max-w-3xl mx-auto gap-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.5em] text-ds-gold-dim font-display">
            {t('hero.subtitle')}
          </span>
          <h1 className="text-4xl sm:text-6xl font-display text-ds-text ds-glow tracking-tight">
            {t('hero.title')}
          </h1>
        </div>
        
        <p className="text-ds-muted font-lore text-lg italic leading-relaxed max-w-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700">
          "{t('hero.description')}"
        </p>

        <div className="flex items-center gap-4 mt-2">
           <div className="h-px w-12 bg-ds-border" />
           <div className="w-2 h-2 rounded-full border border-ds-gold/50 rotate-45" />
           <div className="h-px w-12 bg-ds-border" />
        </div>
      </div>
    </div>
  );
}

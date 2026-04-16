"use client";

import { useTranslations } from "next-intl";
import { Embers } from "@/components/home/Embers";

export function NpcsHero() {
  const t = useTranslations('NpcsPage');

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden py-16 sm:py-24 border-b border-ds-border bg-ds-surface/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(200,155,60,0.05)_0%,transparent_70%)]" />
      <Embers count={12} />

      <div className="relative flex flex-col items-center gap-4 px-6 text-center">
        <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-display text-ds-gold-dim animate-in fade-in slide-in-from-bottom-2 duration-700">
          {t('hero.subtitle')}
        </p>
        
        <div className="w-16 ds-divider opacity-50" />

        <h1 className="ds-glow text-4xl sm:text-6xl font-semibold tracking-wider font-display text-ds-text animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          {t('hero.title')}
        </h1>

        <p className="text-base sm:text-lg font-light italic max-w-lg leading-relaxed font-lore text-ds-muted animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          {t('hero.description')}
        </p>
      </div>
    </section>
  );
}

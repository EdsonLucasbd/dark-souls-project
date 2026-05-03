"use client";

import { Embers } from "@/components/home/Embers";
import { cn } from "@/lib/utils";
import { useEntity } from "@/src/hooks/useEntity";
import { Link } from "@/src/i18n/routing";
import type { Npc } from "@/src/schemas/schema";
import {
  ArrowLeft02Icon,
  BookOpen01Icon,
  GlobalIcon,
  MapsLocation01Icon,
  Sword,
  UserGroupIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

export function NpcDetail() {
  const t = useTranslations("NpcsPage");
  const { slug } = useParams();
  const state = useEntity<{ data: Npc }>("npcs", slug as string);

  const isLoading = state.status === "loading" || state.status === "idle";
  const isError = state.status === "error";
  const npc = state.status === "success" ? state.data.data : null;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 animate-pulse">
        <div className="h-64 bg-ds-surface/50 rounded-sm border border-ds-border" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 bg-ds-surface/50 w-1/3 rounded-sm" />
            <div className="h-32 bg-ds-surface/50 rounded-sm" />
          </div>
          <div className="h-48 bg-ds-surface/50 rounded-sm" />
        </div>
      </div>
    );
  }

  if (isError || !npc) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
        <div className="w-16 h-16 rounded-full border border-ds-border flex items-center justify-center text-ds-muted">
          <HugeiconsIcon icon={UserGroupIcon} size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-display text-ds-text">{t("details.not_found")}</h2>
          <p className="text-ds-muted font-lore italic">{isError ? t("list.error_loading") : ""}</p>
        </div>
        <Link
          href="/npcs"
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-ds-gold hover:text-ds-gold-light transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
          {t("details.back_to_list")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Back Button */}
      <Link
        href="/npcs"
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ds-muted hover:text-ds-gold transition-colors w-fit group"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} size={14} className="group-hover:-translate-x-1 transition-transform" />
        {t("details.back_to_list")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Hero Area */}
          <div className="relative group overflow-hidden rounded-sm border border-ds-border bg-ds-surface/40 p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,155,60,0.05),transparent_70%)] pointer-events-none" />
            <Embers count={10} />

            <div className="relative flex flex-col sm:flex-row items-center gap-8">
              {npc.imageUrl && (
                <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-sm overflow-hidden border border-ds-border-2 shadow-2xl">
                  <Image
                    src={npc.imageUrl}
                    alt={npc.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              )}

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
                <div className="flex items-center gap-3">
                  <span className="ds-badge uppercase">{npc.game}</span>
                  {npc.isHostile && (
                    <span className="text-[10px] uppercase tracking-tighter text-red-500/80 font-display flex items-center gap-1 border border-red-900/50 px-2 py-0.5 rounded-sm bg-red-950/20">
                      <HugeiconsIcon icon={Sword} size={12} />
                      {t("details.hostile")}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl sm:text-5xl font-display text-ds-text ds-glow">
                  {npc.name}
                </h1>

                <p className="text-lg text-ds-muted font-lore italic leading-relaxed max-w-xl">
                  "{npc.description || t("card.no_description")}"
                </p>
              </div>
            </div>
          </div>

          {/* Lore Section */}
          {npc.lore && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={BookOpen01Icon} size={20} className="text-ds-gold" />
                <h2 className="text-xl font-display text-ds-text uppercase tracking-widest">
                  {t("details.lore_title")}
                </h2>
                <div className="h-px flex-1 ds-divider opacity-30" />
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-ds-muted font-lore text-lg leading-loose whitespace-pre-line italic opacity-90">
                  {npc.lore}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-1000">
          <div className="rounded-sm border border-ds-border bg-ds-surface/30 p-6 flex flex-col gap-6">
            <h3 className="text-xs font-display text-ds-gold-dim uppercase tracking-[0.3em] border-b border-ds-border pb-4">
              {t("details.sidebar_title")}
            </h3>

            <div className="flex flex-col gap-5">
              {/* Location */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ds-muted font-display">
                  <HugeiconsIcon icon={MapsLocation01Icon} size={14} className="text-ds-gold-dim" />
                  {t("details.location")}
                </div>
                <span className="text-sm text-ds-text font-lore pl-5">
                  {npc.location || t("details.unknown_value")}
                </span>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ds-muted font-display">
                  <HugeiconsIcon icon={Sword} size={14} className="text-ds-gold-dim" />
                  {t("details.status")}
                </div>
                <span className={cn(
                  "text-sm font-lore pl-5",
                  npc.isHostile ? "text-red-400" : "text-green-400"
                )}>
                  {npc.isHostile ? t("details.hostile") : t("details.friendly")}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-6 border-t border-ds-border-2">
              <a
                href={npc.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-sm border border-ds-gold-dim/30 bg-ds-gold/5 hover:bg-ds-gold/10 hover:border-ds-gold/50 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-display text-ds-gold group"
              >
                <HugeiconsIcon icon={GlobalIcon} size={16} className="group-hover:rotate-12 transition-transform" />
                {t("details.wiki_link")}
              </a>
            </div>
          </div>

          {/* Decorative visual in sidebar */}
          {/* <div className="relative h-40 rounded-sm overflow-hidden border border-ds-border-2 opacity-40 group grayscale hover:grayscale-0 transition-all duration-1000">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <Image 
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" 
                alt="Dark Souls Atmosphere" 
                fill 
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-[10px] font-display text-ds-gold-dim tracking-widest uppercase">
                  Praise the Sun
                </p>
              </div>
           </div> */}
        </div>
      </div>
    </div>
  );
}

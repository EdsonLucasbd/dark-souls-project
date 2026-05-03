"use client";

import { Embers } from "@/components/home/Embers";
import { useEntity } from "@/src/hooks/useEntity";
import { Link } from "@/src/i18n/routing";
import type { Weapon } from "@/src/schemas/schema";
import {
  ArrowLeft02Icon,
  DashboardSquare01Icon,
  FireIcon,
  FlashIcon,
  GlobalIcon,
  MagicWand01Icon,
  Sword01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

export function WeaponDetail() {
  const t = useTranslations("WeaponsPage");
  const { slug } = useParams();
  const state = useEntity<{ data: Weapon }>("weapons", slug as string);

  const isLoading = state.status === "loading" || state.status === "idle";
  const isError = state.status === "error";
  const weapon = state.status === "success" ? state.data.data : null;

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

  if (isError || !weapon) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
        <div className="w-16 h-16 rounded-full border border-ds-border flex items-center justify-center text-ds-muted">
          <HugeiconsIcon icon={Sword01Icon} size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-display text-ds-text">{t("details.not_found")}</h2>
          <p className="text-ds-muted font-lore italic">{isError ? t("list.error_loading") : ""}</p>
        </div>
        <Link
          href="/weapons"
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
        href="/weapons"
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
              {weapon.imageUrl && (
                <div className="relative w-32 h-32 sm:w-64 sm:h-64 rounded-sm overflow-hidden border border-ds-border-2 shadow-2xl bg-ds-bg/40">
                  <Image
                    src={weapon.imageUrl}
                    alt={weapon.name}
                    fill
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              )}

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
                <div className="flex items-center gap-3">
                  <span className="ds-badge uppercase">{weapon.game}</span>
                  {weapon.weaponType && (
                    <span className="text-[10px] uppercase tracking-tighter text-ds-gold-dim font-display border border-ds-gold-dim/20 px-2 py-0.5 rounded-sm bg-ds-gold/5">
                      {weapon.weaponType}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl sm:text-5xl font-display text-ds-text ds-glow">
                  {weapon.name}
                </h1>

                <p className="text-lg text-ds-muted font-lore italic leading-relaxed max-w-xl">
                  "{weapon.description || t("card.no_description")}"
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attack Power */}
            <div className="rounded-sm border border-ds-border bg-ds-surface/20 p-6 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={Sword01Icon} size={18} className="text-ds-gold" />
                <h3 className="text-sm font-display text-ds-text uppercase tracking-widest">{t("details.damage_title")}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <DamageStat label={t("details.physical")} value={weapon.physicalDamage} icon={Sword01Icon} />
                <DamageStat label={t("details.magic")} value={weapon.magicDamage} icon={MagicWand01Icon} />
                <DamageStat label={t("details.fire")} value={weapon.fireDamage} icon={FireIcon} />
                <DamageStat label={t("details.lightning")} value={weapon.lightningDamage} icon={FlashIcon} />
              </div>
            </div>

            {/* Scaling & Requirements */}
            <div className="rounded-sm border border-ds-border bg-ds-surface/20 p-6 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={DashboardSquare01Icon} size={18} className="text-ds-gold" />
                <h3 className="text-sm font-display text-ds-text uppercase tracking-widest">{t("details.scaling_title")}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ScalingStat label={t("details.strength")} scaling={weapon.strengthScaling} req={weapon.strengthReq} />
                <ScalingStat label={t("details.dexterity")} scaling={weapon.dexterityScaling} req={weapon.dexterityReq} />
                <ScalingStat label={t("details.intelligence")} scaling={weapon.intelligenceScaling} req={weapon.intelligenceReq} />
                <ScalingStat label={t("details.faith")} scaling={weapon.faithScaling} req={weapon.faithReq} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-1000">
          <div className="rounded-sm border border-ds-border bg-ds-surface/30 p-6 flex flex-col gap-6">
            <h3 className="text-xs font-display text-ds-gold-dim uppercase tracking-[0.3em] border-b border-ds-border pb-4">
              Informações Técnicas
            </h3>

            <div className="flex flex-col gap-5">
              {weapon.attackType && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ds-muted font-display">
                    <HugeiconsIcon icon={Sword01Icon} size={14} className="text-ds-gold-dim" />
                    {t("details.attack_type")}
                  </div>
                  <span className="text-sm text-ds-text font-lore pl-5">
                    {weapon.attackType}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-6 border-t border-ds-border-2">
              <a
                href={weapon.wikiUrl}
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
          <div className="relative h-40 rounded-sm overflow-hidden border border-ds-border-2 opacity-40 group grayscale hover:grayscale-0 transition-all duration-1000">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1590424600645-ec7570e3049b?q=80&w=2070&auto=format&fit=crop"
              alt="Dark Souls Weapon Atmosphere"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <p className="text-[10px] font-display text-ds-gold-dim tracking-widest uppercase">
                Prepare to Die
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DamageStat({ label, value, icon }: { label: string, value?: number, icon: any }) {
  if (value === undefined) return null;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ds-muted font-display">
        <HugeiconsIcon icon={icon} size={12} className="text-ds-gold-dim" />
        {label}
      </div>
      <span className="text-lg font-display text-ds-text">{value}</span>
    </div>
  );
}

function ScalingStat({ label, scaling, req }: { label: string, scaling?: string, req?: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[10px] uppercase tracking-widest text-ds-muted font-display">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-display text-ds-gold">{scaling || "-"}</span>
        {req !== undefined && (
          <span className="text-xs font-lore text-ds-muted">({req})</span>
        )}
      </div>
    </div>
  );
}

"use client";

import { Link } from "@/src/i18n/routing";
import { Home01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";

export function HomeButton() {
  const t = useTranslations('Common');

  return (
    <Link 
      href="/"
      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ds-muted hover:text-ds-gold transition-colors w-fit group mb-6"
    >
      <HugeiconsIcon 
        icon={Home01Icon} 
        size={14} 
        className="group-hover:-translate-y-0.5 transition-transform" 
      />
      {t('home_button')}
    </Link>
  );
}

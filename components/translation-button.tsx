"use client";

import { usePathname, useRouter } from "@/src/i18n/routing";
import { Globe02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TranslationButton = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="fixed top-10 right-10 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Change language"
            className="rounded-full shadow-none w-10 h-10 border border-ds-border bg-ds-surface-2 hover:bg-ds-surface hover:border-ds-gold transition-colors"
            size="icon"
            variant="ghost"
          >
            <HugeiconsIcon icon={Globe02Icon} className="text-ds-gold w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="pb-2 bg-ds-surface-2 border-ds-border border rounded-sm font-display uppercase tracking-widest text-xs min-w-[140px]">
          <DropdownMenuItem
            onClick={() => switchLocale('pt')}
            className={`cursor-pointer py-2 px-3 mt-1 rounded-sm focus:bg-ds-surface focus:text-ds-gold transition-colors ${locale === 'pt' ? 'text-ds-gold bg-ds-surface bg-opacity-50' : 'text-ds-muted'
              }`}
          >
            <span className="mr-2 text-base">BR</span> Português
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => switchLocale('en')}
            className={`cursor-pointer py-2 px-3 rounded-sm focus:bg-ds-surface focus:text-ds-gold transition-colors ${locale === 'en' ? 'text-ds-gold bg-ds-surface bg-opacity-50' : 'text-ds-muted'
              }`}
          >
            <span className="mr-2 text-base">US</span> English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

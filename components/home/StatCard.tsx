import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

interface StatCardProps {
  label: string;
  count: number;
  icon: IconSvgElement;
  href: string;
}

export function StatCard({ label, count, icon: Icon, href }: StatCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-2 p-5 transition-all duration-300 bg-ds-surface border border-ds-border rounded-sm hover:border-ds-gold"
    >
      <div className="flex items-center justify-between">
        <HugeiconsIcon icon={Icon} className="text-[22px] text-ds-gold" />
        <span className="text-xs tracking-widest uppercase transition-colors duration-300 font-display text-ds-muted group-hover:text-ds-gold">
          {label}
        </span>
      </div>

      <div className="text-4xl font-semibold transition-colors duration-300 font-display text-ds-gold">
        {count.toLocaleString()}
      </div>

      <div className="text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-display text-ds-gold-dim">
        Explore →
      </div>
    </a>
  );
}
import { Embers } from "@/components/home/Embers";
import { HomeContent } from "@/components/home/HomeContent";
import { db } from "@/src/db";
import { bosses, locations, npcs, weapons } from "@/src/db/schema";
import type { Game } from "@/src/schemas/schema";
import { count, eq } from "drizzle-orm";

// ------------------------------------------------------------------ //
// Busca contagens direto no banco — sem round-trip pela API           //
// ------------------------------------------------------------------ //

async function fetchCounts(game?: Game) {
  const [
    [bossCount],
    [weaponCount],
    [locationCount],
    [npcCount],
  ] = await Promise.all([
    db.select({ total: count() }).from(bosses).where(game ? eq(bosses.game, game) : undefined),
    db.select({ total: count() }).from(weapons).where(game ? eq(weapons.game, game) : undefined),
    db.select({ total: count() }).from(locations).where(game ? eq(locations.game, game) : undefined),
    db.select({ total: count() }).from(npcs).where(game ? eq(npcs.game, game) : undefined),
  ]);

  return {
    bosses: bossCount.total,
    weapons: weaponCount.total,
    locations: locationCount.total,
    npcs: npcCount.total,
  };
}
export default async function HomePage() {
  const [all, ds1, ds2, ds3] = await Promise.all([
    fetchCounts(),
    fetchCounts("ds1"),
    fetchCounts("ds2"),
    fetchCounts("ds3"),
  ]);

  const stats = { all, ds1, ds2, ds3 };

  return (
    <main className="bg-ds-bg min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden min-h-[80vh] border-b border-ds-border">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(200,155,60,0.07)_0%,transparent_70%)]" />

        {/* Stone texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%224%22_height=%224%22%3E%3Crect_width=%224%22_height=%224%22_fill=%22%23100e0a%22/%3E%3Crect_x=%220%22_y=%220%22_width=%221%22_height=%221%22_fill=%22%23181410%22_opacity=%22.5%22/%3E%3Crect_x=%222%22_y=%222%22_width=%221%22_height=%221%22_fill=%22%23181410%22_opacity=%22.4%22/%3E%3C/svg%3E')]" />

        <Embers count={22} />

        {/* Text content */}
        <div className="relative flex flex-col items-center gap-6 px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase font-display text-ds-gold-dim">
            The Souls Compendium
          </p>

          <div className="w-24 ds-divider" />

          <h1 className="ds-glow text-5xl sm:text-7xl lg:text-8xl font-semibold leading-none tracking-wider font-display text-ds-text">
            Dark Souls
          </h1>

          <p className="text-xl sm:text-2xl font-light italic max-w-md leading-relaxed font-lore text-ds-muted">
            A compendium of knowledge from across the trilogy — bosses, weapons, locations and souls.
          </p>

          <div className="w-24 ds-divider" />

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs tracking-widest uppercase font-display text-ds-gold-dim">
            <span>{all.bosses} bosses</span>
            <span className="text-ds-border-2">·</span>
            <span>{all.weapons} weapons</span>
            <span className="text-ds-border-2">·</span>
            <span>{all.locations} locations</span>
            <span className="text-ds-border-2">·</span>
            <span>{all.npcs} npcs</span>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-b from-transparent to-ds-bg" />
      </section>

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <HomeContent stats={stats} />
      </div>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="text-center py-12 border-t border-ds-border">
        <p className="text-xs tracking-widest uppercase font-display text-ds-muted">
          May the flames guide thee
        </p>
      </footer>
    </main>
  );
}
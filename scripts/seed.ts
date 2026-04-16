/**
 * Script de seed — popula o banco com dados da Dark Souls Wiki (Fandom).
 *
 * Uso:
 *   npx tsx scripts/seed.ts               → tudo
 *   npx tsx scripts/seed.ts --bosses      → só bosses
 *   npx tsx scripts/seed.ts --weapons     → só weapons
 *   npx tsx scripts/seed.ts --locations   → só locations
 *   npx tsx scripts/seed.ts --npcs        → só npcs
 */

import { db } from "@/src/db";
import { bosses, locations, npcs, weapons } from "@/src/db/schema";
import type { Game } from "@/src/schemas/schema";
import { delay } from "@/src/scrapers/base.scraper";
import { scrapeBossPage } from "@/src/scrapers/boss.scraper";
import { getCategoryLinks } from "@/src/scrapers/category.scraper";
import { scrapeLocationPage } from "@/src/scrapers/location.scraper";
import { scrapeNpcPage } from "@/src/scrapers/npc.scraper";
import { scrapeWeaponPage } from "@/src/scrapers/weapon.scraper";

// ------------------------------------------------------------------ //
// Config                                                               //
// ------------------------------------------------------------------ //

const DELAY_MS = 1500;

const GAME_CATEGORIES: Record<
  Game,
  { bosses: string; weapons: string; locations: string; npcs: string }
> = {
  ds1: {
    bosses: "/wiki/Category:Dark_Souls:_Bosses",
    weapons: "/wiki/Category:Dark_Souls:_Weapons",
    locations: "/wiki/Category:Dark_Souls:_Locations",
    npcs: "/wiki/Category:Dark_Souls:_Characters",
  },
  ds2: {
    bosses: "/wiki/Category:Dark_Souls_II:_Bosses",
    weapons: "/wiki/Category:Dark_Souls_II:_Weapons",
    locations: "/wiki/Category:Dark_Souls_II:_Locations",
    npcs: "/wiki/Category:Dark_Souls_II:_Characters",
  },
  ds3: {
    bosses: "/wiki/Category:Dark_Souls_III:_Bosses",
    weapons: "/wiki/Category:Dark_Souls_III:_Weapons",
    locations: "/wiki/Category:Dark_Souls_III:_Locations",
    npcs: "/wiki/Category:Dark_Souls_III:_Characters",
  },
};

// ------------------------------------------------------------------ //
// Helper genérico                                                      //
// ------------------------------------------------------------------ //

function pageNameFromUrl(url: string) {
  return decodeURIComponent(url.split("/wiki/")[1] ?? url);
}

async function seedEntity<T extends { slug: string }>(options: {
  label: string;
  icon: string;
  getLinks: (game: Game) => string;
  scrape: (url: string, game: Game) => Promise<T | null>;
  insert: (item: T) => Promise<void>;
}) {
  console.log(`\n${options.icon}  Iniciando seed de ${options.label}...\n`);
  let total = 0;

  for (const game of Object.keys(GAME_CATEGORIES) as Game[]) {
    const categoryPath = options.getLinks(game);
    console.log(`\n[${game.toUpperCase()}] Buscando lista de ${options.label}...`);

    const links = await getCategoryLinks(categoryPath);
    console.log(`  → ${links.length} item(s) encontrado(s)`);

    for (const [i, url] of links.entries()) {
      process.stdout.write(
        `  [${i + 1}/${links.length}] ${pageNameFromUrl(url)} `
      );

      const item = await options.scrape(url, game);

      if (item) {
        await options.insert(item);
        total++;
        console.log("✓");
      } else {
        console.log("✗ (ignorado)");
      }

      await delay(DELAY_MS);
    }
  }

  console.log(
    `\n✅ ${options.label} concluído — ${total} registros inseridos/atualizados.`
  );
}

// ------------------------------------------------------------------ //
// Runners                                                              //
// ------------------------------------------------------------------ //

const seedBosses = () =>
  seedEntity({
    label: "bosses",
    icon: "⚔️",
    getLinks: (game) => GAME_CATEGORIES[game].bosses,
    scrape: scrapeBossPage,
    insert: (item) =>
      db.insert(bosses).values(item).onConflictDoUpdate({
        target: bosses.slug,
        set: { ...item },
      }).then(),
  });

const seedWeapons = () =>
  seedEntity({
    label: "weapons",
    icon: "🗡️",
    getLinks: (game) => GAME_CATEGORIES[game].weapons,
    scrape: scrapeWeaponPage,
    insert: (item) =>
      db.insert(weapons).values(item).onConflictDoUpdate({
        target: weapons.slug,
        set: { ...item },
      }).then(),
  });

const seedLocations = () =>
  seedEntity({
    label: "locations",
    icon: "🏰",
    getLinks: (game) => GAME_CATEGORIES[game].locations,
    scrape: scrapeLocationPage,
    insert: (item) =>
      db.insert(locations).values(item).onConflictDoUpdate({
        target: locations.slug,
        set: { ...item },
      }).then(),
  });

const seedNpcs = () =>
  seedEntity({
    label: "npcs",
    icon: "🧙",
    getLinks: (game) => GAME_CATEGORIES[game].npcs,
    scrape: scrapeNpcPage,
    insert: (item) =>
      db.insert(npcs).values(item).onConflictDoUpdate({
        target: npcs.slug,
        set: { ...item },
      }).then(),
  });

// ------------------------------------------------------------------ //
// Entrypoint                                                           //
// ------------------------------------------------------------------ //

async function main() {
  const args = process.argv.slice(2);
  const all = args.length === 0;
  const run = (flag: string) => all || args.includes(flag);

  console.log("🔥 Dark Souls Wiki Seed");
  console.log("========================");

  if (run("--bosses")) await seedBosses();
  if (run("--weapons")) await seedWeapons();
  if (run("--locations")) await seedLocations();
  if (run("--npcs")) await seedNpcs();

  console.log("\n🏁 Seed finalizado!\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("💀 Seed falhou:", err);
  process.exit(1);
});
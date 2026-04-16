import { db } from "@/src/db";
import { bosses, locations, npcs, weapons } from "@/src/db/schema";
import { eq } from "drizzle-orm";

async function migrate() {
  console.log("🚀 Starting data migration to localized columns...");

  // Migrate Bosses
  console.log("Migrating bosses...");
  const allBosses = await db.select().from(bosses);
  for (const b of allBosses) {
    await db.update(bosses).set({
      nameEn: b.name,
      locationEn: b.location,
      descriptionEn: b.description,
      loreEn: b.lore
    }).where(eq(bosses.id, b.id));
  }

  // Migrate Weapons
  console.log("Migrating weapons...");
  const allWeapons = await db.select().from(weapons);
  for (const w of allWeapons) {
    await db.update(weapons).set({
      nameEn: w.name,
      weaponTypeEn: w.weaponType,
      attackTypeEn: w.attackType,
      descriptionEn: w.description
    }).where(eq(weapons.id, w.id));
  }

  // Migrate Locations
  console.log("Migrating locations...");
  const allLocations = await db.select().from(locations);
  for (const l of allLocations) {
    await db.update(locations).set({
      nameEn: l.name,
      descriptionEn: l.description,
      loreEn: l.lore
    }).where(eq(locations.id, l.id));
  }

  // Migrate NPCs
  console.log("Migrating npcs...");
  const allNpcs = await db.select().from(npcs);
  for (const n of allNpcs) {
    await db.update(npcs).set({
      nameEn: n.name,
      locationEn: n.location,
      descriptionEn: n.description,
      loreEn: n.lore
    }).where(eq(npcs.id, n.id));
  }

  console.log("✅ Migration complete!");
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});

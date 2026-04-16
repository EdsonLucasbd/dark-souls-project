import { db } from "@/src/db";
import { bosses, locations, npcs, weapons } from "@/src/db/schema";
import { eq, isNull, or } from "drizzle-orm";
import fs from "fs";
import path from "path";

async function exportMissing() {
  console.log("🔍 Looking for missing Portuguese translations...");

  const missingBosses = await db.select({
    id: bosses.id,
    slug: bosses.slug,
    nameEn: bosses.nameEn,
    locationEn: bosses.locationEn,
    descriptionEn: bosses.descriptionEn,
    loreEn: bosses.loreEn,
  }).from(bosses).where(isNull(bosses.namePt));

  const missingWeapons = await db.select({
    id: weapons.id,
    slug: weapons.slug,
    nameEn: weapons.nameEn,
    weaponTypeEn: weapons.weaponTypeEn,
    attackTypeEn: weapons.attackTypeEn,
    descriptionEn: weapons.descriptionEn,
  }).from(weapons).where(isNull(weapons.namePt));

  const missingLocations = await db.select({
    id: locations.id,
    slug: locations.slug,
    nameEn: locations.nameEn,
    descriptionEn: locations.descriptionEn,
    loreEn: locations.loreEn,
  }).from(locations).where(isNull(locations.namePt));

  const missingNpcs = await db.select({
    id: npcs.id,
    slug: npcs.slug,
    nameEn: npcs.nameEn,
    locationEn: npcs.locationEn,
    descriptionEn: npcs.descriptionEn,
    loreEn: npcs.loreEn,
  }).from(npcs).where(isNull(npcs.namePt));

  const data = {
    bosses: missingBosses,
    weapons: missingWeapons,
    locations: missingLocations,
    npcs: missingNpcs,
  };

  const total = missingBosses.length + missingWeapons.length + missingLocations.length + missingNpcs.length;
  
  if (total === 0) {
    console.log("✅ No missing translations found!");
    return;
  }

  const outputPath = path.join(process.cwd(), "missing-translations.json");
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\n📦 Found ${total} items missing translations.`);
  console.log(`📄 Exported to: ${outputPath}`);
  console.log("\n💡 Next step: An AI agent can now read this file and provide a 'translations-to-apply.json' file.");
}

async function importTranslations() {
  const inputPath = path.join(process.cwd(), "translation-to-apply.json");
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputPath}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  console.log("📥 Importing translations...");

  if (data.bosses) {
    for (const b of data.bosses) {
      await db.update(bosses).set({
        namePt: b.namePt,
        locationPt: b.locationPt,
        descriptionPt: b.descriptionPt,
        lorePt: b.lorePt
      }).where(eq(bosses.id, b.id));
    }
    console.log(`✓ Bosses: ${data.bosses.length} updated`);
  }

  if (data.weapons) {
    for (const w of data.weapons) {
      await db.update(weapons).set({
        namePt: w.namePt,
        weaponTypePt: w.weaponTypePt,
        attackTypePt: w.attackTypePt,
        descriptionPt: w.descriptionPt
      }).where(eq(weapons.id, w.id));
    }
    console.log(`✓ Weapons: ${data.weapons.length} updated`);
  }

  if (data.locations) {
    for (const l of data.locations) {
      await db.update(locations).set({
        namePt: l.namePt,
        descriptionPt: l.descriptionPt,
        lorePt: l.lorePt
      }).where(eq(locations.id, l.id));
    }
    console.log(`✓ Locations: ${data.locations.length} updated`);
  }

  if (data.npcs) {
    for (const n of data.npcs) {
      await db.update(npcs).set({
        namePt: n.namePt,
        locationPt: n.locationPt,
        descriptionPt: n.descriptionPt,
        lorePt: n.lorePt
      }).where(eq(npcs.id, n.id));
    }
    console.log(`✓ NPCs: ${data.npcs.length} updated`);
  }

  console.log("\n✅ Import complete!");
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--import")) {
    await importTranslations();
  } else {
    await exportMissing();
  }
}

main().catch(console.error);

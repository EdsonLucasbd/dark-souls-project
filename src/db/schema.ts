import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ------------------------------------------------------------------ //
// Enum helpers — SQLite não tem enum nativo, usamos text com validação //
// ------------------------------------------------------------------ //

export type Game = "ds1" | "ds2" | "ds3";

// ------------------------------------------------------------------ //
// Bosses                                                               //
// ------------------------------------------------------------------ //

export const bosses = sqliteTable("bosses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),        // ex: "gwyn-lord-of-cinder"
  name: text("name").notNull(),
  nameEn: text("name_en"),
  namePt: text("name_pt"),
  game: text("game").$type<Game>().notNull(),
  location: text("location"),
  locationEn: text("location_en"),
  locationPt: text("location_pt"),
  isOptional: integer("is_optional", { mode: "boolean" }).default(false),
  souls: integer("souls"),
  healthPoints: integer("health_points"),
  description: text("description"),
  descriptionEn: text("description_en"),
  descriptionPt: text("description_pt"),
  lore: text("lore"),
  loreEn: text("lore_en"),
  lorePt: text("lore_pt"),
  imageUrl: text("image_url"),
  wikiUrl: text("wiki_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});

// ------------------------------------------------------------------ //
// Weapons                                                              //
// ------------------------------------------------------------------ //

export const weapons = sqliteTable("weapons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  namePt: text("name_pt"),
  game: text("game").$type<Game>().notNull(),
  weaponType: text("weapon_type"),           // ex: "Straight Sword", "Greatsword"
  weaponTypeEn: text("weapon_type_en"),
  weaponTypePt: text("weapon_type_pt"),
  attackType: text("attack_type"),           // ex: "Regular / Thrust"
  attackTypeEn: text("attack_type_en"),
  attackTypePt: text("attack_type_pt"),
  physicalDamage: integer("physical_damage"),
  magicDamage: integer("magic_damage"),
  fireDamage: integer("fire_damage"),
  lightningDamage: integer("lightning_damage"),
  strengthReq: integer("strength_req"),
  dexterityReq: integer("dexterity_req"),
  intelligenceReq: integer("intelligence_req"),
  faithReq: integer("faith_req"),
  strengthScaling: text("strength_scaling"),  // ex: "A", "B", "C", "D", "E", "-"
  dexterityScaling: text("dexterity_scaling"),
  intelligenceScaling: text("intelligence_scaling"),
  faithScaling: text("faith_scaling"),
  description: text("description"),
  descriptionEn: text("description_en"),
  descriptionPt: text("description_pt"),
  imageUrl: text("image_url"),
  wikiUrl: text("wiki_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});

// ------------------------------------------------------------------ //
// Locations                                                            //
// ------------------------------------------------------------------ //

export const locations = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  namePt: text("name_pt"),
  game: text("game").$type<Game>().notNull(),
  description: text("description"),
  descriptionEn: text("description_en"),
  descriptionPt: text("description_pt"),
  lore: text("lore"),
  loreEn: text("lore_en"),
  lorePt: text("lore_pt"),
  imageUrl: text("image_url"),
  wikiUrl: text("wiki_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});

// ------------------------------------------------------------------ //
// NPCs                                                                 //
// ------------------------------------------------------------------ //

export const npcs = sqliteTable("npcs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  namePt: text("name_pt"),
  game: text("game").$type<Game>().notNull(),
  location: text("location"),
  locationEn: text("location_en"),
  locationPt: text("location_pt"),
  isHostile: integer("is_hostile", { mode: "boolean" }).default(false),
  description: text("description"),
  descriptionEn: text("description_en"),
  descriptionPt: text("description_pt"),
  lore: text("lore"),
  loreEn: text("lore_en"),
  lorePt: text("lore_pt"),
  imageUrl: text("image_url"),
  wikiUrl: text("wiki_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});
import { z } from "zod";

// ------------------------------------------------------------------ //
// Base                                                                 //
// ------------------------------------------------------------------ //

export const GameSchema = z.enum(["ds1", "ds2", "ds3"]);
export type Game = z.infer<typeof GameSchema>;

export const ScalingSchema = z.enum(["S", "A", "B", "C", "D", "E", "-"]);

// ------------------------------------------------------------------ //
// Boss                                                                 //
// ------------------------------------------------------------------ //

export const BossSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameEn: z.string().optional(),
  namePt: z.string().optional(),
  game: GameSchema,
  location: z.string().optional(),
  locationEn: z.string().optional(),
  locationPt: z.string().optional(),
  isOptional: z.boolean().default(false),
  souls: z.number().int().positive().optional(),
  healthPoints: z.number().int().positive().optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionPt: z.string().optional(),
  lore: z.string().optional(),
  loreEn: z.string().optional(),
  lorePt: z.string().optional(),
  imageUrl: z.string().url().optional(),
  wikiUrl: z.string().url(),
});

export type Boss = z.infer<typeof BossSchema>;

// ------------------------------------------------------------------ //
// Weapon                                                               //
// ------------------------------------------------------------------ //

export const WeaponSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameEn: z.string().optional(),
  namePt: z.string().optional(),
  game: GameSchema,
  weaponType: z.string().optional(),
  weaponTypeEn: z.string().optional(),
  weaponTypePt: z.string().optional(),
  attackType: z.string().optional(),
  attackTypeEn: z.string().optional(),
  attackTypePt: z.string().optional(),
  physicalDamage: z.number().int().nonnegative().optional(),
  magicDamage: z.number().int().nonnegative().optional(),
  fireDamage: z.number().int().nonnegative().optional(),
  lightningDamage: z.number().int().nonnegative().optional(),
  strengthReq: z.number().int().nonnegative().optional(),
  dexterityReq: z.number().int().nonnegative().optional(),
  intelligenceReq: z.number().int().nonnegative().optional(),
  faithReq: z.number().int().nonnegative().optional(),
  strengthScaling: ScalingSchema.optional(),
  dexterityScaling: ScalingSchema.optional(),
  intelligenceScaling: ScalingSchema.optional(),
  faithScaling: ScalingSchema.optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionPt: z.string().optional(),
  imageUrl: z.string().url().optional(),
  wikiUrl: z.string().url(),
});

export type Weapon = z.infer<typeof WeaponSchema>;

// ------------------------------------------------------------------ //
// Location                                                             //
// ------------------------------------------------------------------ //

export const LocationSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameEn: z.string().optional(),
  namePt: z.string().optional(),
  game: GameSchema,
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionPt: z.string().optional(),
  lore: z.string().optional(),
  loreEn: z.string().optional(),
  lorePt: z.string().optional(),
  imageUrl: z.string().url().optional(),
  wikiUrl: z.string().url(),
});

export type Location = z.infer<typeof LocationSchema>;

// ------------------------------------------------------------------ //
// NPC                                                                  //
// ------------------------------------------------------------------ //

export const NpcSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameEn: z.string().optional(),
  namePt: z.string().optional(),
  game: GameSchema,
  location: z.string().optional(),
  locationEn: z.string().optional(),
  locationPt: z.string().optional(),
  isHostile: z.boolean().default(false),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionPt: z.string().optional(),
  lore: z.string().optional(),
  loreEn: z.string().optional(),
  lorePt: z.string().optional(),
  imageUrl: z.string().url().optional(),
  wikiUrl: z.string().url(),
});

export type Npc = z.infer<typeof NpcSchema>;
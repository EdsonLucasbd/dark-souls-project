import { WeaponSchema, type Game, type Weapon } from "../schemas/schema";
import { fetchPage, parseNumber, toSlug } from "./base.scraper";

export async function scrapeWeaponPage(
  url: string,
  game: Game
): Promise<Weapon | null> {
  try {
    const $ = await fetchPage(url);

    const name = $(".page-header__title").first().text().trim();
    if (!name) return null;

    const getField = (source: string) =>
      $(`[data-source="${source}"] .pi-data-value`).first().text().trim();

    const imageUrl = $(".pi-image-thumbnail").first().attr("src");

    // Descrição — primeiro parágrafo real do artigo
    const description = $(".mw-parser-output > p, .mw-content-ltr > p, p")
      .filter((_, el) => $(el).text().trim().length > 40)
      .first()
      .text()
      .trim();

    // Damage — a wiki do DS varia bastante os nomes dos campos entre jogos
    const physRaw =
      getField("phys_dmg") || getField("Attack Value Physical") || getField("physical_damage");
    const magRaw =
      getField("mag_dmg") || getField("Attack Value Magic") || getField("magic_damage");
    const fireRaw =
      getField("fire_dmg") || getField("Attack Value Fire") || getField("fire_damage");
    const lightRaw =
      getField("light_dmg") || getField("Attack Value Lightning") || getField("lightning_damage");

    // Requirements
    const strReqRaw = getField("strength_req") || getField("Strength Requirement");
    const dexReqRaw = getField("dexterity_req") || getField("Dexterity Requirement");
    const intReqRaw = getField("intelligence_req") || getField("Intelligence Requirement");
    const fthReqRaw = getField("faith_req") || getField("Faith Requirement");

    // Scaling
    const cleanScaling = (raw: string) => {
      const letter = raw.trim().charAt(0).toUpperCase();
      return ["-", "S", "A", "B", "C", "D", "E"].includes(letter)
        ? (letter as "-" | "S" | "A" | "B" | "C" | "D" | "E")
        : undefined;
    };

    const raw = {
      slug: toSlug(name),
      name,
      game,
      weaponType: getField("weapon_type") || getField("Type") || undefined,
      attackType: getField("attack_type") || getField("Attack Type") || undefined,
      physicalDamage: physRaw ? parseNumber(physRaw) : undefined,
      magicDamage: magRaw ? parseNumber(magRaw) : undefined,
      fireDamage: fireRaw ? parseNumber(fireRaw) : undefined,
      lightningDamage: lightRaw ? parseNumber(lightRaw) : undefined,
      strengthReq: strReqRaw ? parseNumber(strReqRaw) : undefined,
      dexterityReq: dexReqRaw ? parseNumber(dexReqRaw) : undefined,
      intelligenceReq: intReqRaw ? parseNumber(intReqRaw) : undefined,
      faithReq: fthReqRaw ? parseNumber(fthReqRaw) : undefined,
      strengthScaling: cleanScaling(getField("str_scaling") || getField("Strength Bonus")),
      dexterityScaling: cleanScaling(getField("dex_scaling") || getField("Dexterity Bonus")),
      intelligenceScaling: cleanScaling(getField("int_scaling") || getField("Intelligence Bonus")),
      faithScaling: cleanScaling(getField("fth_scaling") || getField("Faith Bonus")),
      description: description || undefined,
      imageUrl: imageUrl || undefined,
      wikiUrl: url,
    };

    const parsed = WeaponSchema.safeParse(raw);

    if (!parsed.success) {
      console.warn(`[weapon] Zod error em "${name}":`, parsed.error.flatten());
      return WeaponSchema.parse({ ...raw, imageUrl: undefined });
    }

    return parsed.data;
  } catch (err) {
    console.error(`[weapon] Erro ao scrape ${url}:`, err);
    return null;
  }
}
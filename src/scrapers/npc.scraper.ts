import { NpcSchema, type Game, type Npc } from "@/src/schemas/schema";
import { fetchPage, toSlug } from "./base.scraper";

// NPCs hostis na wiki costumam ter "Invader", "Enemy" ou "Hollow" no tipo
const HOSTILE_KEYWORDS = ["invader", "enemy", "hollow", "dark spirit", "red phantom"];

function inferIsHostile(raw: Record<string, string>): boolean {
  const combined = Object.values(raw).join(" ").toLowerCase();
  return HOSTILE_KEYWORDS.some((kw) => combined.includes(kw));
}

export async function scrapeNpcPage(
  url: string,
  game: Game
): Promise<Npc | null> {
  try {
    const $ = await fetchPage(url);

    const name = $(".page-header__title").first().text().trim();
    if (!name) return null;

    const getField = (source: string) =>
      $(`[data-source="${source}"] .pi-data-value`).first().text().trim();

    const imageUrl = $(".pi-image-thumbnail").first().attr("src");

    // Descrição — primeiro parágrafo real
    const description = $(".mw-parser-output > p, .mw-content-ltr > p, p")
      .filter((_, el) => $(el).text().trim().length > 40)
      .first()
      .text()
      .trim();

    // Lore
    let lore: string | undefined;

    $(".mw-parser-output h2, .mw-parser-output h3, h2, h3")
      .each((_, heading) => {
        const headingText = $(heading).text().replace(/\[edit\]/gi, "").trim().toLowerCase();

        if (headingText === "lore") {
          const nextParagraph = $(heading).nextAll("p").first().text().trim();
          if (nextParagraph.length > 20) lore = nextParagraph;
          return false;
        }
      });

    if (!lore) {
      lore = getField("lore") || getField("Lore") || undefined;
    }

    // Localização do NPC — varia bastante entre jogos
    const location =
      getField("location") ||
      getField("Location") ||
      getField("found") ||
      getField("area") ||
      undefined;

    // Campos brutos pra inferir hostilidade
    const rawFields = {
      type: getField("type") || getField("Type") || getField("npc_type"),
      affiliation: getField("affiliation") || getField("Affiliation"),
      category: getField("category") || getField("Category"),
    };

    // isHostile: campo explícito > inferência por keywords
    const hostileField = getField("hostile") || getField("Hostile");
    const isHostile =
      hostileField
        ? hostileField.toLowerCase() === "yes" || hostileField.toLowerCase() === "true"
        : inferIsHostile(rawFields);

    const raw = {
      slug: toSlug(name),
      name,
      game,
      location: location || undefined,
      isHostile,
      description: description || undefined,
      lore: lore || undefined,
      imageUrl: imageUrl || undefined,
      wikiUrl: url,
    };

    const parsed = NpcSchema.safeParse(raw);

    if (!parsed.success) {
      console.warn(`[npc] Zod error em "${name}":`, parsed.error.flatten());
      return NpcSchema.parse({ ...raw, imageUrl: undefined });
    }

    return parsed.data;
  } catch (err) {
    console.error(`[npc] Erro ao scrape ${url}:`, err);
    return null;
  }
}

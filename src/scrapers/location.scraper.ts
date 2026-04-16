import { LocationSchema, type Game, type Location } from "@/src/schemas/schema";
import { fetchPage, toSlug } from "./base.scraper";

export async function scrapeLocationPage(
  url: string,
  game: Game
): Promise<Location | null> {
  try {
    const $ = await fetchPage(url);

    const name = $(".page-header__title").first().text().trim();
    if (!name) return null;

    const getField = (source: string) =>
      $(`[data-source="${source}"] .pi-data-value`).first().text().trim();

    const imageUrl = $(".pi-image-thumbnail").first().attr("src");

    // Descrição — primeiro parágrafo com conteúdo real
    const description = $(".mw-parser-output > p, .mw-content-ltr > p, p")
      .filter((_, el) => $(el).text().trim().length > 40)
      .first()
      .text()
      .trim();

    // Lore — wikis de DS costumam ter seção dedicada com h2/h3 "Lore"
    let lore: string | undefined;

    $(".mw-parser-output h2, .mw-parser-output h3, h2, h3")
      .each((_, heading) => {
        const headingText = $(heading).text().replace(/\[edit\]/gi, "").trim().toLowerCase();

        if (headingText === "lore") {
          // Pega o próximo parágrafo após o heading de lore
          const nextParagraph = $(heading).nextAll("p").first().text().trim();
          if (nextParagraph.length > 20) lore = nextParagraph;
          return false; // break
        }
      });

    // Fallback: campo da infobox
    if (!lore) {
      lore = getField("lore") || getField("Lore") || undefined;
    }

    const raw = {
      slug: toSlug(name),
      name,
      game,
      description: description || undefined,
      lore: lore || undefined,
      imageUrl: imageUrl || undefined,
      wikiUrl: url,
    };

    const parsed = LocationSchema.safeParse(raw);

    if (!parsed.success) {
      console.warn(`[location] Zod error em "${name}":`, parsed.error.flatten());
      return LocationSchema.parse({ ...raw, imageUrl: undefined });
    }

    return parsed.data;
  } catch (err) {
    console.error(`[location] Erro ao scrape ${url}:`, err);
    return null;
  }
}

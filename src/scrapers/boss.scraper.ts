import { BossSchema, type Boss, type Game } from "../schemas/schema";
import { fetchPage, parseNumber, toSlug } from "./base.scraper";

/**
 * Extrai dados de um boss a partir da URL da sua página na wiki.
 *
 * A infobox do Fandom tem a classe `.pi-item` com data-source como atributo.
 * Exemplo: <div data-source="souls"> → valor de almas concedidas
 */
export async function scrapeBossPage(
  url: string,
  game: Game
): Promise<Boss | null> {
  try {
    const $ = await fetchPage(url);

    const name = $(".page-header__title").first().text().trim();
    if (!name) return null;

    // Helpers para extrair campos da infobox por data-source
    const getField = (source: string) =>
      $(`[data-source="${source}"] .pi-data-value`).first().text().trim();

    // Tenta extrair a imagem principal
    const imageUrl =
      $(".pi-image-thumbnail").first().attr("src") ??
      $(".infobox img").first().attr("src");

    // Descrição — primeiro parágrafo real do artigo
    const description = $(".mw-parser-output > p, .mw-content-ltr > p, p")
      .filter((_, el) => $(el).text().trim().length > 40)
      .first()
      .text()
      .trim();

    const rawSouls = getField("souls") || getField("Soul Value");
    const rawHp = getField("hp") || getField("HP") || getField("health");
    const location = getField("location") || getField("Location");

    const optionalText = getField("optional") || getField("Optional");
    const isOptional =
      optionalText.toLowerCase() === "yes" ||
      optionalText.toLowerCase() === "true";

    const raw = {
      slug: toSlug(name),
      name,
      game,
      location: location || undefined,
      isOptional,
      souls: rawSouls ? parseNumber(rawSouls) : undefined,
      healthPoints: rawHp ? parseNumber(rawHp) : undefined,
      description: description || undefined,
      imageUrl: imageUrl || undefined,
      wikiUrl: url,
    };

    // Valida com Zod — dados ruins da wiki são descartados com log
    const parsed = BossSchema.safeParse(raw);

    if (!parsed.success) {
      console.warn(`[boss] Zod error em "${name}":`, parsed.error.flatten());
      // Retorna mesmo assim, sem os campos inválidos
      return BossSchema.parse({ ...raw, imageUrl: undefined });
    }

    return parsed.data;
  } catch (err) {
    console.error(`[boss] Erro ao scrape ${url}:`, err);
    return null;
  }
}
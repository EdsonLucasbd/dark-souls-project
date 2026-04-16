import { delay, fetchPage, WIKI_BASE } from "./base.scraper";

/**
 * Coleta todos os links de itens de uma categoria da wiki.
 * Lida com paginação automática via API do MediaWiki (list=categorymembers).
 */
export async function getCategoryLinks(categoryPath: string): Promise<string[]> {
  const allLinks: string[] = [];

  // Extrai o nome da categoria do path (ex: "/wiki/Category:Dark_Souls:_Bosses" -> "Category:Dark_Souls:_Bosses")
  const categoryTitle = categoryPath.replace("/wiki/", "");

  let cmcontinue: string | undefined = undefined;

  do {
    const url = new URL(`${WIKI_BASE}/api.php`);
    url.searchParams.set("action", "query");
    url.searchParams.set("list", "categorymembers");
    url.searchParams.set("cmtitle", categoryTitle);
    url.searchParams.set("cmlimit", "max");
    url.searchParams.set("format", "json");
    url.searchParams.set("origin", "*");
    if (cmcontinue) {
      url.searchParams.set("cmcontinue", cmcontinue);
    }

    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      throw new Error(`[scraper] Category API call failed: ${res.status}`);
    }

    const data = await res.json();
    const members = (data.query?.categorymembers as any[]) || [];

    for (const member of members) {
      // Filtra páginas que não são do namespace principal (0) - ex: ignora subcategorias (ns 14)
      if (member.ns === 0) {
        // Converte o título em path da wiki
        const path = `/wiki/${encodeURIComponent(member.title.replace(/ /g, "_"))}`;
        allLinks.push(`${WIKI_BASE}${path}`);
      }
    }

    cmcontinue = data.continue?.cmcontinue;

    if (cmcontinue) {
      await delay(500); 
    }
  } while (cmcontinue);

  return allLinks;
}
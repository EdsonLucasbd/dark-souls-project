import * as cheerio from "cheerio";

export const WIKI_BASE = "https://darksouls.fandom.com";

// Fandom bloqueia requests sem User-Agent de browser — não retire esses headers
const DEFAULT_HEADERS: HeadersInit = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

export async function fetchPage(pathOrUrl: string) {
  const urlStr = pathOrUrl.startsWith("http") ? pathOrUrl : `${WIKI_BASE}${pathOrUrl}`;
  const url = new URL(urlStr);

  // Se for uma página da wiki Fandom, usamos a API action=parse para evitar o 403 do Cloudflare
  if (url.hostname.includes("fandom.com") && url.pathname.startsWith("/wiki/")) {
    const pageTitle = url.pathname.replace("/wiki/", "");
    const apiUrl = `${url.origin}/api.php?action=parse&page=${pageTitle}&format=json&prop=text|displaytitle&redirects=true`;

    const res = await fetch(apiUrl, { headers: DEFAULT_HEADERS });
    if (!res.ok) {
      throw new Error(`[scraper] API HTTP ${res.status} → ${apiUrl}`);
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(`[scraper] API Error: ${data.error.info} (${data.error.code})`);
    }

    const html = data.parse.text["*"];
    const title = data.parse.displaytitle || data.parse.title;

    const $ = cheerio.load(html);
    // Injeta o título no "header" simulado caso o scraper precise dele
    $("body").prepend(`<h1 class="page-header__title">${title}</h1>`);

    return $;
  }

  // Fallback para outras URLs ou se não for página de conteúdo
  const res = await fetch(urlStr, { headers: DEFAULT_HEADERS });

  if (!res.ok) {
    throw new Error(`[scraper] HTTP ${res.status} → ${urlStr}`);
  }

  const html = await res.text();
  return cheerio.load(html);
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Transforma um nome de página da wiki em slug kebab-case.
 * ex: "Gwyn, Lord of Cinder" → "gwyn-lord-of-cinder"
 */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Extrai o número de uma string com vírgulas.
 * ex: "20,000" → 20000
 */
export function parseNumber(raw: string): number | undefined {
  const clean = raw.replace(/,/g, "").trim();
  const n = Number(clean);
  return isNaN(n) ? undefined : n;
}
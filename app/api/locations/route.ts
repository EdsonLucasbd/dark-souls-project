import { badRequest, localizeEntity, ok, paginate, parseListQuery, serverError } from "@/lib/api";
import { db } from "@/src/db";
import { locations } from "@/src/db/schema";
import type { Game } from "@/src/schemas/schema";
import { and, count, eq, like, type SQL } from "drizzle-orm";
import { type NextRequest } from "next/server";

// GET /api/locations
// GET /api/locations?game=ds1&search=anor
export async function GET(req: NextRequest) {
  try {
    const query = parseListQuery(req.url);
    if (!query) return badRequest("Parâmetros inválidos.");

    const { page, limit, game, search, lang } = query;
    const { offset, meta } = paginate(page, limit);

    const filters: SQL[] = [];
    if (game) filters.push(eq(locations.game, game as Game));
    
    if (search) {
      if (lang === "pt") {
        filters.push(like(locations.namePt, `%${search}%`));
      } else {
        filters.push(like(locations.nameEn, `%${search}%`));
      }
    }

    const where = filters.length > 0 ? and(...filters) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db.select().from(locations).where(where).limit(limit).offset(offset),
      db.select({ total: count() }).from(locations).where(where),
    ]);

    const localizedData = data.map(item => localizeEntity(item, lang));

    return ok(localizedData, meta(total));
  } catch (err) {
    console.error(`[api/locations] Error:`, err);
    return serverError();
  }
}
import { badRequest, ok, paginate, parseListQuery, serverError } from "@/lib/api";
import { db } from "@/src/db";
import { bosses } from "@/src/db/schema";
import type { Game } from "@/src/schemas/schema";
import { and, count, eq, like, type SQL } from "drizzle-orm";
import { type NextRequest } from "next/server";

// GET /api/bosses
// GET /api/bosses?game=ds1
// GET /api/bosses?game=ds3&search=gwyn&page=1&limit=20
export async function GET(req: NextRequest) {
  try {
    const query = parseListQuery(req.url);
    if (!query) return badRequest("Parâmetros inválidos.");

    const { page, limit, game, search } = query;
    const { offset, meta } = paginate(page, limit);

    const filters: SQL[] = [];
    if (game) filters.push(eq(bosses.game, game as Game));
    if (search) filters.push(like(bosses.name, `%${search}%`));

    const where = filters.length > 0 ? and(...filters) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db
        .select()
        .from(bosses)
        .where(where)
        .limit(limit)
        .offset(offset),
      db
        .select({ total: count() })
        .from(bosses)
        .where(where),
    ]);

    return ok(data, meta(total));
  } catch {
    return serverError();
  }
}
import { badRequest, ok, paginate, parseListQuery, serverError } from "@/lib/api";
import { db } from "@/src/db";
import { weapons } from "@/src/db/schema";
import type { Game } from "@/src/schemas/schema";
import { and, count, eq, like, type SQL } from "drizzle-orm";
import { type NextRequest } from "next/server";

// GET /api/weapons
// GET /api/weapons?game=ds2&search=uchigatana
export async function GET(req: NextRequest) {
  try {
    const query = parseListQuery(req.url);
    if (!query) return badRequest("Parâmetros inválidos.");

    const { page, limit, game, search } = query;
    const { offset, meta } = paginate(page, limit);

    const filters: SQL[] = [];
    if (game) filters.push(eq(weapons.game, game as Game));
    if (search) filters.push(like(weapons.name, `%${search}%`));

    const where = filters.length > 0 ? and(...filters) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db.select().from(weapons).where(where).limit(limit).offset(offset),
      db.select({ total: count() }).from(weapons).where(where),
    ]);

    return ok(data, meta(total));
  } catch {
    return serverError();
  }
}
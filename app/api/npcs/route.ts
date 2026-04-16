import { badRequest, ok, paginate, parseListQuery, serverError } from "@/lib/api";
import { db } from "@/src/db";
import { npcs } from "@/src/db/schema";
import type { Game } from "@/src/schemas/schema";
import { and, count, eq, like, type SQL } from "drizzle-orm";
import { type NextRequest } from "next/server";

// GET /api/npcs
// GET /api/npcs?game=ds3&search=firekeeper
// GET /api/npcs?game=ds1&hostile=true
export async function GET(req: NextRequest) {
  try {
    const query = parseListQuery(req.url);
    if (!query) return badRequest("Parâmetros inválidos.");

    const { page, limit, game, search } = query;
    const { offset, meta } = paginate(page, limit);

    const { searchParams } = new URL(req.url);
    const hostile = searchParams.get("hostile");

    const filters: SQL[] = [];
    if (game) filters.push(eq(npcs.game, game as Game));
    if (search) filters.push(like(npcs.name, `%${search}%`));
    if (hostile === "true") filters.push(eq(npcs.isHostile, true));
    if (hostile === "false") filters.push(eq(npcs.isHostile, false));

    const where = filters.length > 0 ? and(...filters) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db.select().from(npcs).where(where).limit(limit).offset(offset),
      db.select({ total: count() }).from(npcs).where(where),
    ]);

    return ok(data, meta(total));
  } catch {
    return serverError();
  }
}
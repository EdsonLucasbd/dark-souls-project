import { notFound, ok, serverError } from "@/lib/api";
import { db } from "@/src/db";
import { npcs } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

// GET /api/npcs/siegmeyer-of-catarina
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [npc] = await db
      .select()
      .from(npcs)
      .where(eq(npcs.slug, slug))
      .limit(1);

    if (!npc) return notFound(`NPC "${slug}" não encontrado.`);

    return ok(npc);
  } catch {
    return serverError();
  }
}
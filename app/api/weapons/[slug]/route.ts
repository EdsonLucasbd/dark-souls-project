import { notFound, ok, serverError } from "@/lib/api";
import { db } from "@/src/db";
import { weapons } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

// GET /api/weapons/uchigatana
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [weapon] = await db
      .select()
      .from(weapons)
      .where(eq(weapons.slug, slug))
      .limit(1);

    if (!weapon) return notFound(`Weapon "${slug}" não encontrada.`);

    return ok(weapon);
  } catch {
    return serverError();
  }
}
import { notFound, ok, serverError } from "@/lib/api";
import { db } from "@/src/db";
import { bosses } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

// GET /api/bosses/gwyn-lord-of-cinder
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [boss] = await db
      .select()
      .from(bosses)
      .where(eq(bosses.slug, slug))
      .limit(1);

    if (!boss) return notFound(`Boss "${slug}" não encontrado.`);

    return ok(boss);
  } catch {
    return serverError();
  }
}
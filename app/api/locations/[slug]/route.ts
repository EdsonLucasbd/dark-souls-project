import { notFound, ok, serverError } from "@/lib/api";
import { db } from "@/src/db";
import { locations } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

// GET /api/locations/anor-londo
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [location] = await db
      .select()
      .from(locations)
      .where(eq(locations.slug, slug))
      .limit(1);

    if (!location) return notFound(`Location "${slug}" não encontrada.`);

    return ok(location);
  } catch {
    return serverError();
  }
}
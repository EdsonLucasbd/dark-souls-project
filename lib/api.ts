import { NextResponse } from "next/server";
import { z } from "zod";

// ------------------------------------------------------------------ //
// Schemas de query params reutilizáveis                               //
// ------------------------------------------------------------------ //

export const GameQuerySchema = z.enum(["ds1", "ds2", "ds3"]).optional();

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const ListQuerySchema = PaginationSchema.extend({
  game: GameQuerySchema,
  search: z.string().optional(),
  lang: z.enum(["en", "pt"]).default("pt"),
});

export type ListQuery = z.infer<typeof ListQuerySchema>;

// ------------------------------------------------------------------ //
// Response helpers                                                     //
// ------------------------------------------------------------------ //

export function ok<T>(data: T, meta?: Record<string, unknown>) {
  return NextResponse.json({ data, ...(meta ?? {}) });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function badRequest(message = "Bad request") {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function serverError(message = "Internal server error") {
  return NextResponse.json({ error: message }, { status: 500 });
}

// ------------------------------------------------------------------ //
// Extrai e valida query params de uma URL                             //
// ------------------------------------------------------------------ //

export function parseListQuery(url: string): ListQuery | null {
  const { searchParams } = new URL(url);

  const raw = {
    page: searchParams.get("page") ?? 1,
    limit: searchParams.get("limit") ?? 20,
    game: searchParams.get("game") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    lang: searchParams.get("lang") ?? "pt",
  };

  const parsed = ListQuerySchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

// ------------------------------------------------------------------ //
// Calcula offset e monta meta de paginação                            //
// ------------------------------------------------------------------ //

export function paginate(page: number, limit: number) {
  return {
    offset: (page - 1) * limit,
    meta: (total: number) => ({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }),
  };
}

// ------------------------------------------------------------------ //
// Localization helper                                                 //
// ------------------------------------------------------------------ //

export function localizeEntity<T extends Record<string, any>>(item: T, lang: "en" | "pt"): T {
  const localized = { ...item };

  const fields = ["name", "description", "lore", "location", "weaponType", "attackType"];

  for (const field of fields) {
    const enKey = `${field}En`;
    const ptKey = `${field}Pt`;

    if (lang === "pt") {
      localized[field as keyof T] = item[ptKey] ?? item[enKey] ?? item[field];
    } else {
      localized[field as keyof T] = item[enKey] ?? item[field];
    }
  }

  return localized;
}

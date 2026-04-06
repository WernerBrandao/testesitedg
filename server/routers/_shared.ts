import { protectedProcedure } from "../_core/trpc.js";
import { TRPCError } from "@trpc/server";

/**
 * Admin Procedure - Restringe acesso apenas a admins
 * Uso: adminProcedure.input(...).mutation(...)
 */
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Acesso restrito a administradores"
    });
  }
  return next({ ctx });
});

/**
 * Editor Procedure - Restringe acesso a editors e admins
 * Uso: editorProcedure.input(...).mutation(...)
 */
export const editorProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin" && ctx.user.role !== "contributor") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Acesso restrito a editores"
    });
  }
  return next({ ctx });
});

/**
 * Slugify - Converte texto para slug
 * Exemplo: "Minha Notícia" → "minha-noticia"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

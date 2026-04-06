import { router, publicProcedure, protectedProcedure } from "../_core/trpc.js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "../db.js";

export const menuRouter = router({
  list: publicProcedure.query(async () => {
    return db.getMenuItems();
  }),

  hierarchy: publicProcedure.query(async () => {
    return db.getMenuItemsHierarchy();
  }),

  create: protectedProcedure.input(z.object({
    label: z.string().min(1),
    linkType: z.enum(["internal", "external"]).optional(),
    internalPageId: z.number().optional(),
    externalUrl: z.string().optional(),
    parentId: z.number().nullable().optional(),
    sortOrder: z.number().default(0),
    openInNewTab: z.boolean().default(false),
    isColumnTitle: z.boolean().default(false),
  })).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    
    // Validações
    if (!input.isColumnTitle && !input.linkType) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "linkType obrigatório" });
    }
    
    if (!input.isColumnTitle) {
      if (input.linkType === "internal" && !input.internalPageId) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Página obrigatória para links internos" });
      }
      if (input.linkType === "external" && !input.externalUrl) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "URL obrigatória para links externos" });
      }
    }
    
    return db.createMenuItem({
      label: input.label,
      linkType: input.isColumnTitle ? "external" : (input.linkType || "internal"),
      internalPageId: input.internalPageId || null,
      externalUrl: input.isColumnTitle ? "https://rj.gov.br/degase" : (input.externalUrl || null),
      parentId: input.parentId || null,
      sortOrder: input.sortOrder,
      openInNewTab: input.openInNewTab,
      isColumnTitle: input.isColumnTitle,
      isActive: true,
    });
  }),

  update: protectedProcedure.input(z.object({
    id: z.number(),
    label: z.string().optional(),
    linkType: z.enum(["internal", "external"]).optional(),
    internalPageId: z.number().nullable().optional(),
    externalUrl: z.string().optional(),
    parentId: z.number().nullable().optional(),
    sortOrder: z.number().optional(),
    openInNewTab: z.boolean().optional(),
    isColumnTitle: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    
    const { id, ...data } = input;
    
    // Se isColumnTitle é true, remover campos de link
    if (data.isColumnTitle === true) {
      data.linkType = "external";
      data.internalPageId = null;
      data.externalUrl = "https://rj.gov.br/degase";
    }
    
    // Filtrar undefined values
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );
    
    return db.updateMenuItem(id, cleanData);
  }),

  delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    return db.deleteMenuItem(input.id);
  }),

  reorder: protectedProcedure.input(z.object({
    items: z.array(z.object({
      id: z.number(),
      parentId: z.number().nullable(),
      sortOrder: z.number(),
    })),
  })).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    return db.updateMenuItemOrder(input.items);
  }),
});
import { z } from "zod";
import { notifyOwner } from "./notification.js";
import { adminProcedure, publicProcedure, router } from "./trpc.js";

export const systemRouter = router({
  // Healthcheck sem input
  health: publicProcedure.query(() => ({
    ok: true,
  })),

  // Mantém notifyOwner — continua usando zod
  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),
});
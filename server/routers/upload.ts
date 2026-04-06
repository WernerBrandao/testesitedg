import fs from "fs";
import path from "path";
import { router, adminProcedure } from "../_core/trpc.js";
import { z } from "zod";

export const uploadRouter = router({
  image: adminProcedure
    .input(
      z.object({
        file: z.instanceof(Uint8Array),
        filename: z.string(),
        mimetype: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const uploadsDir = path.join(process.cwd(), "uploads");

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const safeName =
        Date.now() + "-" + input.filename.replace(/\s+/g, "_");

      const filePath = path.join(uploadsDir, safeName);

      fs.writeFileSync(filePath, Buffer.from(input.file));

      return {
        success: true,
        url: `/uploads/${safeName}`,
      };
    }),
});
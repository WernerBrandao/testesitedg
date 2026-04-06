import { router, publicProcedure, protectedProcedure } from '../_core/trpc.js';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import * as db from '../db.js';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

const postsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
        status: z.string().optional(),
        authorId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const result = await db.listPosts(input);
      return result.items;
    }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await db.getPostBySlug(input.slug);
      return post ? [post] : [];
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const post = await db.getPostById(input.id);
      return post ? [post] : [];
    }),
  search: publicProcedure
    .input(z.object({ query: z.string(), limit: z.number().optional() }))
    .query(async ({ input }) => {
      const results = await db.searchPosts(input);
      return results;
    }),
  getLatest: publicProcedure.query(async () => {
    const result = await db.listPosts({ status: 'published', limit: 10 });
    return result.items;
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        slug: z.string().optional(),
        status: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const slug = input.slug || slugify(input.title);
      const post = await db.createPost({ ...input, slug, authorId: ctx.user.id });
      return [post];
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        slug: z.string().optional(),
        status: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await db.updatePost(input);
      return [post];
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.deletePost(input.id);
      return [];
    }),
  recordView: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.recordPostView(input.id);
      return [];
    }),
});

export { postsRouter };
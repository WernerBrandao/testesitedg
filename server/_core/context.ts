import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema.js";
import * as db from "../db.js";
import { jwtVerify } from "jose";
import { createSecretKey } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const secretKey = createSecretKey(JWT_SECRET, "utf-8");

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    const token = opts.req.cookies.session;
    
    if (token) {
      const { payload } = await jwtVerify(token, secretKey);
      user = await db.getUserById((payload as any).id);
    }
  } catch (error) {
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
import bcrypt from "bcrypt";
import { COOKIE_NAME, ONE_YEAR_MS } from "../../shared/const.js";
import type { Express, Request, Response } from "express";
import * as db from "../db.js";
import { getSessionCookieOptions } from "./cookies.js";
import { ENV } from "./env.js";
import { SignJWT, jwtVerify } from "jose";
import { createSecretKey } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const secretKey = createSecretKey(JWT_SECRET, "utf-8");
export function registerAuthRoutes(app: Express) {
}
//export function registerAuthRoutes(app: Express) {
  // LOGIN
//  app.post("/api/auth/login", async (req: Request, res: Response) => {
//    try {
//      const { email, password } = req.body;
//
//      if (!email || !password) {
//        return res.status(400).json({ error: "Email e senha são obrigatórios" });
//      }
//
//      const user = await db.getUserByEmail(email);
//
//      if (!user || !user.passwordHash) {
//        return res.status(401).json({ error: "Email ou senha inválidos" });
//      }
//
//      const valid = await bcrypt.compare(password, user.passwordHash);
//      if (!valid) {
//        return res.status(401).json({ error: "Email ou senha inválidos" });
//      }
//
//      await db.updateUser(user.id, { lastSignedIn: new Date() });
//
//      // 🔥 JOSÉ – substituir jwt.sign()
//      const token = await new SignJWT({
//        id: user.id,
//        email: user.email,
//        role: user.role,
//        name: user.name,
//      })
//        .setProtectedHeader({ alg: "HS256" })
//        .setIssuedAt()
//        .setExpirationTime("365d")
//        .sign(secretKey);
//
//      const cookieOptions = getSessionCookieOptions(req);
//      //res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
//      res.cookie("session", token, {
//        httpOnly: true,
//        secure: false,          // mantenha false no ambiente interno
//        sameSite: "lax",        // ou "none" + secure:true se usar HTTPS
//        path: "/",
//      });
//      res.json({
//        success: true,
//        user: {
//          id: user.id,
//          name: user.name,
//          email: user.email,
//          role: user.role,
//        },
//      });
//    } catch (err) {
//      console.error("[Login]", err);
//      res.status(500).json({ error: "Erro ao fazer login" });
//    }
//  });

  // VERIFICAR SESSÃO
//  app.get("/api/auth/me", async (req: Request, res: Response) => {
//    try {
//      const token = req.cookies[COOKIE_NAME];
//      if (!token) return res.status(401).json({ error: "Não autenticado" });

      // 🔥 JOSÉ – substituir jwt.verify()
//      const { payload } = await jwtVerify(token, secretKey);
//      const user = await db.getUserById((payload as any).id);
//
//      if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

//      res.json({
//        user: {
//          id: user.id,
//          name: user.name,
//          email: user.email,
//          role: user.role,
//        },
//      });
//    } catch (err) {
//      console.error("[Auth/me]", err);
//      res.status(401).json({ error: "Token inválido" });
//    }
//  });

  // LOGOUT
//  app.post("/api/auth/logout", async (req: Request, res: Response) => {
//    res.clearCookie(COOKIE_NAME);
//    res.json({ success: true });
//  });
//}
// src/server/_core/jwt.ts
import { SignJWT, jwtVerify } from "jose";
import { createSecretKey } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

// Criar chave segura usando WebCrypto
const secretKey = createSecretKey(JWT_SECRET, "utf-8");

// Tempo padrão de expiração: 365 dias (igual ao jsonwebtoken antigo)
const DEFAULT_EXPIRATION = "365d";

// Gera um token JWT moderno usando jose
export async function createToken(payload: object, expiresIn: string = DEFAULT_EXPIRATION) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

// Verifica token e retorna payload ou null
export async function verifyToken<T = any>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as T;
  } catch {
    return null;
  }
}

// Helper opcional para extrair usuário da request (Express)
export async function getUserFromToken<T = any>(token?: string): Promise<T | null> {
  if (!token) return null;
  return await verifyToken<T>(token);
}